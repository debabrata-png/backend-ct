const AcademicSubject = require("../Models/academicsubjectds");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value || "").trim();
const allowedStatuses = new Set(["Active", "Inactive"]);
const allowedTypes = new Set(["Grant-in", "Non Grant"]);

const cleanPayload = (input = {}) => ({
  academicyear: text(input.academicyear || input.academicYear || input["Academic Year"]),
  stream: text(input.stream || input.Stream),
  type: allowedTypes.has(text(input.type || input.Type)) ? text(input.type || input.Type) : "Grant-in",
  program: text(input.program || input.Program),
  semester: text(input.semester || input.Semester),
  subjects: text(input.subjects || input.subject || input.Subjects || input.Subject),
  status: allowedStatuses.has(text(input.status || input.Status)) ? text(input.status || input.Status) : "Active",
  colid: toNumber(input.colid),
  user: text(input.user)
});

const validatePayload = (payload) => {
  if (payload.colid === undefined) return "colid is required";
  if (!payload.academicyear) return "Academic year is required";
  if (!payload.stream) return "Stream is required";
  if (!payload.type) return "Type is required";
  if (!payload.program) return "Program is required";
  if (!payload.semester) return "Semester is required";
  if (!payload.subjects) return "Subjects is required";
  return "";
};

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  ["academicyear", "stream", "type", "program", "semester", "status"].forEach((field) => {
    if (source[field]) query[field] = source[field];
  });
  if (source.subjects) query.subjects = { $regex: source.subjects, $options: "i" };
  return query;
};

exports.createAcademicSubject = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await AcademicSubject.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAcademicSubjects = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await AcademicSubject.find(query).sort({ academicyear: 1, stream: 1, type: 1, program: 1, semester: 1, subjects: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAcademicSubject = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await AcademicSubject.findOneAndUpdate(
      { _id: req.body.id, colid: payload.colid },
      payload,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAcademicSubject = async (req, res) => {
  try {
    const data = await AcademicSubject.findOneAndDelete({
      _id: req.body.id,
      colid: toNumber(req.body.colid)
    });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkCreateAcademicSubjects = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!items.length) return res.status(400).json({ success: false, message: "No rows received" });

    const errors = [];
    const valid = [];
    items.forEach((item, index) => {
      const payload = cleanPayload({ ...item, colid: req.body.colid || item.colid, user: req.body.user || item.user });
      const error = validatePayload(payload);
      if (error) errors.push({ rowNumber: item.rowNumber || index + 2, message: error });
      else valid.push(payload);
    });

    if (valid.length) await AcademicSubject.insertMany(valid, { ordered: false });
    res.json({ success: true, inserted: valid.length, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
