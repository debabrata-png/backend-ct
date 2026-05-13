const ApplicationFee = require("../Models/applicationfeeds");
const MPrograms = require("../Models/mprograms");

function text(value) {
  return String(value || "").trim();
}

function number(value) {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function regex(value) {
  return new RegExp(text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

function payload(body = {}) {
  return {
    academicyear: text(body.academicyear || body.academicYear),
    program: text(body.program),
    programcode: text(body.programcode || body.programCode),
    amount: number(body.amount),
    active: text(body.active) === "No" ? "No" : "Yes",
    user: text(body.user),
    colid: Number(body.colid)
  };
}

function queryFrom(source = {}) {
  const query = { colid: Number(source.colid) };
  ["academicyear", "programcode", "active"].forEach((field) => {
    if (text(source[field])) query[field] = text(source[field]);
  });
  if (text(source.program)) query.program = regex(source.program);
  return query;
}

exports.getApplicationFeeOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const [programs, years] = await Promise.all([
      MPrograms.find({ colid }).sort({ program: 1, programcode: 1 }).lean(),
      ApplicationFee.distinct("academicyear", { colid })
    ]);
    const academicYears = Array.from(new Set([
      "2023-24",
      "2024-25",
      "2025-26",
      "2026-27",
      "2027-28",
      "2028-29",
      "2029-30",
      "2030-31",
      ...(years || [])
    ].filter(Boolean))).sort((a, b) => String(a).localeCompare(String(b)));

    res.json({
      success: true,
      academicYears,
      programs: programs.map((item) => ({
        _id: item._id,
        program: item.program || item.name || "",
        programcode: item.programcode || ""
      })).filter((item) => item.program || item.programcode),
      activeOptions: ["Yes", "No"]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getApplicationFees = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ApplicationFee.find(queryFrom(req.query))
      .sort({ academicyear: -1, program: 1, programcode: 1 })
      .lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createApplicationFee = async (req, res) => {
  try {
    const data = await ApplicationFee.create(payload(req.body));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateApplicationFee = async (req, res) => {
  try {
    const data = await ApplicationFee.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      payload(req.body),
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Application fee not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteApplicationFee = async (req, res) => {
  try {
    const data = await ApplicationFee.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Application fee not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkApplicationFee = async (req, res) => {
  try {
    const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!rows.length) return res.status(400).json({ success: false, message: "No rows received" });

    const errors = [];
    const docs = [];
    rows.forEach((row, index) => {
      const item = payload({ ...row, colid, user: req.body.user || row.user });
      if (!item.academicyear || !item.program || !item.programcode || !item.amount) {
        errors.push({ row: index + 2, message: "Academic year, program, programcode and amount are required" });
        return;
      }
      docs.push(item);
    });

    const inserted = docs.length ? await ApplicationFee.insertMany(docs, { ordered: false }) : [];
    res.json({ success: true, inserted: inserted.length, errors, data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
