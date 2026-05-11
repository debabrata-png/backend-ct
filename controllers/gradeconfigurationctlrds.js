const GradeConfiguration = require("../Models/gradeconfigurationds");
const RegulationCourseMap = require("../Models/regulationcoursemapds");
const RegulationSubject = require("../Models/regulationsubjectds");

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
  type: text(input.type),
  subject: text(input.subject),
  semester: text(input.semester),
  course: text(input.course),
  coursecode: text(input.coursecode),
  frompercentage: toNumber(input.frompercentage || input.fromPercentage) || 0,
  topercentage: toNumber(input.topercentage || input.toPercentage) || 0,
  gradepoint: toNumber(input.gradepoint || input.gradePoint) || 0,
  grade: text(input.grade),
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
  if (!payload.grade) return "Grade is required";
  if (payload.frompercentage > payload.topercentage) return "From percentage cannot be more than to percentage";
  return "";
};

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  [
    "academicyear",
    "regulation",
    "program",
    "programcode",
    "type",
    "subject",
    "semester",
    "course",
    "coursecode",
    "grade",
    "status"
  ].forEach((field) => {
    if (source[field]) query[field] = source[field];
  });
  return query;
};

const uniqueSorted = (values) => [...new Set(values.map(text).filter(Boolean))]
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

exports.createGradeConfiguration = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await GradeConfiguration.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGradeConfigurations = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await GradeConfiguration.find(query).sort({
      academicyear: 1,
      regulation: 1,
      programcode: 1,
      type: 1,
      subject: 1,
      semester: 1,
      course: 1,
      frompercentage: 1
    });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGradeConfiguration = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await GradeConfiguration.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGradeConfiguration = async (req, res) => {
  try {
    const data = await GradeConfiguration.findOneAndDelete({ _id: req.body.id, colid: toNumber(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkCreateGradeConfigurations = async (req, res) => {
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

    if (valid.length) await GradeConfiguration.insertMany(valid, { ordered: false });
    res.json({ success: true, inserted: valid.length, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGradeConfigurationOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const courseQuery = { colid };
    const subjectQuery = { colid };
    ["academicyear", "regulation", "program", "programcode", "type", "subject", "semester"].forEach((field) => {
      if (req.query[field]) {
        courseQuery[field] = req.query[field];
        subjectQuery[field] = req.query[field];
      }
    });
    delete subjectQuery.semester;
    if (req.query.status) {
      courseQuery.status = req.query.status;
      subjectQuery.status = req.query.status;
    }

    const [allCourseMaps, courseMaps, regulationSubjects, grades] = await Promise.all([
      RegulationCourseMap.find({ colid }).sort({
        academicyear: 1,
        regulation: 1,
        programcode: 1,
        type: 1,
        subject: 1,
        semester: 1,
        course: 1
      }).lean(),
      RegulationCourseMap.find(courseQuery).sort({
        academicyear: 1,
        regulation: 1,
        programcode: 1,
        type: 1,
        subject: 1,
        semester: 1,
        course: 1
      }).lean(),
      RegulationSubject.find(subjectQuery).sort({
        academicyear: 1,
        regulation: 1,
        programcode: 1,
        type: 1,
        subject: 1
      }).lean(),
      GradeConfiguration.find({ colid }).lean()
    ]);
    const allRows = [...allCourseMaps, ...grades, ...regulationSubjects];

    res.json({
      success: true,
      academicyears: uniqueSorted(allRows.map((item) => item.academicyear)),
      regulations: uniqueSorted(allRows.map((item) => item.regulation)),
      programs: (() => {
        const programMap = new Map();
        allRows.forEach((item) => {
          if (item.programcode) {
            programMap.set(item.programcode, {
              programcode: item.programcode,
              program: item.program || ""
            });
          }
        });
        return [...programMap.values()].sort((a, b) => String(a.programcode).localeCompare(String(b.programcode)));
      })(),
      types: uniqueSorted(allRows.map((item) => item.type)),
      subjects: uniqueSorted(regulationSubjects.map((item) => item.subject)),
      semesters: uniqueSorted(allRows.map((item) => item.semester)),
      courses: courseMaps.map((item) => ({
        _id: item._id,
        academicyear: item.academicyear || "",
        regulation: item.regulation || "",
        program: item.program || "",
        programcode: item.programcode || "",
        type: item.type || "",
        subject: item.subject || "",
        semester: item.semester || "",
        course: item.course || "",
        coursecode: item.coursecode || ""
      })),
      grades: uniqueSorted(grades.map((item) => item.grade))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
