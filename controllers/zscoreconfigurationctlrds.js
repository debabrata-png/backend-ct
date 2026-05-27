const ZScoreConfiguration = require("../Models/zscoreconfigurationds");
const RegulationCourseMap = require("../Models/regulationcoursemapds");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value || "").trim();

const cleanPayload = (input = {}) => ({
  academicyear: text(input.academicyear || input.academicYear),
  regulation: text(input.regulation),
  program: text(input.program),
  programcode: text(input.programcode),
  course: text(input.course),
  coursecode: text(input.coursecode),
  from: toNumber(input.from) || 0,
  to: toNumber(input.to) || 0,
  grade: text(input.grade),
  gradepoint: toNumber(input.gradepoint || input.gradePoint) || 0,
  colid: toNumber(input.colid),
  user: text(input.user)
});

const validatePayload = (payload) => {
  if (payload.colid === undefined) return "colid is required";
  if (!payload.academicyear) return "Academic year is required";
  if (!payload.regulation) return "Regulation is required";
  if (!payload.program) return "Program is required";
  if (!payload.programcode) return "Program code is required";
  if (!payload.course) return "Course is required";
  if (!payload.coursecode) return "Course code is required";
  if (!payload.grade) return "Grade is required";
  if (payload.from > payload.to) return "From cannot be more than To";
  return "";
};

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  ["academicyear", "regulation", "program", "programcode", "course", "coursecode", "grade"].forEach((field) => {
    if (source[field]) query[field] = source[field];
  });
  return query;
};

const uniqueSorted = (values = []) => [...new Set(values.map(text).filter(Boolean))]
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

exports.createZScoreConfiguration = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await ZScoreConfiguration.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkUploadZScoreConfiguration = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
    if (!rows.length) return res.status(400).json({ success: false, message: "No rows received" });

    const errors = [];
    const ops = [];
    rows.forEach((row, index) => {
      const payload = cleanPayload({ ...row, colid, user: req.body.user });
      const error = validatePayload(payload);
      if (error) {
        errors.push({ row: index + 2, message: error });
        return;
      }
      ops.push({
        updateOne: {
          filter: {
            colid,
            academicyear: payload.academicyear,
            regulation: payload.regulation,
            programcode: payload.programcode,
            coursecode: payload.coursecode,
            grade: payload.grade
          },
          update: { $set: payload },
          upsert: true
        }
      });
    });

    if (!ops.length) return res.status(400).json({ success: false, message: "No valid rows found", errors });
    const result = await ZScoreConfiguration.bulkWrite(ops, { ordered: false });
    res.json({
      success: true,
      message: `Bulk upload completed. Valid rows: ${ops.length}. Rejected rows: ${errors.length}.`,
      inserted: result.upsertedCount || 0,
      updated: result.modifiedCount || 0,
      matched: result.matchedCount || 0,
      errors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getZScoreConfigurations = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ZScoreConfiguration.find(query).sort({
      academicyear: 1,
      regulation: 1,
      programcode: 1,
      course: 1,
      from: 1
    });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateZScoreConfiguration = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await ZScoreConfiguration.findOneAndUpdate(
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

exports.deleteZScoreConfiguration = async (req, res) => {
  try {
    const data = await ZScoreConfiguration.findOneAndDelete({ _id: req.body.id, colid: toNumber(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getZScoreConfigurationOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const courseQuery = { colid };
    ["academicyear", "regulation", "program", "programcode", "course", "coursecode"].forEach((field) => {
      if (req.query[field]) courseQuery[field] = req.query[field];
    });

    const [courseMaps, configs] = await Promise.all([
      RegulationCourseMap.find(courseQuery).sort({ academicyear: 1, regulation: 1, programcode: 1, course: 1 }).lean(),
      ZScoreConfiguration.find({ colid }).lean()
    ]);
    const allRows = [...courseMaps, ...configs];

    res.json({
      success: true,
      academicyears: uniqueSorted(allRows.map((item) => item.academicyear)),
      regulations: uniqueSorted(allRows.map((item) => item.regulation)),
      programs: (() => {
        const map = new Map();
        allRows.forEach((item) => {
          if (item.programcode) map.set(item.programcode, { programcode: item.programcode, program: item.program || "" });
        });
        return [...map.values()].sort((a, b) => String(a.programcode).localeCompare(String(b.programcode), undefined, { numeric: true }));
      })(),
      courses: courseMaps.map((item) => ({
        _id: item._id,
        academicyear: item.academicyear || "",
        regulation: item.regulation || "",
        program: item.program || "",
        programcode: item.programcode || "",
        course: item.course || "",
        coursecode: item.coursecode || ""
      })),
      grades: uniqueSorted(configs.map((item) => item.grade))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
