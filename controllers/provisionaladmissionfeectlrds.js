const ProvisionalAdmissionFee = require("../Models/provisionaladmissionfeeds");
const MPrograms = require("../Models/mprograms");

const text = (value) => String(value || "").trim();
const regex = (value) => new RegExp(text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

const cleanPayload = (body = {}) => ({
  academicyear: text(body.academicyear || body.academicYear),
  program: text(body.program),
  programcode: text(body.programcode || body.programCode),
  description: text(body.description),
  amount: Number(body.amount || 0),
  user: text(body.user),
  colid: Number(body.colid)
});

const validate = (payload) => {
  if (!payload.colid) return "colid is required";
  if (!payload.academicyear) return "Academic year is required";
  if (!payload.program) return "Program is required";
  if (!payload.programcode) return "Program code is required";
  return "";
};

const queryFrom = (source = {}) => {
  const query = { colid: Number(source.colid) };
  ["academicyear", "programcode"].forEach((field) => {
    if (text(source[field])) query[field] = text(source[field]);
  });
  if (text(source.program)) query.program = regex(source.program);
  return query;
};

exports.getOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const [programs, years] = await Promise.all([
      MPrograms.find({ colid }).sort({ program: 1, programcode: 1 }).lean(),
      ProvisionalAdmissionFee.distinct("academicyear", { colid })
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
      })).filter((item) => item.program || item.programcode)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ProvisionalAdmissionFee.find(queryFrom(req.query))
      .sort({ academicyear: -1, program: 1, programcode: 1 })
      .lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validate(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await ProvisionalAdmissionFee.create(payload);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validate(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await ProvisionalAdmissionFee.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      payload,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Provisional admission fee not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const data = await ProvisionalAdmissionFee.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Provisional admission fee not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulk = async (req, res) => {
  try {
    const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!rows.length) return res.status(400).json({ success: false, message: "No rows received" });

    const errors = [];
    const docs = [];
    rows.forEach((row, index) => {
      const item = cleanPayload({ ...row, colid, user: req.body.user || row.user });
      const error = validate(item);
      if (error) errors.push({ row: index + 2, message: error });
      else docs.push(item);
    });

    const inserted = docs.length ? await ProvisionalAdmissionFee.insertMany(docs, { ordered: false }) : [];
    res.json({ success: true, inserted: inserted.length, errors, data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
