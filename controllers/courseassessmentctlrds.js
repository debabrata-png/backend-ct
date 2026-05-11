const CourseAssessment = require("../Models/courseassessmentds");
const RegulationCourseMap = require("../Models/regulationcoursemapds");
const RegulationSubject = require("../Models/regulationsubjectds");

const allowedTypes = new Set(["Major", "Minor"]);
const allowedGroupTypes = new Set(["Best", "Average"]);
const allowedScoreTypes = new Set(["Internal", "External"]);

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
  type: allowedTypes.has(input.type) ? input.type : "",
  subject: text(input.subject),
  semester: text(input.semester),
  course: text(input.course),
  coursecode: text(input.coursecode),
  assessmentgroup: text(input.assessmentgroup || input.assessmentGroup),
  grouptype: allowedGroupTypes.has(input.grouptype || input.groupType) ? (input.grouptype || input.groupType) : undefined,
  scoretype: allowedScoreTypes.has(input.scoretype || input.scoreType) ? (input.scoretype || input.scoreType) : undefined,
  assessmentcomponent: text(input.assessmentcomponent || input.assessmentComponent),
  marks: toNumber(input.marks) || 0,
  passmarks: toNumber(input.passmarks || input.passMarks) || 0,
  weightage: toNumber(input.weightage) || 0,
  credits: toNumber(input.credits || input.credit) || 0,
  colid: toNumber(input.colid),
  user: text(input.user),
  status: text(input.status) || "Active"
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
  if (!payload.assessmentcomponent) return "Assessment component is required";
  return "";
};

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  ["academicyear", "regulation", "program", "programcode", "type", "subject", "semester", "course", "coursecode", "assessmentgroup", "grouptype", "scoretype", "assessmentcomponent", "status"].forEach((field) => {
    if (source[field]) query[field] = source[field];
  });
  return query;
};

const uniq = (items) => [...new Set(items.map(text).filter(Boolean))].sort((a, b) => a.localeCompare(b));

exports.getCourseAssessmentOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const courseQuery = { colid };
    ["academicyear", "regulation", "programcode", "type", "subject", "semester"].forEach((field) => {
      if (req.query[field]) courseQuery[field] = req.query[field];
    });
    const subjectQuery = { colid };
    ["academicyear", "regulation", "program", "programcode", "type"].forEach((field) => {
      if (req.query[field]) subjectQuery[field] = req.query[field];
    });
    if (req.query.status) subjectQuery.status = req.query.status;

    const [courseMaps, regulationSubjects, assessments] = await Promise.all([
      RegulationCourseMap.find(courseQuery).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, subject: 1, semester: 1, course: 1 }).lean(),
      RegulationSubject.find(subjectQuery).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, subject: 1 }).lean(),
      CourseAssessment.find({ colid }).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, course: 1 }).lean()
    ]);

    const allRows = [...courseMaps, ...assessments];
    const programMap = new Map();
    allRows.forEach((item) => {
      if (item.programcode) programMap.set(item.programcode, {
        programcode: item.programcode,
        program: item.program || ""
      });
    });

    const courseMap = new Map();
    courseMaps.forEach((item) => {
      if (item.coursecode) courseMap.set(item.coursecode, {
        _id: item._id,
        course: item.course || "",
        coursecode: item.coursecode || "",
        subject: item.subject || "",
        semester: item.semester || "",
        credit: item.credit || 0
      });
    });

    res.json({
      success: true,
      academicyears: uniq(allRows.map((item) => item.academicyear)),
      regulations: uniq(allRows.map((item) => item.regulation)),
      programs: [...programMap.values()].sort((a, b) => String(a.programcode).localeCompare(String(b.programcode))),
      types: uniq(allRows.map((item) => item.type)).filter((item) => allowedTypes.has(item)),
      subjects: uniq(regulationSubjects.map((item) => item.subject)),
      semesters: uniq(courseMaps.map((item) => item.semester)),
      courses: [...courseMap.values()],
      assessmentgroups: uniq(assessments.map((item) => item.assessmentgroup)),
      grouptypes: Array.from(allowedGroupTypes),
      scoretypes: Array.from(allowedScoreTypes),
      assessmentcomponents: uniq(assessments.map((item) => item.assessmentcomponent))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCourseAssessment = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await CourseAssessment.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseAssessments = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await CourseAssessment.find(query).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, course: 1, assessmentgroup: 1, grouptype: 1, scoretype: 1, assessmentcomponent: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCourseAssessment = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await CourseAssessment.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCourseAssessment = async (req, res) => {
  try {
    const data = await CourseAssessment.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkCreateCourseAssessments = async (req, res) => {
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

    if (valid.length) await CourseAssessment.insertMany(valid, { ordered: false });
    res.json({ success: true, inserted: valid.length, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
