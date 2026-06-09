const ConductExamRateCard = require("../Models/conductexamratecardds");
const ConductExamExaminerAllotment = require("../Models/conductexamexaminerallotmentds");
const ConductExamQuestionPaper = require("../Models/conductexamquestionpaperds");
const ConductExamModerator = require("../Models/conductexammoderatords");
const ConductExamPaperSetter = require("../Models/conductexampapersetterds");
const NepLmsAssessmentMarks = require("../Models/neplmsassessmentmarksds");
const Institution = require("../Models/insdetails");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const uniq = (values) => [...new Set(values.map((item) => text(item)).filter(Boolean))].sort((a, b) => a.localeCompare(b));

const baseFilter = (source = {}) => {
  const filter = {};
  const colid = number(source.colid);
  if (colid !== undefined) filter.colid = colid;
  ["academicyear", "exam", "examcode", "regulation", "program", "programcode", "course", "coursecode"].forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  return filter;
};

const rateKey = (row = {}) => [row.academicyear, row.examcode, row.programcode, row.coursecode].map(text).join("|");

const getRateMap = async (filter) => {
  const rateFilter = { colid: filter.colid };
  ["academicyear", "examcode", "regulation", "programcode", "coursecode"].forEach((field) => {
    if (filter[field]) rateFilter[field] = filter[field];
  });
  const rows = await ConductExamRateCard.find({ ...rateFilter, status: /^Active$/i }).lean();
  const map = new Map();
  rows.forEach((row) => map.set(rateKey(row), row));
  return map;
};

const getInstitution = async (colid) => Institution.findOne({ colid: Number(colid) }).sort({ _id: -1 }).lean();

exports.options = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const mode = text(req.query.mode || req.query.type).toLowerCase();
    let Model = ConductExamRateCard;
    if (mode === "examiner") Model = ConductExamExaminerAllotment;
    if (mode === "papersetter" || mode === "paper-setter" || mode === "paper setter") Model = ConductExamPaperSetter;
    if (mode === "moderator") Model = ConductExamModerator;
    const rows = await Model.find({ colid }).sort({ academicyear: -1, examcode: 1, program: 1, course: 1 }).lean();
    res.json({
      success: true,
      rows,
      academicyears: uniq(rows.map((row) => row.academicyear)),
      examcodes: uniq(rows.map((row) => row.examcode)),
      regulations: uniq(rows.map((row) => row.regulation)),
      programs: uniq(rows.map((row) => `${row.programcode}||${row.program}`)).map((value) => {
        const [programcode, program] = value.split("||");
        return { programcode, program };
      }),
      courses: uniq(rows.map((row) => `${row.coursecode}||${row.course}`)).map((value) => {
        const [coursecode, course] = value.split("||");
        return { coursecode, course };
      })
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.examinerPayment = async (req, res) => {
  try {
    const filter = baseFilter(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [allotments, rateMap, institution] = await Promise.all([
      ConductExamExaminerAllotment.find(filter).sort({ examinername: 1, course: 1, regno: 1 }).lean(),
      getRateMap(filter),
      getInstitution(filter.colid)
    ]);
    const marksQuery = { colid: filter.colid };
    if (filter.academicyear) marksQuery.academicyear = filter.academicyear;
    if (filter.regulation) marksQuery.regulation = filter.regulation;
    if (filter.programcode) marksQuery.programcode = filter.programcode;
    if (filter.coursecode) marksQuery.coursecode = filter.coursecode;
    marksQuery.scoretype = /^External$/i;
    const marks = await NepLmsAssessmentMarks.find(marksQuery).select("academicyear programcode coursecode regno facultyemail").lean();
    const marksSet = new Set(marks.map((row) => [row.academicyear, row.programcode, row.coursecode, row.regno, text(row.facultyemail).toLowerCase()].join("|")));
    const grouped = new Map();
    allotments.forEach((row) => {
      const markKey = [row.academicyear, row.programcode, row.coursecode, row.regno, text(row.examineremail).toLowerCase()].join("|");
      if (!marksSet.has(markKey)) return;
      const rate = Number(rateMap.get(rateKey(row))?.examinerrate || 0);
      const key = text(row.examineremail).toLowerCase();
      if (!grouped.has(key)) grouped.set(key, { name: row.examinername, email: row.examineremail, count: 0, amount: 0, details: [] });
      const item = grouped.get(key);
      item.count += 1;
      item.amount += rate;
      item.details.push({ ...row, rate, amount: rate });
    });
    const data = [...grouped.values()].sort((a, b) => a.name.localeCompare(b.name));
    res.json({ success: true, data, totals: { count: data.reduce((sum, row) => sum + row.count, 0), amount: data.reduce((sum, row) => sum + row.amount, 0) }, institution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.paperSetterPayment = async (req, res) => {
  try {
    const filter = baseFilter(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const submittedStatus = ["InvigilatorSubmitted", "Moderation In Progress", "Moderation Submitted", "Accepted"];
    const [papers, rateMap, institution] = await Promise.all([
      ConductExamQuestionPaper.find({ ...filter, status: { $in: submittedStatus } }).sort({ papersettername: 1, course: 1 }).lean(),
      getRateMap(filter),
      getInstitution(filter.colid)
    ]);
    const grouped = new Map();
    papers.forEach((row) => {
      const rate = Number(rateMap.get(rateKey(row))?.papersetterrate || 0);
      const key = text(row.papersetteremail).toLowerCase();
      if (!grouped.has(key)) grouped.set(key, { name: row.papersettername, email: row.papersetteremail, count: 0, amount: 0, details: [] });
      const item = grouped.get(key);
      item.count += 1;
      item.amount += rate;
      item.details.push({ ...row, rate, amount: rate });
    });
    const data = [...grouped.values()].sort((a, b) => a.name.localeCompare(b.name));
    res.json({ success: true, data, totals: { count: data.reduce((sum, row) => sum + row.count, 0), amount: data.reduce((sum, row) => sum + row.amount, 0) }, institution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.moderatorPayment = async (req, res) => {
  try {
    const filter = baseFilter(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [moderators, papers, rateMap, institution] = await Promise.all([
      ConductExamModerator.find(filter).sort({ moderatorname: 1, course: 1 }).lean(),
      ConductExamQuestionPaper.find({ ...filter, status: { $in: ["Moderation Submitted", "Accepted"] } }).lean(),
      getRateMap(filter),
      getInstitution(filter.colid)
    ]);
    const paperSet = new Set(papers.map((row) => rateKey(row)));
    const grouped = new Map();
    moderators.forEach((row) => {
      if (!paperSet.has(rateKey(row))) return;
      const rate = Number(rateMap.get(rateKey(row))?.moderatorrate || 0);
      const key = text(row.moderatoremail).toLowerCase();
      if (!grouped.has(key)) grouped.set(key, { name: row.moderatorname, email: row.moderatoremail, count: 0, amount: 0, details: [] });
      const item = grouped.get(key);
      item.count += 1;
      item.amount += rate;
      item.details.push({ ...row, rate, amount: rate });
    });
    const data = [...grouped.values()].sort((a, b) => a.name.localeCompare(b.name));
    res.json({ success: true, data, totals: { count: data.reduce((sum, row) => sum + row.count, 0), amount: data.reduce((sum, row) => sum + row.amount, 0) }, institution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
