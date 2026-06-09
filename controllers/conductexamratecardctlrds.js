const ConductExamCourse = require("../Models/conductexamcourseds");
const ConductExamRateCard = require("../Models/conductexamratecardds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const colNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const payload = (body = {}) => ({
  colid: colNumber(body.colid),
  academicyear: text(body.academicyear),
  exam: text(body.exam || body.examname),
  examcode: text(body.examcode),
  regulation: text(body.regulation),
  program: text(body.program),
  programcode: text(body.programcode),
  course: text(body.course),
  coursecode: text(body.coursecode),
  coursemastercode: text(body.coursemastercode),
  papersetterrate: number(body.papersetterrate),
  moderatorrate: number(body.moderatorrate),
  examinerrate: number(body.examinerrate),
  practicalrate: number(body.practicalrate),
  status: text(body.status) || "Active",
  user: text(body.user)
});

const validate = (p) => {
  if (p.colid === undefined) return "colid is required";
  for (const field of ["academicyear", "exam", "examcode", "program", "programcode", "course", "coursecode"]) {
    if (!p[field]) return `${field} is required`;
  }
  return "";
};

const filterFrom = (source = {}) => {
  const filter = {};
  const colid = colNumber(source.colid);
  if (colid !== undefined) filter.colid = colid;
  ["academicyear", "exam", "examcode", "regulation", "program", "programcode", "course", "coursecode", "coursemastercode", "status"].forEach((field) => {
    if (source[field]) filter[field] = text(source[field]);
  });
  return filter;
};

exports.getExamCourses = async (req, res) => {
  try {
    const filter = filterFrom(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ConductExamCourse.find(filter)
      .sort({ academicyear: -1, exam: 1, program: 1, course: 1 })
      .lean();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRateCards = async (req, res) => {
  try {
    const filter = filterFrom(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ConductExamRateCard.find(filter)
      .sort({ academicyear: -1, exam: 1, program: 1, course: 1 })
      .lean();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveRateCard = async (req, res) => {
  try {
    const p = payload(req.body);
    const error = validate(p);
    if (error) return res.status(400).json({ success: false, message: error });
    const row = req.body.id
      ? await ConductExamRateCard.findOneAndUpdate({ _id: req.body.id, colid: p.colid }, p, { new: true, runValidators: true })
      : await ConductExamRateCard.findOneAndUpdate(
        { colid: p.colid, academicyear: p.academicyear, examcode: p.examcode, programcode: p.programcode, coursecode: p.coursecode, coursemastercode: p.coursemastercode },
        p,
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
    res.json({ success: true, data: row });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRateCard = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!req.body.id) return res.status(400).json({ success: false, message: "id is required" });
    const result = await ConductExamRateCard.deleteOne({ _id: req.body.id, colid });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkRateCards = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const colid = colNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!items.length) return res.status(400).json({ success: false, message: "No rows found" });
    const saved = [];
    for (const item of items) {
      const p = payload({ ...item, colid, user: req.body.user || item.user });
      if (validate(p)) continue;
      const row = await ConductExamRateCard.findOneAndUpdate(
        { colid: p.colid, academicyear: p.academicyear, examcode: p.examcode, programcode: p.programcode, coursecode: p.coursecode, coursemastercode: p.coursemastercode },
        p,
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
      saved.push(row);
    }
    res.json({ success: true, saved: saved.length, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
