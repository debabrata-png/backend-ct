const Ledgerstud = require("../Models/ledgerstud");

function toNumber(value) {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function text(value) {
  return String(value || "").trim();
}

function regex(value) {
  return new RegExp(text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

const allowedFilters = [
  "academicyear",
  "programcode",
  "regno",
  "student",
  "feegroup",
  "feeitem",
  "feebook",
  "cashbook",
  "status",
  "regulation",
  "major",
  "minor",
  "semester"
];

exports.getStudentLedgerAdjustRows = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid };
    allowedFilters.forEach((field) => {
      if (!req.query[field]) return;
      query[field] = ["student", "feeitem", "feegroup"].includes(field) ? regex(req.query[field]) : req.query[field];
    });

    const data = await Ledgerstud.find(query)
      .sort({ academicyear: -1, regno: 1, feegroup: 1, feeitem: 1, classdate: -1 })
      .limit(3000)
      .lean();

    const students = Array.from(new Map(data.map((item) => [
      item.regno || item.student,
      {
        regno: item.regno || "",
        student: item.student || "",
        programcode: item.programcode || "",
        academicyear: item.academicyear || item.admissionyear || ""
      }
    ])).values()).sort((a, b) => `${a.student}${a.regno}`.localeCompare(`${b.student}${b.regno}`));

    res.json({ success: true, count: data.length, data, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStudentLedgerConcession = async (req, res) => {
  try {
    const id = req.body.id;
    const colid = toNumber(req.body.colid);
    const concession = Math.max(0, toNumber(req.body.concession) || 0);
    if (colid === undefined || !id) {
      return res.status(400).json({ success: false, message: "colid and ledger id are required" });
    }

    const ledger = await Ledgerstud.findOne({ _id: id, colid });
    if (!ledger) return res.status(404).json({ success: false, message: "Student ledger entry not found" });

    const amount = toNumber(ledger.amount) || 0;
    const paid = toNumber(ledger.paid) || 0;
    const balance = Math.max(0, amount - paid - concession);
    const history = Array.isArray(ledger.approvalhistory) ? ledger.approvalhistory : [];
    history.push({
      action: "Concession Adjusted",
      user: text(req.body.user),
      remarks: text(req.body.remarks),
      date: new Date(),
      oldconcession: toNumber(ledger.concession) || 0,
      newconcession: concession,
      oldbalance: toNumber(ledger.balance) || 0,
      newbalance: balance,
      fromstatus: ledger.status,
      tostatus: "Added"
    });

    ledger.concession = concession;
    ledger.balance = balance;
    ledger.status = "Added";
    ledger.approvalhistory = history;
    ledger.comments = text(req.body.remarks) || ledger.comments;
    await ledger.save();

    res.json({ success: true, data: ledger });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
