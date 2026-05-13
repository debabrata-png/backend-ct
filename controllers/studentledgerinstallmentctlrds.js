const Ledgerstud = require("../Models/ledgerstud");
const User = require("../Models/user");

const filterMap = {
  academicyear: ["academicyear", "admissionyear"],
  name: ["name"],
  email: ["email"],
  regno: ["regno"],
  phone: ["phone"],
  major: ["Major"],
  program: ["program"],
  programcode: ["programcode"],
  semester: ["semester"],
  section: ["section"]
};

function text(value) {
  return String(value || "").trim();
}

function toNumber(value) {
  if (value === "" || value === null || value === undefined) return 0;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function regex(value) {
  return new RegExp(text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

function userFilter(source = {}) {
  const query = { colid: Number(source.colid), role: /^Student$/i };
  Object.keys(filterMap).forEach((field) => {
    const value = text(source[field]);
    if (!value) return;
    const fields = filterMap[field];
    if (["name", "email", "phone", "regno"].includes(field)) {
      query[fields[0]] = regex(value);
      return;
    }
    if (field === "academicyear") {
      query.$or = [{ academicyear: value }, { admissionyear: value }];
      return;
    }
    query[fields[0]] = value;
  });
  return query;
}

function balanceOf(entry) {
  const balance = toNumber(entry.balance);
  if (balance > 0) return balance;
  return Math.max(0, toNumber(entry.amount) - toNumber(entry.paid) - toNumber(entry.concession));
}

exports.getInstallmentFilterOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const [ledgerYears, userAcademicYears, admissionYears, majors, programs, programcodes, semesters, sections] = await Promise.all([
      Ledgerstud.distinct("academicyear", { colid }),
      User.distinct("academicyear", { colid, role: /^Student$/i }),
      User.distinct("admissionyear", { colid, role: /^Student$/i }),
      User.distinct("Major", { colid, role: /^Student$/i }),
      User.distinct("program", { colid, role: /^Student$/i }),
      User.distinct("programcode", { colid, role: /^Student$/i }),
      User.distinct("semester", { colid, role: /^Student$/i }),
      User.distinct("section", { colid, role: /^Student$/i })
    ]);

    const clean = (items) => Array.from(new Set((items || []).map(text).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    res.json({
      success: true,
      options: {
        academicyear: clean([...ledgerYears, ...userAcademicYears, ...admissionYears]),
        major: clean(majors),
        program: clean(programs),
        programcode: clean(programcodes),
        semester: clean(semesters),
        section: clean(sections)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchInstallmentStudents = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const students = await User.find(userFilter(req.query))
      .select("name email phone regno admissionyear academicyear Major program programcode semester section regulation colid")
      .sort({ admissionyear: -1, programcode: 1, name: 1 })
      .limit(1000)
      .lean();

    const regnos = students.map((student) => text(student.regno)).filter(Boolean);
    const ledgerMatch = { colid, balance: { $gt: 0 } };
    if (regnos.length) ledgerMatch.regno = { $in: regnos };
    if (text(req.query.academicyear)) ledgerMatch.academicyear = text(req.query.academicyear);
    if (text(req.query.programcode)) ledgerMatch.programcode = text(req.query.programcode);
    if (text(req.query.semester)) ledgerMatch.semester = text(req.query.semester);
    if (text(req.query.major)) ledgerMatch.major = text(req.query.major);

    const balances = await Ledgerstud.aggregate([
      { $match: ledgerMatch },
      { $group: { _id: "$regno", balance: { $sum: "$balance" }, items: { $sum: 1 } } }
    ]);
    const balanceMap = new Map(balances.map((item) => [String(item._id), item]));
    const data = students
      .map((student) => ({
        ...student,
        ledgerbalance: balanceMap.get(String(student.regno))?.balance || 0,
        ledgeritems: balanceMap.get(String(student.regno))?.items || 0
      }))
      .filter((student) => student.ledgerbalance > 0);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentInstallmentLedger = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid || !text(req.query.regno)) {
      return res.status(400).json({ success: false, message: "colid and regno are required" });
    }

    const query = { colid, regno: text(req.query.regno), balance: { $gt: 0 } };
    ["academicyear", "programcode", "semester", "major"].forEach((field) => {
      if (text(req.query[field])) query[field] = text(req.query[field]);
    });

    const data = await Ledgerstud.find(query)
      .sort({ academicyear: -1, semester: 1, feegroup: 1, feeitem: 1 })
      .limit(1000)
      .lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.convertLedgerToInstallments = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const selectedIds = Array.isArray(req.body.selectedIds) ? req.body.selectedIds : [];
    const installments = Array.isArray(req.body.installments) ? req.body.installments : [];
    if (!colid || !selectedIds.length || !installments.length) {
      return res.status(400).json({ success: false, message: "colid, selected fee items and installments are required" });
    }

    const selectedEntries = await Ledgerstud.find({ _id: { $in: selectedIds }, colid });
    if (!selectedEntries.length) {
      return res.status(404).json({ success: false, message: "Selected ledger entries not found" });
    }

    const totalBalance = selectedEntries.reduce((sum, entry) => sum + balanceOf(entry), 0);
    const totalInstallment = installments.reduce((sum, item) => sum + toNumber(item.amount), 0);
    if (totalBalance <= 0) {
      return res.status(400).json({ success: false, message: "Selected fee items do not have balance" });
    }
    if (Math.abs(totalBalance - totalInstallment) > 0.01) {
      return res.status(400).json({ success: false, message: "Installment total must match selected balance" });
    }

    const first = selectedEntries[0];
    const student = await User.findOne({ colid, regno: first.regno }).lean();
    const newEntries = [];

    for (let index = 0; index < installments.length; index += 1) {
      const item = installments[index];
      const amount = toNumber(item.amount);
      if (amount <= 0 || !item.duedate) {
        return res.status(400).json({ success: false, message: "Every installment must have amount and due date" });
      }
      newEntries.push({
        name: text(req.body.name) || text(req.body.user),
        user: text(req.body.user),
        feegroup: "Installment",
        regno: first.regno || student?.regno || "NA",
        student: first.student || student?.name || "NA",
        feeitem: text(item.description) || `Installment ${index + 1}`,
        amount,
        paid: 0,
        concession: 0,
        balance: amount,
        cash: 0,
        upi: 0,
        cheque: 0,
        card: 0,
        pg: 0,
        neft: 0,
        feebook: first.feebook || "",
        feecounter: "",
        paymode: "",
        paydetails: "",
        feecategory: "Installment",
        semester: first.semester || student?.semester || "",
        cashbook: first.cashbook || "",
        institution: first.institution || student?.institution || "",
        type: "positive",
        installment: String(index + 1),
        comments: `Installment created from ${selectedEntries.length} ledger item(s). ${text(item.description)}`,
        academicyear: first.academicyear || student?.academicyear || student?.admissionyear || "",
        colid,
        classdate: new Date(),
        duedate: new Date(item.duedate),
        paiddate: null,
        status: "Active",
        programcode: first.programcode || student?.programcode || "",
        regulation: first.regulation || student?.regulation || "",
        major: first.major || student?.Major || "",
        minor: first.minor || student?.Minor || "",
        feeid: "",
        admissionyear: first.admissionyear || student?.admissionyear || ""
      });
    }

    const updatedOriginals = [];
    for (const entry of selectedEntries) {
      const oldBalance = balanceOf(entry);
      const oldConcession = toNumber(entry.concession);
      entry.concession = oldConcession + oldBalance;
      entry.balance = 0;
      entry.status = "Installment Converted";
      entry.comments = `${text(entry.comments)} ${text(entry.comments) ? "|" : ""} Converted to installment on ${new Date().toISOString().slice(0, 10)}`;
      const history = Array.isArray(entry.approvalhistory) ? entry.approvalhistory : [];
      history.push({
        action: "Installment Conversion",
        user: text(req.body.user),
        date: new Date(),
        oldbalance: oldBalance,
        addedconcession: oldBalance,
        newbalance: 0,
        installments: installments.length
      });
      entry.approvalhistory = history;
      await entry.save();
      updatedOriginals.push(entry);
    }

    const inserted = await Ledgerstud.insertMany(newEntries);
    res.json({
      success: true,
      message: "Installments created successfully",
      totalBalance,
      updatedOriginals: updatedOriginals.length,
      inserted: inserted.length,
      data: inserted
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
