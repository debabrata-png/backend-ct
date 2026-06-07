const AcademicCalendar = require("../Models/macadcal");

const fields = [
  "academicyear",
  "program",
  "programcode",
  "regulation",
  "semester",
  "ativity",
  "description",
  "activitydate",
  "type",
  "level",
  "status1",
  "comments"
];

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const clean = (value) => String(value ?? "").trim();

const normalizeType = (value) => {
  const type = clean(value);
  if (/^holiday$/i.test(type)) return "Holiday";
  if (/^working day$/i.test(type) || /^workingday$/i.test(type)) return "Working day";
  return type || "Working day";
};

const normalizeDate = (value) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const buildPayload = (body = {}) => {
  const payload = {};
  fields.forEach((field) => {
    const sourceValue = field === "ativity" ? (body.ativity ?? body.activity) : body[field];
    if (sourceValue !== undefined) payload[field] = sourceValue;
  });
  payload.ativity = clean(payload.ativity);
  payload.type = normalizeType(payload.type);
  payload.activitydate = normalizeDate(payload.activitydate);
  return payload;
};

exports.getAll = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const rows = await AcademicCalendar.find({ colid }).sort({ activitydate: -1, createdAt: -1 }).lean();
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Unable to load academic calendar" });
  }
};

exports.create = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const payload = buildPayload(req.body);
    if (!payload.academicyear || !payload.ativity || !payload.activitydate) {
      return res.status(400).json({ success: false, message: "Academic year, activity and activity date are required" });
    }
    const row = await AcademicCalendar.create({
      ...payload,
      colid,
      name: clean(req.body.name) || clean(req.body.user) || "NA",
      user: clean(req.body.user) || "NA"
    });
    res.json({ success: true, data: row });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Unable to create academic calendar entry" });
  }
};

exports.update = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const id = clean(req.body.id || req.body._id);
    if (!id || colid === undefined) return res.status(400).json({ success: false, message: "id and colid are required" });
    const payload = buildPayload(req.body);
    if (!payload.academicyear || !payload.ativity || !payload.activitydate) {
      return res.status(400).json({ success: false, message: "Academic year, activity and activity date are required" });
    }
    const row = await AcademicCalendar.findOneAndUpdate({ _id: id, colid }, payload, { new: true });
    if (!row) return res.status(404).json({ success: false, message: "Academic calendar entry not found" });
    res.json({ success: true, data: row });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Unable to update academic calendar entry" });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const id = clean(req.body.id || req.body._id);
    if (!id || colid === undefined) return res.status(400).json({ success: false, message: "id and colid are required" });
    await AcademicCalendar.findOneAndDelete({ _id: id, colid });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Unable to delete academic calendar entry" });
  }
};

exports.bulk = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
    const user = clean(req.body.user) || "NA";
    const name = clean(req.body.name) || user;
    const errors = [];
    const docs = [];

    rows.forEach((row, index) => {
      const payload = buildPayload({
        academicyear: row.academicyear || row["Academic Year"],
        program: row.program || row.Program,
        programcode: row.programcode || row["Program Code"],
        regulation: row.regulation || row.Regulation,
        semester: row.semester || row.Semester,
        ativity: row.ativity || row.activity || row.Activity,
        description: row.description || row.Description,
        activitydate: row.activitydate || row["Activity Date"],
        type: row.type || row.Type,
        level: row.level || row.Level,
        status1: row.status1 || row.Status,
        comments: row.comments || row.Comments
      });
      if (!payload.academicyear || !payload.ativity || !payload.activitydate) {
        errors.push({ row: index + 2, message: "Academic year, activity and activity date are required" });
        return;
      }
      docs.push({ ...payload, colid, name, user });
    });

    if (docs.length) await AcademicCalendar.insertMany(docs, { ordered: false });
    res.json({ success: true, saved: docs.length, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Unable to bulk upload academic calendar" });
  }
};
