const BosCycle = require("../Models/boscycleds");
const BosApprovalMatrix = require("../Models/bosapprovalmatrixds");
const BosAssignment = require("../Models/bosassignmentds");
const BosCourseReview = require("../Models/boscoursereviewds");
const BosProgramReview = require("../Models/bosprogramreviewds");
const BosApprovalLog = require("../Models/bosapprovallogds");
const RegulationCourseMap = require("../Models/regulationcoursemapds");
const Syllabus = require("../Models/syllabusds");
const User = require("../Models/user");
const AiConfiguration = require("../Models/aiconfigurationds");
const Institution = require("../Models/insdetails");

const text = (value) => String(value || "").trim();
const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const uniq = (items) => [...new Set(items.map(text).filter(Boolean))].sort((a, b) => a.localeCompare(b));
const clampPercent = (value, fallback = 0) => {
  const parsed = toNumber(value);
  const safe = parsed === undefined ? fallback : parsed;
  return Math.max(0, Math.min(100, Math.round(safe)));
};

const buildQuery = (source = {}, fields = []) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  fields.forEach((field) => {
    if (text(source[field])) query[field] = text(source[field]);
  });
  return query;
};

const parseGeminiJson = (value) => {
  const raw = text(value);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (error) {
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenced?.[1]) {
      try {
        return JSON.parse(fenced[1].trim());
      } catch (innerError) {
        return {};
      }
    }
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1));
      } catch (innerError) {
        return {};
      }
    }
    return {};
  }
};

const readGeminiText = (payload = {}) => (
  payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim()
  || payload.text
  || ""
);

const getDefaultGeminiConfig = async (colid) => (
  await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
  || await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i }).sort({ _id: -1 }).lean()
);

const callGeminiJson = async (colid, prompt) => {
  const config = await getDefaultGeminiConfig(colid);
  if (!config?.apikey) throw new Error("Default active Gemini AI configuration is missing");
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
  let lastError = "";
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(config.apikey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.25, responseMimeType: "application/json" }
      })
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok) return parseGeminiJson(readGeminiText(data));
    lastError = data.error?.message || `Gemini API request failed for ${model}`;
  }
  throw new Error(lastError || "Gemini API request failed");
};

const cleanCycle = (input = {}) => ({
  academicyear: text(input.academicyear),
  title: text(input.title),
  description: text(input.description),
  status: text(input.status) || "Active",
  colid: toNumber(input.colid),
  user: text(input.user)
});

const cleanMatrix = (input = {}) => ({
  cycleid: text(input.cycleid) || undefined,
  cycletitle: text(input.cycletitle),
  academicyear: text(input.academicyear),
  regulation: text(input.regulation),
  program: text(input.program),
  programcode: text(input.programcode),
  level: toNumber(input.level) || 1,
  approverrole: text(input.approverrole),
  approvername: text(input.approvername),
  approveremail: text(input.approveremail),
  status: text(input.status) || "Active",
  colid: toNumber(input.colid),
  user: text(input.user)
});

const cleanAssignment = (input = {}) => ({
  academicyear: text(input.academicyear),
  regulation: text(input.regulation),
  program: text(input.program),
  programcode: text(input.programcode),
  type: text(input.type),
  subject: text(input.subject),
  semester: text(input.semester),
  course: text(input.course),
  coursecode: text(input.coursecode),
  facultyname: text(input.facultyname),
  facultyemail: text(input.facultyemail),
  status: text(input.status) || "Assigned",
  colid: toNumber(input.colid),
  user: text(input.user)
});

const getSyllabusText = async (query) => {
  const rows = await Syllabus.find(query).sort({ module: 1 }).lean();
  return {
    rows,
    text: rows.map((row) => `Module: ${row.module || ""}\nSyllabus: ${row.syllabus || ""}`).join("\n\n")
  };
};

