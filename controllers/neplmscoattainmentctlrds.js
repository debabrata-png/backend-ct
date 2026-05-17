const Assessment = require("../Models/neplmsdescriptiveassessmentds");
const Attempt = require("../Models/neplmsdescriptiveattemptds");
const CoAttainment = require("../Models/neplmscoattainmentds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const normalizeCriteria = (criteria = []) => (Array.isArray(criteria) ? criteria : []).map((item) => ({
  level: text(item.level),
  fromvalue: number(item.fromvalue),
  tovalue: number(item.tovalue)
})).filter((item) => item.level);

const levelForPercentage = (percentage, criteria) => {
  const match = criteria.find((item) => percentage >= item.fromvalue && percentage <= item.tovalue);
  return match?.level || "";
};

exports.processCoAttainment = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const assessment = await Assessment.findOne({ _id: req.body.assessmentid, colid }).lean();
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });

    const threshold = number(req.body.threshold);
    const levelcriteria = normalizeCriteria(req.body.levelcriteria || req.body.levels);
    if (!levelcriteria.length) return res.status(400).json({ success: false, message: "Level criteria is required" });

    const attempts = await Attempt.find({ colid, assessmentid: assessment._id }).lean();
    const coMap = new Map();
    const questionMap = new Map();

    (assessment.sections || []).forEach((section) => {
      (section.questions || []).forEach((question) => {
        const conumber = text(question.conumber);
        const co = text(question.co);
        if (!conumber && !co) return;
        const coKey = conumber || co;
        const questionid = String(question._id);
        const meta = {
          questionid,
          coKey,
          conumber,
          co,
          maxmarks: number(question.marks)
        };
        questionMap.set(questionid, meta);
        if (!coMap.has(coKey)) {
          coMap.set(coKey, {
            conumber,
            co,
            totalstudents: 0,
            studentsabove: 0,
            studentpercentages: []
          });
        }
      });
    });

    attempts.forEach((attempt) => {
      const studentCo = new Map();
      (attempt.answers || []).forEach((answer) => {
        const questionMeta = questionMap.get(text(answer.questionid));
        const conumber = questionMeta?.conumber || text(answer.conumber);
        const co = questionMeta?.co || text(answer.co);
        const coKey = questionMeta?.coKey || conumber || co;
        if (!coKey || (!co && !conumber)) return;
        const existing = studentCo.get(coKey) || {
          conumber,
          co,
          maxmarks: 0,
          marks: 0
        };
        existing.maxmarks += questionMeta?.maxmarks || number(answer.maxmarks);
        existing.marks += number(answer.marks);
        if (!existing.conumber) existing.conumber = conumber;
        if (!existing.co) existing.co = co;
        studentCo.set(coKey, existing);
      });

      studentCo.forEach((studentScore, coKey) => {
        if (!studentScore.maxmarks) return;
        const aggregate = coMap.get(coKey) || {
          conumber: studentScore.conumber,
          co: studentScore.co,
          totalstudents: 0,
          studentsabove: 0,
          studentpercentages: []
        };
        const percentage = (studentScore.marks / studentScore.maxmarks) * 100;
        aggregate.totalstudents += 1;
        if (percentage >= threshold) aggregate.studentsabove += 1;
        aggregate.studentpercentages.push({
          regno: attempt.regno,
          student: attempt.student,
          percentage: Number(percentage.toFixed(2))
        });
        if (!aggregate.conumber) aggregate.conumber = studentScore.conumber;
        if (!aggregate.co) aggregate.co = studentScore.co;
        coMap.set(coKey, aggregate);
      });
    });

    const rows = Array.from(coMap.values()).map((item) => {
      const attainmentpercentage = item.totalstudents ? (item.studentsabove / item.totalstudents) * 100 : 0;
      return {
        assessmentid: assessment._id,
        assessmenttitle: assessment.title,
        academicyear: assessment.academicyear,
        regulation: assessment.regulation,
        program: assessment.program,
        programcode: assessment.programcode,
        course: assessment.course,
        coursecode: assessment.coursecode,
        semester: assessment.semester,
        conumber: item.conumber,
        co: item.co,
        threshold,
        attainmentpercentage: Number(attainmentpercentage.toFixed(2)),
        studentsabove: item.studentsabove,
        totalstudents: item.totalstudents,
        level: levelForPercentage(attainmentpercentage, levelcriteria),
        levelcriteria,
        facultyname: text(req.body.facultyname),
        facultyemail: text(req.body.facultyemail),
        colid,
        user: text(req.body.user)
      };
    });

    await CoAttainment.deleteMany({ colid, assessmentid: assessment._id });
    const data = rows.length ? await CoAttainment.insertMany(rows) : [];
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCoAttainment = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (!filter.colid) return res.status(400).json({ success: false, message: "colid is required" });
    ["assessmentid", "academicyear", "programcode", "coursecode", "semester", "facultyemail"].forEach((field) => {
      if (text(req.query[field])) filter[field] = text(req.query[field]);
    });
    const data = await CoAttainment.find(filter).sort({ conumber: 1, co: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
