const Syllabus = require("../Models/syllabusds");
const RegulationCourseMap = require("../Models/regulationcoursemapds");

const text = (value) => String(value || "").trim();

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const uniq = (items) => [...new Set(items.map(text).filter(Boolean))].sort((a, b) => a.localeCompare(b));

const cleanPayload = (input = {}) => ({
  academicyear: text(input.academicyear || input.academicYear),
  regulation: text(input.regulation),
  program: text(input.program),
  programcode: text(input.programcode),
  type: text(input.type),
  subject: text(input.subject),
  semester: text(input.semester),
  course: text(input.course),
  coursecode: text(input.coursecode),
  module: text(input.module),
  syllabus: text(input.syllabus),
  colid: toNumber(input.colid),
  user: text(input.user)
});

const validatePayload = (payload) => {
  if (payload.colid === undefined) return "colid is required";
  if (!payload.academicyear) return "Academic year is required";
  if (!payload.regulation) return "Regulation is required";
  if (!payload.program) return "Program is required";
  if (!payload.programcode) return "Program code is required";
  if (!payload.type) return "Type is required";
  if (!payload.subject) return "Subject is required";
  if (!payload.semester) return "Semester is required";
  if (!payload.course) return "Course is required";
  if (!payload.coursecode) return "Course code is required";
  if (!payload.module) return "Module is required";
  if (!payload.syllabus) return "Syllabus is required";
  if (!["Major", "Minor"].includes(payload.type)) return "Type should be Major or Minor";
  return "";
};

const courseMapQueryFromPayload = (payload) => ({
  colid: payload.colid,
  academicyear: payload.academicyear,
  regulation: payload.regulation,
  program: payload.program,
  programcode: payload.programcode,
  type: payload.type,
  subject: payload.subject,
  semester: payload.semester,
  course: payload.course,
  coursecode: payload.coursecode
});

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  ["academicyear", "regulation", "program", "programcode", "type", "subject", "semester", "course", "coursecode", "module"].forEach((field) => {
    if (text(source[field])) query[field] = text(source[field]);
  });
  return query;
};

exports.getSyllabusOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const courseQuery = { colid, type: { $in: ["Major", "Minor"] } };
    ["academicyear", "regulation", "program", "programcode", "subject", "semester", "course", "coursecode"].forEach((field) => {
      if (text(req.query[field])) courseQuery[field] = text(req.query[field]);
    });
    if (text(req.query.type)) courseQuery.type = text(req.query.type);

    const [courseMaps, syllabi] = await Promise.all([
      RegulationCourseMap.find(courseQuery).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, subject: 1, semester: 1, course: 1 }).lean(),
      Syllabus.find({ colid }).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, subject: 1, semester: 1, course: 1, module: 1 }).lean()
    ]);

    const programMap = new Map();
    courseMaps.forEach((item) => {
      if (item.programcode) programMap.set(item.programcode, {
        program: item.program || "",
        programcode: item.programcode || ""
      });
    });

    const courseMap = new Map();
    courseMaps.forEach((item) => {
      if (item.coursecode) courseMap.set(item.coursecode, {
        course: item.course || "",
        coursecode: item.coursecode || "",
        academicyear: item.academicyear || "",
        regulation: item.regulation || "",
        program: item.program || "",
        programcode: item.programcode || "",
        type: item.type || "",
        subject: item.subject || "",
        semester: item.semester || ""
      });
    });

    res.json({
      success: true,
      academicyears: uniq(courseMaps.map((item) => item.academicyear)),
      regulations: uniq(courseMaps.map((item) => item.regulation)),
      programs: [...programMap.values()].sort((a, b) => String(a.programcode).localeCompare(String(b.programcode))),
      types: uniq(courseMaps.map((item) => item.type)),
      subjects: uniq(courseMaps.map((item) => item.subject)),
      semesters: uniq(courseMaps.map((item) => item.semester)),
      courseNames: uniq(courseMaps.map((item) => item.course)),
      courseCodes: uniq(courseMaps.map((item) => item.coursecode)),
      courses: [...courseMap.values()].sort((a, b) => String(a.coursecode).localeCompare(String(b.coursecode))),
      modules: uniq(syllabi.map((item) => item.module))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSyllabus = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const mappedCourse = await RegulationCourseMap.exists(courseMapQueryFromPayload(payload));
    if (!mappedCourse) return res.status(400).json({ success: false, message: "Selected course mapping was not found in regulation course map" });
    const data = await Syllabus.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSyllabi = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await Syllabus.find(query).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, subject: 1, semester: 1, course: 1, module: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSyllabus = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const mappedCourse = await RegulationCourseMap.exists(courseMapQueryFromPayload(payload));
    if (!mappedCourse) return res.status(400).json({ success: false, message: "Selected course mapping was not found in regulation course map" });
    const data = await Syllabus.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSyllabus = async (req, res) => {
  try {
    const data = await Syllabus.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkCreateSyllabi = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!items.length) return res.status(400).json({ success: false, message: "No rows received" });

    const errors = [];
    const valid = [];
    for (const [index, item] of items.entries()) {
      const payload = cleanPayload({ ...item, colid: req.body.colid || item.colid, user: req.body.user || item.user });
      const error = validatePayload(payload);
      if (error) errors.push({ rowNumber: item.rowNumber || index + 2, message: error });
      else {
        const mappedCourse = await RegulationCourseMap.exists(courseMapQueryFromPayload(payload));
        if (!mappedCourse) errors.push({ rowNumber: item.rowNumber || index + 2, message: "Selected course mapping was not found in regulation course map" });
        else valid.push(payload);
      }
    }

    if (valid.length) await Syllabus.insertMany(valid, { ordered: false });
    res.json({ success: true, inserted: valid.length, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