exports.getBosOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const courseQuery = buildQuery(req.query, ["academicyear", "regulation", "program", "programcode", "type", "subject", "semester"]);
    const [cycles, courseMaps, users] = await Promise.all([
      BosCycle.find({ colid }).sort({ academicyear: 1, title: 1 }).lean(),
      RegulationCourseMap.find(courseQuery).sort({ academicyear: 1, regulation: 1, program: 1, semester: 1, course: 1 }).lean(),
      User.find({ colid, role: { $ne: "Student" } }).select("name email role department").sort({ name: 1 }).lean()
    ]);
    const programMap = new Map();
    courseMaps.forEach((item) => {
      if (item.programcode) programMap.set(item.programcode, { program: item.program || "", programcode: item.programcode || "" });
    });
    const courseMap = new Map();
    courseMaps.forEach((item) => {
      if (item.coursecode) courseMap.set(`${item.coursecode}-${item.semester}`, {
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
      });
    });
    res.json({
      success: true,
      cycles,
      academicyears: uniq(courseMaps.map((item) => item.academicyear).concat(cycles.map((item) => item.academicyear))),
      regulations: uniq(courseMaps.map((item) => item.regulation)),
      programs: [...programMap.values()].sort((a, b) => a.programcode.localeCompare(b.programcode)),
      types: uniq(courseMaps.map((item) => item.type)),
      subjects: uniq(courseMaps.map((item) => item.subject)),
      semesters: uniq(courseMaps.map((item) => item.semester)),
      courses: [...courseMap.values()].sort((a, b) => `${a.semester}${a.coursecode}`.localeCompare(`${b.semester}${b.coursecode}`)),
      users: users.map((item) => ({ name: item.name || "", email: item.email || "", role: item.role || "", department: item.department || "" }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCycle = async (req, res) => {
  try {
    const payload = cleanCycle(req.body);
    if (payload.colid === undefined || !payload.academicyear || !payload.title) return res.status(400).json({ success: false, message: "Academic year and title are required" });
    const data = await BosCycle.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCycles = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["academicyear", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await BosCycle.find(query).sort({ academicyear: 1, title: 1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCycle = async (req, res) => {
  try {
    const payload = cleanCycle(req.body);
    const data = await BosCycle.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Cycle not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCycle = async (req, res) => {
  try {
    const data = await BosCycle.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Cycle not found" });
    res.json({ success: true, message: "Cycle deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveMatrix = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [req.body];
    const saved = [];
    for (const item of items) {
      const payload = cleanMatrix({ ...item, colid: req.body.colid || item.colid, user: req.body.user || item.user });
      if (payload.colid === undefined || !payload.academicyear || !payload.regulation || !payload.programcode || !payload.approveremail) {
        return res.status(400).json({ success: false, message: "Academic year, regulation, program and approver email are required" });
      }
      const doc = item.id
        ? await BosApprovalMatrix.findByIdAndUpdate(item.id, payload, { new: true, runValidators: true })
        : await BosApprovalMatrix.create(payload);
      saved.push(doc);
    }
    res.json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMatrix = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["cycleid", "academicyear", "regulation", "programcode", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await BosApprovalMatrix.find(query).sort({ academicyear: 1, programcode: 1, level: 1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMatrix = async (req, res) => {
  try {
    const data = await BosApprovalMatrix.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Matrix row not found" });
    res.json({ success: true, message: "Matrix row deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveAssignments = async (req, res) => {
  try {
    const base = cleanAssignment(req.body);
    const courses = Array.isArray(req.body.courses) ? req.body.courses : [];
    if (base.colid === undefined || !base.academicyear || !base.regulation || !base.programcode || !base.semester || !base.facultyemail || !courses.length) {
      return res.status(400).json({ success: false, message: "Academic year, regulation, program, semester, faculty and courses are required" });
    }
    const payloads = courses.map((course) => cleanAssignment({ ...base, ...course, colid: base.colid, user: base.user }));
    const data = await BosAssignment.insertMany(payloads, { ordered: false });
    res.status(201).json({ success: true, inserted: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["academicyear", "regulation", "programcode", "semester", "coursecode", "facultyemail", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await BosAssignment.find(query).sort({ academicyear: 1, programcode: 1, semester: 1, course: 1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const data = await BosAssignment.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Assignment not found" });
    res.json({ success: true, message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.suggestCourseReview = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const assignment = await BosAssignment.findOne({ _id: req.body.assignmentid, colid }).lean();
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });
    const syllabus = await getSyllabusText({
      colid,
      academicyear: assignment.academicyear,
      regulation: assignment.regulation,
      programcode: assignment.programcode,
      semester: assignment.semester,
      coursecode: assignment.coursecode
    });
    if (!syllabus.rows.length) return res.status(404).json({ success: false, message: "Existing syllabus not found for this course" });
    const prompt = `
You are assisting a Board of Studies course review.
Return only JSON:
{
  "newsyllabus": "module-wise improved syllabus proposal",
  "assessmentscheme": "assessment scheme with rubrics and breakup totaling 100 percent",
  "summary": "brief rationale",
  "inclusions": ["new inclusion"],
  "deletions": ["suggested deletion"]
}

Course: ${assignment.course} (${assignment.coursecode})
Program: ${assignment.program} (${assignment.programcode})
Subject: ${assignment.subject}
Semester: ${assignment.semester}
Existing syllabus:
${syllabus.text}
`;
    const result = await callGeminiJson(colid, prompt);
    res.json({ success: true, data: result, oldsyllabus: syllabus.text, syllabusRows: syllabus.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.reviewCourseChange = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const oldsyllabus = text(req.body.oldsyllabus);
    const newsyllabus = text(req.body.newsyllabus);
    if (colid === undefined || !oldsyllabus || !newsyllabus) return res.status(400).json({ success: false, message: "Old and new syllabus are required" });
    const prompt = `
Compare the existing syllabus and proposed syllabus. Return only JSON:
{
  "matchPercent": number,
  "newPercent": number,
  "review": "short review",
  "matchingAreas": ["area"],
  "newAreas": ["area"],
  "recommendation": "short recommendation"
}
Existing syllabus:
${oldsyllabus}

Proposed syllabus:
${newsyllabus}
`;
    const result = await callGeminiJson(colid, prompt);
    res.json({
      success: true,
      data: {
        ...result,
        matchPercent: clampPercent(result.matchPercent),
        newPercent: clampPercent(result.newPercent, 100 - clampPercent(result.matchPercent))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveCourseReview = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const cycle = await BosCycle.findOne({ _id: req.body.cycleid, colid }).lean();
    if (!cycle) return res.status(404).json({ success: false, message: "BoS cycle not found" });
    const assignment = await BosAssignment.findOne({ _id: req.body.assignmentid, colid }).lean();
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });
    const matrix = await BosApprovalMatrix.find({ colid, cycleid: cycle._id, academicyear: assignment.academicyear, regulation: assignment.regulation, programcode: assignment.programcode, status: "Active" }).sort({ level: 1 }).lean();
    const status = matrix.length ? "Pending Level 1" : "Approved";
    const payload = {
      cycleid: cycle._id,
      cycletitle: cycle.title,
      academicyear: assignment.academicyear,
      regulation: assignment.regulation,
      program: assignment.program,
      programcode: assignment.programcode,
      type: assignment.type,
      subject: assignment.subject,
      semester: assignment.semester,
      course: assignment.course,
      coursecode: assignment.coursecode,
      oldsyllabus: text(req.body.oldsyllabus),
      newsyllabus: text(req.body.newsyllabus),
      assessmentscheme: text(req.body.assessmentscheme),
      geminisuggestion: text(req.body.geminisuggestion),
      geminireview: text(req.body.geminireview),
      matchpercent: clampPercent(req.body.matchpercent),
      newpercent: clampPercent(req.body.newpercent),
      facultymessage: text(req.body.facultymessage),
      facultyname: text(req.body.facultyname) || assignment.facultyname,
      facultyemail: text(req.body.facultyemail) || assignment.facultyemail,
      approvallevel: matrix.length ? 1 : 0,
      status,
      colid,
      user: text(req.body.user)
    };
    const data = req.body.id
      ? await BosCourseReview.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true })
      : await BosCourseReview.create(payload);
    await BosApprovalLog.create({
      reviewid: data._id,
      cycleid: cycle._id,
      level: payload.approvallevel,
      action: "Apply",
      comments: payload.facultymessage,
      username: payload.facultyname,
      useremail: payload.facultyemail,
      colid
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseReviews = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["cycleid", "academicyear", "regulation", "programcode", "semester", "coursecode", "facultyemail", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await BosCourseReview.find(query).sort({ academicyear: 1, programcode: 1, semester: 1, course: 1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseApprovalQueue = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const approveremail = text(req.query.approveremail);
    if (colid === undefined || !approveremail) return res.status(400).json({ success: false, message: "colid and approver email are required" });
    const matrices = await BosApprovalMatrix.find({ colid, approveremail, status: "Active" }).lean();
    const clauses = matrices.map((item) => ({
      cycleid: item.cycleid,
      academicyear: item.academicyear,
      regulation: item.regulation,
      programcode: item.programcode,
      approvallevel: item.level,
      status: `Pending Level ${item.level}`
    }));
    if (!clauses.length) return res.json({ success: true, data: [] });
    const data = await BosCourseReview.find({ colid, $or: clauses }).sort({ createdAt: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveCourseReview = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const review = await BosCourseReview.findOne({ _id: req.body.id, colid });
    if (!review) return res.status(404).json({ success: false, message: "Course review not found" });
    const action = text(req.body.action);
    if (!["Approve", "Reject"].includes(action)) return res.status(400).json({ success: false, message: "Action should be Approve or Reject" });
    const currentLevel = review.approvallevel;
    if (action === "Reject") {
      review.status = "Rejected";
    } else {
      const next = await BosApprovalMatrix.findOne({
        colid,
        cycleid: review.cycleid,
        academicyear: review.academicyear,
        regulation: review.regulation,
        programcode: review.programcode,
        level: { $gt: review.approvallevel },
        status: "Active"
      }).sort({ level: 1 }).lean();
      if (next) {
        review.approvallevel = next.level;
        review.status = `Pending Level ${next.level}`;
      } else {
        review.approvallevel = 0;
        review.status = "Approved";
      }
    }
    await review.save();
    await BosApprovalLog.create({
      reviewid: review._id,
      cycleid: review.cycleid,
      level: currentLevel,
      action,
      comments: text(req.body.comments),
      username: text(req.body.username),
      useremail: text(req.body.useremail),
      colid
    });
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateProgramReview = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const query = buildQuery(req.body, ["academicyear", "regulation", "program", "programcode"]);
    if (colid === undefined || !query.academicyear || !query.regulation || !query.programcode) return res.status(400).json({ success: false, message: "Academic year, regulation and program are required" });
    const courses = await RegulationCourseMap.find({ colid, academicyear: query.academicyear, regulation: query.regulation, programcode: query.programcode }).sort({ semester: 1, course: 1 }).lean();
    const syllabi = await Syllabus.find({ colid, academicyear: query.academicyear, regulation: query.regulation, programcode: query.programcode }).sort({ semester: 1, course: 1, module: 1 }).lean();
    const prompt = `
Analyze this current program structure and syllabus. Suggest inclusions, deletions, and a semester-wise course structure with exactly ${toNumber(req.body.totalrequiredsubjects) || courses.length} total courses if academically feasible.
Return only JSON:
{
  "suggestedstructure": "narrative suggested program structure",
  "inclusions": "text list",
  "deletions": "text list",
  "semesterwisecourses": "semester-wise course list"
}
Current courses:
${JSON.stringify(courses.map((item) => ({ semester: item.semester, type: item.type, subject: item.subject, course: item.course, coursecode: item.coursecode })))}
Current syllabus:
${JSON.stringify(syllabi.map((item) => ({ semester: item.semester, course: item.course, module: item.module, syllabus: item.syllabus })))}
`;
    const result = await callGeminiJson(colid, prompt);
    res.json({
      success: true,
      data: {
        currentstructure: courses.map((item) => `Semester ${item.semester}: ${item.course} (${item.coursecode})`).join("\n"),
        suggestedstructure: text(result.suggestedstructure),
        inclusions: text(result.inclusions),
        deletions: text(result.deletions),
        semesterwisecourses: text(result.semesterwisecourses)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveProgramReview = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const cycle = await BosCycle.findOne({ _id: req.body.cycleid, colid }).lean();
    if (!cycle) return res.status(404).json({ success: false, message: "BoS cycle not found" });
    const payload = {
      cycleid: cycle._id,
      cycletitle: cycle.title,
      academicyear: text(req.body.academicyear),
      regulation: text(req.body.regulation),
      program: text(req.body.program),
      programcode: text(req.body.programcode),
      totalrequiredsubjects: toNumber(req.body.totalrequiredsubjects) || 0,
      currentstructure: text(req.body.currentstructure),
      suggestedstructure: text(req.body.suggestedstructure),
      inclusions: text(req.body.inclusions),
      deletions: text(req.body.deletions),
      semesterwisecourses: text(req.body.semesterwisecourses),
      status: text(req.body.status) || "Draft",
      colid,
      user: text(req.body.user)
    };
    const data = req.body.id
      ? await BosProgramReview.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true })
      : await BosProgramReview.create(payload);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProgramReviews = async (req, res) => {
  try {
    const query = buildQuery(req.query, ["cycleid", "academicyear", "regulation", "programcode", "status"]);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await BosProgramReview.find(query).sort({ academicyear: 1, programcode: 1, createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const query = buildQuery(req.query, ["cycleid", "academicyear", "programcode"]);
    const [institution, programReviews, courseReviews] = await Promise.all([
      Institution.findOne({ colid }).lean(),
      BosProgramReview.find(query).sort({ createdAt: -1 }).lean(),
      BosCourseReview.find(query).sort({ semester: 1, course: 1 }).lean()
    ]);
    res.json({ success: true, institution, programReviews, courseReviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
