const User = require("../Models/user");
const Ledgerstud = require("../Models/ledgerstud");
const Institution = require("../Models/insdetails");

const filterFields = [
  { field: "academicyear", label: "Academic Year" },
  { field: "admissionyear", label: "Admission Year" },
  { field: "program", label: "Program" },
  { field: "programcode", label: "Program Code" },
  { field: "regulation", label: "Regulation" },
  { field: "name", label: "Name" },
  { field: "user", label: "User" },
  { field: "email", label: "Email" },
  { field: "regno", label: "Reg No" },
  { field: "phone", label: "Phone" },
  { field: "semester", label: "Semester" },
  { field: "section", label: "Section" },
  { field: "Major", label: "Major" },
  { field: "Minor", label: "Minor" },
  { field: "IDC", label: "IDC" },
  { field: "SEC", label: "SEC" },
  { field: "VAC", label: "VAC" },
  { field: "category", label: "Category" },
  { field: "gender", label: "Gender" }
];

const allowedFields = new Set(filterFields.map((item) => item.field));

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value ?? "").trim();
const escapeRegex = (value) => text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildUserFilter = (filters = []) => {
  const query = {};
  filters.forEach((filter) => {
    const field = text(filter.field);
    const value = text(filter.value);
    if (!allowedFields.has(field) || !value) return;
    if (["name", "email", "user", "regno", "phone"].includes(field)) {
      query[field] = { $regex: escapeRegex(value), $options: "i" };
    } else {
      query[field] = value;
    }
  });
  return query;
};

const groupRows = (rows, field) => {
  const map = new Map();
  rows.forEach((row) => {
    const key = text(row[field]) || "Not specified";
    const item = map.get(key) || { id: key, name: key, amount: 0, paid: 0, concession: 0, balance: 0, count: 0 };
    item.amount += Number(row.amount || 0);
    item.paid += Number(row.paid || 0);
    item.concession += Number(row.concession || 0);
    item.balance += Number(row.balance || 0);
    item.count += 1;
    map.set(key, item);
  });
  return Array.from(map.values()).sort((a, b) => b.amount - a.amount || a.name.localeCompare(b.name));
};

exports.getStudentLedgerDetailOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const baseQuery = { colid, role: { $regex: /^Student$/i } };
    const entries = await Promise.all(filterFields.map(async ({ field, label }) => {
      const values = await User.distinct(field, baseQuery);
      return [
        field,
        {
          label,
          values: values.map(text).filter(Boolean).sort((a, b) => a.localeCompare(b))
        }
      ];
    }));
    res.json({ success: true, fields: filterFields, options: Object.fromEntries(entries) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchStudentLedgerStudents = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const query = {
      colid,
      role: { $regex: /^Student$/i },
      ...buildUserFilter(filters)
    };
    const data = await User.find(query)
      .select("name email user phone regno academicyear admissionyear program programcode regulation semester section Major Minor IDC SEC VAC category gender colid")
      .sort({ academicyear: -1, program: 1, semester: 1, section: 1, name: 1 })
      .limit(500)
      .lean();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentLedgerDetails = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const regno = text(req.body.regno);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });

    const [student, ledgerRows, institution] = await Promise.all([
      User.findOne({ colid, regno }).select("name email user phone regno academicyear admissionyear program programcode regulation semester section Major Minor IDC SEC VAC category gender address colid").lean(),
      Ledgerstud.find({ colid, regno })
        .sort({ academicyear: -1, feegroup: 1, feeitem: 1, classdate: 1 })
        .lean(),
      Institution.findOne({ colid }).lean()
    ]);

    const totals = ledgerRows.reduce((sum, row) => ({
      amount: sum.amount + Number(row.amount || 0),
      paid: sum.paid + Number(row.paid || 0),
      concession: sum.concession + Number(row.concession || 0),
      balance: sum.balance + Number(row.balance || 0)
    }), { amount: 0, paid: 0, concession: 0, balance: 0 });

    res.json({
      success: true,
      student,
      data: ledgerRows,
      count: ledgerRows.length,
      totals,
      summaries: {
        feegroup: groupRows(ledgerRows, "feegroup"),
        feeitem: groupRows(ledgerRows, "feeitem"),
        academicyear: groupRows(ledgerRows, "academicyear"),
        status: groupRows(ledgerRows, "status")
      },
      institution: institution || null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
