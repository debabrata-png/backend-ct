const ConductExamQuestionPaper = require("../Models/conductexamquestionpaperds");
const ConductExamScoreRule = require("../Models/conductexamscoreruleds");
const ConductExamOnScreenMark = require("../Models/conductexamonscreenmarkds");
const ConductExamExaminerAllotment = require("../Models/conductexamexaminerallotmentds");
const CourseAssessment = require("../Models/courseassessmentds");
const NepLmsAssessmentMarks = require("../Models/neplmsassessmentmarksds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const colNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const uniq = (values = []) => [...new Set(values.map((item) => text(item)).filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
const escapeRegex = (value) => text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildFilter = (source = {}, fields = []) => {
  const filter = {};
  const colid = colNumber(source.colid);
  if (colid !== undefined) filter.colid = colid;
  fields.forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  return filter;
};

const basePaperFields = ["academicyear", "exam", "examcode", "regulation", "program", "programcode", "course", "coursecode"];

const rulePayload = (body = {}) => ({
  colid: colNumber(body.colid),
  academicyear: text(body.academicyear),
  exam: text(body.exam),
  examcode: text(body.examcode),
  regulation: text(body.regulation),
  program: text(body.program),
  programcode: text(body.programcode),
  course: text(body.course),
  coursecode: text(body.coursecode),
  paperid: text(body.paperid),
  sectionid: text(body.sectionid),
  section: text(body.section),
  questionsconsider: number(body.questionsconsider) || 1,
  status: text(body.status) || "Active",
  user: text(body.user)
});

const validateRule = (item) => {
  if (item.colid === undefined) return "colid is required";
  for (const field of [...basePaperFields, "paperid", "sectionid", "section"]) {
    if (!item[field]) return `${field} is required`;
  }
  if (item.questionsconsider <= 0) return "Questions to consider must be greater than zero";
  return "";
};

exports.options = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const filter = buildFilter(req.query, basePaperFields);
    const papers = await ConductExamQuestionPaper.find({ ...filter, status: /^Accepted$/i })
      .sort({ academicyear: -1, exam: 1, program: 1, course: 1 })
      .lean();
    res.json({
      success: true,
      papers,
      academicyears: uniq(papers.map((row) => row.academicyear)),
      exams: uniq(papers.map((row) => `${row.examcode}||${row.exam}`)).map((value) => {
        const [examcode, exam] = value.split("||");
        return { examcode, exam };
      }),
      regulations: uniq(papers.map((row) => row.regulation)),
      programs: uniq(papers.map((row) => `${row.programcode}||${row.program}`)).map((value) => {
        const [programcode, program] = value.split("||");
        return { programcode, program };
      }),
      courses: uniq(papers.map((row) => `${row.coursecode}||${row.course}`)).map((value) => {
        const [coursecode, course] = value.split("||");
        return { coursecode, course };
      })
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRules = async (req, res) => {
  try {
    const filter = buildFilter(req.query, [...basePaperFields, "paperid", "sectionid", "status"]);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ConductExamScoreRule.find(filter).sort({ academicyear: -1, exam: 1, course: 1, section: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveRule = async (req, res) => {
  try {
    const item = rulePayload(req.body);
    const error = validateRule(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await ConductExamScoreRule.findOneAndUpdate({ _id: req.body.id, colid: item.colid }, item, { new: true, runValidators: true })
      : await ConductExamScoreRule.findOneAndUpdate({ colid: item.colid, paperid: item.paperid, sectionid: item.sectionid }, item, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? "Rule already exists for this section" : error.message });
  }
};

exports.deleteRule = async (req, res) => {
  try {
    const result = await ConductExamScoreRule.deleteOne({ _id: req.body.id, colid: colNumber(req.body.colid) });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markingOptions = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    const examineremail = text(req.query.examineremail || req.query.user);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!examineremail) return res.status(400).json({ success: false, message: "examineremail is required" });
    const allotments = await ConductExamExaminerAllotment.find({
      colid,
      examineremail: new RegExp(`^${escapeRegex(examineremail)}$`, "i")
    }).sort({ academicyear: -1, exam: 1, course: 1 }).lean();
    const paperFilter = {
      colid,
      status: /^Accepted$/i,
      $or: allotments.map((row) => ({
        academicyear: row.academicyear,
        examcode: row.examcode,
        programcode: row.programcode,
        coursecode: row.coursecode
      }))
    };
    const papers = allotments.length ? await ConductExamQuestionPaper.find(paperFilter).sort({ academicyear: -1, exam: 1, course: 1 }).lean() : [];
    res.json({ success: true, papers, academicyears: uniq(papers.map((row) => row.academicyear)) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.loadStudents = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    const examineremail = text(req.query.examineremail || req.query.user);
    const paperid = text(req.query.paperid);
    if (colid === undefined || !examineremail || !paperid) return res.status(400).json({ success: false, message: "colid, examineremail and paper are required" });
    const paper = await ConductExamQuestionPaper.findOne({ _id: paperid, colid, status: /^Accepted$/i }).lean();
    if (!paper) return res.status(404).json({ success: false, message: "Accepted paper not found" });
    const students = await ConductExamExaminerAllotment.find({
      colid,
      examineremail: new RegExp(`^${escapeRegex(examineremail)}$`, "i"),
      academicyear: paper.academicyear,
      examcode: paper.examcode,
      programcode: paper.programcode,
      coursecode: paper.coursecode
    }).sort({ regno: 1, student: 1 }).lean();
    res.json({ success: true, paper, students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.loadStudentMarks = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    const paperid = text(req.query.paperid);
    const regno = text(req.query.regno);
    if (colid === undefined || !paperid || !regno) return res.status(400).json({ success: false, message: "colid, paper and regno are required" });
    const [paper, rules, marks] = await Promise.all([
      ConductExamQuestionPaper.findOne({ _id: paperid, colid, status: /^Accepted$/i }).lean(),
      ConductExamScoreRule.find({ colid, paperid, status: /^Active$/i }).lean(),
      ConductExamOnScreenMark.find({ colid, paperid, regno }).lean()
    ]);
    if (!paper) return res.status(404).json({ success: false, message: "Accepted paper not found" });
    const markMap = new Map(marks.map((row) => [row.questionid, row]));
    res.json({ success: true, paper, rules, marks: markMap.size ? Object.fromEntries(markMap.entries()) : {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveQuestionMarks = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const paperid = text(req.body.paperid);
    const student = req.body.student || {};
    const marks = Array.isArray(req.body.marks) ? req.body.marks : [];
    if (colid === undefined || !paperid || !text(student.regno)) return res.status(400).json({ success: false, message: "colid, paper and student are required" });
    const paper = await ConductExamQuestionPaper.findOne({ _id: paperid, colid, status: /^Accepted$/i }).lean();
    if (!paper) return res.status(404).json({ success: false, message: "Accepted paper not found" });
    const ops = [];
    marks.forEach((row) => {
      const marksValue = number(row.marks);
      const maxmarks = number(row.maxmarks);
      if (marksValue < 0 || marksValue > maxmarks) return;
      const payload = {
        colid,
        academicyear: paper.academicyear,
        exam: paper.exam,
        examcode: paper.examcode,
        regulation: paper.regulation,
        program: paper.program,
        programcode: paper.programcode,
        type: paper.type,
        subject: paper.subject,
        semester: paper.semester,
        course: paper.course,
        coursecode: paper.coursecode,
        paperid,
        sectionid: text(row.sectionid),
        section: text(row.section),
        questionid: text(row.questionid),
        question: text(row.question),
        maxmarks,
        marks: marksValue,
        student: text(student.student),
        regno: text(student.regno),
        email: text(student.email),
        phone: text(student.phone),
        examinername: text(student.examinername),
        examineremail: text(student.examineremail),
        finalized: "No",
        user: text(req.body.user)
      };
      ops.push({ updateOne: { filter: { colid, paperid, regno: payload.regno, questionid: payload.questionid }, update: { $set: payload }, upsert: true } });
    });
    let saved = 0;
    if (ops.length) {
      const result = await ConductExamOnScreenMark.bulkWrite(ops, { ordered: false });
      saved = (result.upsertedCount || 0) + (result.modifiedCount || 0) + (result.matchedCount || 0);
    }
    res.json({ success: true, saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.finalizeStudent = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const paperid = text(req.body.paperid);
    const student = req.body.student || {};
    if (colid === undefined || !paperid || !text(student.regno)) return res.status(400).json({ success: false, message: "colid, paper and student are required" });
    const [paper, rules, marks, assessment] = await Promise.all([
      ConductExamQuestionPaper.findOne({ _id: paperid, colid, status: /^Accepted$/i }).lean(),
      ConductExamScoreRule.find({ colid, paperid, status: /^Active$/i }).lean(),
      ConductExamOnScreenMark.find({ colid, paperid, regno: text(student.regno) }).lean(),
      CourseAssessment.findOne({ colid, scoretype: /^External$/i, academicyear: text(req.body.academicyear), regulation: text(req.body.regulation), programcode: text(req.body.programcode), coursecode: text(req.body.coursecode) }).sort({ _id: 1 }).lean()
    ]);
    if (!paper) return res.status(404).json({ success: false, message: "Accepted paper not found" });
    if (!rules.length) return res.status(400).json({ success: false, message: "No active exam score rule found for this paper" });
    if (!assessment) return res.status(400).json({ success: false, message: "No external assessment component found for this course" });

    const sectionTotals = rules.map((rule) => {
      const sectionMarks = marks.filter((row) => row.sectionid === rule.sectionid).sort((a, b) => Number(b.marks || 0) - Number(a.marks || 0));
      const considered = sectionMarks.slice(0, Number(rule.questionsconsider || 1));
      return { section: rule.section, total: considered.reduce((sum, row) => sum + Number(row.marks || 0), 0), considered: considered.length };
    });
    const total = Number(sectionTotals.reduce((sum, row) => sum + row.total, 0).toFixed(2));
    const weightage = number(assessment.weightage);
    const payload = {
      academicyear: paper.academicyear,
      regulation: paper.regulation,
      program: paper.program,
      programcode: paper.programcode,
      type: paper.type || assessment.type,
      subject: paper.subject || assessment.subject,
      semester: paper.semester || assessment.semester,
      course: paper.course,
      coursecode: paper.coursecode,
      assessmentcomponent: assessment.assessmentcomponent,
      assessmentgroup: assessment.assessmentgroup,
      grouptype: assessment.grouptype,
      scoretype: "External",
      totalmarks: number(assessment.marks),
      weightage,
      marksobtained: total,
      effectivemarks: total * weightage,
      student: text(student.student),
      regno: text(student.regno),
      email: text(student.email),
      phone: text(student.phone),
      faculty: text(student.examinername),
      facultyemail: text(student.examineremail),
      status: "Added",
      colid,
      user: text(req.body.user)
    };
    await NepLmsAssessmentMarks.findOneAndUpdate(
      { colid, academicyear: payload.academicyear, semester: payload.semester, coursecode: payload.coursecode, assessmentcomponent: payload.assessmentcomponent, assessmentgroup: payload.assessmentgroup, regno: payload.regno },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    await ConductExamOnScreenMark.updateMany({ colid, paperid, regno: payload.regno }, { $set: { finalized: "Yes" } });
    res.json({ success: true, total, sectionTotals, assessmentcomponent: payload.assessmentcomponent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
