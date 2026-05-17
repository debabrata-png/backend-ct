const User = require("../Models/user");
const WorkloadAssignment = require("../Models/workloadassignmentds");
const Syllabus = require("../Models/syllabusds");
const AiConfiguration = require("../Models/aiconfigurationds");
const Assessment = require("../Models/neplmsdescriptiveassessmentds");
const Attempt = require("../Models/neplmsdescriptiveattemptds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const escRegex = (value) => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stripCodeFence = (content) => text(content).replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
const listFromValue = (value) => Array.isArray(value) ? value.map(text).filter(Boolean) : String(value || "").split(",").map(text).filter(Boolean);

const getAiConfig = async (colid, provider) => {
  const providerRegex = new RegExp(`^${escRegex(provider)}$`, "i");
  return AiConfiguration.findOne({ colid: Number(colid), type: providerRegex, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
    || AiConfiguration.findOne({ colid: Number(colid), type: providerRegex, active: /^yes$/i }).sort({ _id: -1 }).lean();
};

const callChatGpt = async (apikey, prompt) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apikey}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Return valid JSON only for academic descriptive assessments and evaluation." },
        { role: "user", content: prompt }
      ],
      temperature: 0.35
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "ChatGPT API request failed");
  return data.choices?.[0]?.message?.content || "";
};

const callGemini = async (apikey, prompt) => {
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
  let lastError = "";
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apikey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.35, responseMimeType: "application/json" }
      })
    });
    const data = await response.json();
    if (response.ok) return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
    lastError = data.error?.message || `Gemini API request failed for ${model}`;
  }
  throw new Error(lastError || "Gemini API request failed");
};

const callClaude = async (apikey, prompt) => {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apikey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-haiku-20240307",
      max_tokens: 5000,
      temperature: 0.35,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Claude API request failed");
  return data.content?.map((part) => part.text || "").join("\n") || "";
};

const callAi = async (provider, apikey, prompt) => {
  const normalized = text(provider).toLowerCase();
  if (normalized === "gemini") return callGemini(apikey, prompt);
  if (normalized === "claude") return callClaude(apikey, prompt);
  return callChatGpt(apikey, prompt);
};

const parseJson = (content) => {
  const clean = stripCodeFence(content);
  const startObj = clean.indexOf("{");
  const startArr = clean.indexOf("[");
  const start = startArr >= 0 && (startObj < 0 || startArr < startObj) ? startArr : startObj;
  const end = startArr >= 0 && start === startArr ? clean.lastIndexOf("]") : clean.lastIndexOf("}");
  return JSON.parse(start >= 0 && end > start ? clean.slice(start, end + 1) : clean);
};

const coursePayload = (body = {}) => ({
  academicyear: text(body.academicyear),
  regulation: text(body.regulation),
  program: text(body.program),
  programcode: text(body.programcode),
  type: text(body.type),
  major: text(body.major || body.subject),
  subject: text(body.subject || body.major),
  semester: text(body.semester),
  course: text(body.course),
  coursecode: text(body.coursecode),
  section: text(body.section),
  faculty: text(body.faculty || body.facultyname),
  facultyemail: text(body.facultyemail),
  colid: Number(body.colid),
  user: text(body.user)
});

const assessmentPayload = (body = {}) => ({
  ...coursePayload(body),
  title: text(body.title),
  instructions: text(body.instructions),
  module: listFromValue(body.module).join(", "),
  topic: listFromValue(body.topic).join(", "),
  startdatetime: body.startdatetime ? new Date(body.startdatetime) : null,
  enddatetime: body.enddatetime ? new Date(body.enddatetime) : null,
  status: text(body.status) || "Active"
});

const assessmentFilter = (source = {}) => {
  const filter = { colid: Number(source.colid) };
  ["academicyear", "regulation", "program", "programcode", "type", "major", "subject", "semester", "course", "coursecode", "section", "facultyemail", "status"].forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  return filter;
};

const validateAssessment = (payload) => {
  if (!payload.colid) return "colid is required";
  if (!payload.coursecode) return "Course is required";
  if (!payload.facultyemail) return "Faculty email is required";
  if (!payload.title) return "Assessment title is required";
  if (!payload.startdatetime || Number.isNaN(payload.startdatetime.getTime())) return "Start date and time is required";
  if (!payload.enddatetime || Number.isNaN(payload.enddatetime.getTime())) return "End date and time is required";
  if (payload.enddatetime <= payload.startdatetime) return "End date should be after start date";
  return "";
};

const getStudent = async (source = {}) => {
  const colid = Number(source.colid);
  const regno = text(source.regno);
  if (!colid) throw new Error("colid is required");
  if (!regno) throw new Error("regno is required");
  const student = await User.findOne({ colid, regno }).lean();
  if (!student) throw new Error("Student not found");
  return student;
};

const studentMajor = (student) => text(student.Major || student.major || student.majorname || student.department);

const verifyAssessmentForStudent = async (assessment, student) => {
  const query = {
    colid: assessment.colid,
    status: "Active",
    academicyear: assessment.academicyear,
    programcode: assessment.programcode,
    semester: assessment.semester,
    coursecode: assessment.coursecode
  };
  const major = studentMajor(student);
  if (major) query.subject = { $regex: `^${escRegex(major)}$`, $options: "i" };
  const course = await WorkloadAssignment.findOne(query).lean();
  if (!course) throw new Error("Assessment is not available for this student");
};

const totalAssessmentMarks = (assessment) => (assessment.sections || []).reduce((sum, section) => (
  sum + (section.questions || []).reduce((sectionSum, question) => sectionSum + number(question.marks), 0)
), 0);

exports.getAssessments = async (req, res) => {
  try {
    const filter = assessmentFilter(req.query);
    if (!filter.colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await Assessment.find(filter).sort({ startdatetime: -1, title: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAssessment = async (req, res) => {
  try {
    const payload = assessmentPayload(req.body);
    const error = validateAssessment(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await Assessment.create({ ...payload, sections: [] });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAssessment = async (req, res) => {
  try {
    const payload = assessmentPayload(req.body);
    const error = validateAssessment(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await Assessment.findOneAndUpdate({ _id: req.body.id, colid: Number(req.body.colid) }, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Assessment not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAssessment = async (req, res) => {
  try {
    await Assessment.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    await Attempt.deleteMany({ assessmentid: req.body.id, colid: Number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addSection = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ _id: req.body.assessmentid, colid: Number(req.body.colid) });
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });
    const title = text(req.body.title);
    if (!title) return res.status(400).json({ success: false, message: "Section title is required" });
    assessment.sections.push({ title, questions: [] });
    const data = await assessment.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ _id: req.body.assessmentid, colid: Number(req.body.colid) });
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });
    assessment.sections.pull({ _id: req.body.sectionid });
    const data = await assessment.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ _id: req.body.assessmentid, colid: Number(req.body.colid) });
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });
    const section = assessment.sections.id(req.body.sectionid);
    if (!section) return res.status(404).json({ success: false, message: "Section not found" });
    const question = text(req.body.question);
    if (!question) return res.status(400).json({ success: false, message: "Question is required" });
    section.questions.push({ question, marks: number(req.body.marks) || 1 });
    const data = await assessment.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ _id: req.body.assessmentid, colid: Number(req.body.colid) });
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });
    const section = assessment.sections.id(req.body.sectionid);
    if (!section) return res.status(404).json({ success: false, message: "Section not found" });
    section.questions.pull({ _id: req.body.questionid });
    const data = await assessment.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateQuestions = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const assessment = await Assessment.findOne({ _id: req.body.assessmentid, colid });
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });
    const section = assessment.sections.id(req.body.sectionid);
    if (!section) return res.status(404).json({ success: false, message: "Section not found" });
    const aiConfig = await getAiConfig(colid, req.body.provider);
    if (!aiConfig?.apikey) return res.status(400).json({ success: false, message: `Active ${req.body.provider} AI configuration was not found` });
    const syllabus = await Syllabus.find({
      colid,
      academicyear: assessment.academicyear,
      regulation: assessment.regulation,
      programcode: assessment.programcode,
      type: assessment.type,
      subject: assessment.major || assessment.subject,
      semester: assessment.semester,
      coursecode: assessment.coursecode
    }).lean();
    const prompt = `Create ${number(req.body.questioncount) || 5} descriptive assessment questions in ${text(req.body.language) || "English"}.
Difficulty: ${text(req.body.difficulty) || "Medium"}
Course: ${assessment.course} (${assessment.coursecode})
Modules: ${assessment.module}
Topics: ${assessment.topic}
Syllabus: ${syllabus.map((item) => `${item.module}: ${item.syllabus}`).join("\n")}
Return only JSON array like [{"question":"...","marks":5}]. Questions must be answerable in paragraphs and suitable for manual evaluation.`;
    const raw = await callAi(req.body.provider, aiConfig.apikey, prompt);
    const parsed = parseJson(raw);
    const items = (Array.isArray(parsed) ? parsed : parsed.questions || []).map((item) => ({
      question: text(item.question),
      marks: number(item.marks || item.score) || 1
    })).filter((item) => item.question);
    items.forEach((item) => section.questions.push(item));
    const data = await assessment.save();
    res.json({ success: true, inserted: items.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAttempts = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    ["assessmentid", "coursecode", "regno", "academicyear", "semester", "facultyemail", "status"].forEach((field) => {
      if (text(req.query[field])) filter[field] = text(req.query[field]);
    });
    if (!filter.colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await Attempt.find(filter).sort({ submitteddate: -1, student: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getActiveStudentAssessments = async (req, res) => {
  try {
    const student = await getStudent(req.query);
    const now = new Date();
    const course = {
      academicyear: text(req.query.academicyear),
      programcode: text(req.query.programcode),
      semester: text(req.query.semester),
      coursecode: text(req.query.coursecode),
      major: text(req.query.major) || studentMajor(student)
    };
    const assessments = await Assessment.find({
      colid: Number(req.query.colid),
      status: "Active",
      academicyear: course.academicyear,
      programcode: course.programcode,
      semester: course.semester,
      coursecode: course.coursecode,
      startdatetime: { $lte: now },
      enddatetime: { $gte: now }
    }).sort({ enddatetime: 1 }).lean();
    const attempts = await Attempt.find({ colid: Number(req.query.colid), regno: student.regno, coursecode: course.coursecode }).lean();
    const attemptedIds = new Set(attempts.map((attempt) => String(attempt.assessmentid)));
    res.json({ success: true, data: assessments.filter((assessment) => !attemptedIds.has(String(assessment._id))), attempts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitAssessment = async (req, res) => {
  try {
    const student = await getStudent(req.body);
    const assessment = await Assessment.findOne({ _id: req.body.assessmentid, colid: Number(req.body.colid), status: "Active" }).lean();
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });
    await verifyAssessmentForStudent(assessment, student);
    const now = new Date();
    if (now < new Date(assessment.startdatetime) || now > new Date(assessment.enddatetime)) {
      return res.status(400).json({ success: false, message: "Assessment is not active now" });
    }
    const answerMap = new Map((req.body.answers || []).map((answer) => [text(answer.questionid), text(answer.answer)]));
    const answers = [];
    (assessment.sections || []).forEach((section) => {
      (section.questions || []).forEach((question) => {
        answers.push({
          sectionid: String(section._id),
          sectiontitle: section.title,
          questionid: String(question._id),
          question: question.question,
          answer: answerMap.get(String(question._id)) || "",
          maxmarks: number(question.marks),
          marks: 0
        });
      });
    });
    const payload = {
      assessmentid: assessment._id,
      assessmenttitle: assessment.title,
      academicyear: assessment.academicyear,
      regulation: assessment.regulation,
      program: assessment.program,
      programcode: assessment.programcode,
      type: assessment.type,
      major: assessment.major || assessment.subject,
      subject: assessment.subject || assessment.major,
      semester: assessment.semester,
      course: assessment.course,
      coursecode: assessment.coursecode,
      section: assessment.section,
      faculty: assessment.faculty,
      facultyemail: assessment.facultyemail,
      student: text(student.name || student.student),
      regno: text(student.regno),
      email: text(student.email),
      phone: text(student.phone),
      answers,
      totalmarks: totalAssessmentMarks(assessment),
      obtainedmarks: 0,
      submitteddate: new Date(),
      status: "Submitted",
      colid: Number(req.body.colid),
      user: text(req.body.user)
    };
    const data = await Attempt.findOneAndUpdate(
      { colid: payload.colid, assessmentid: assessment._id, regno: student.regno },
      payload,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMarks = async (req, res) => {
  try {
    const attempt = await Attempt.findOne({ _id: req.body.attemptid, colid: Number(req.body.colid) });
    if (!attempt) return res.status(404).json({ success: false, message: "Attempt not found" });
    const answer = attempt.answers.find((item) => text(item.questionid) === text(req.body.questionid));
    if (!answer) return res.status(404).json({ success: false, message: "Answer not found" });
    answer.marks = Math.min(number(req.body.marks), number(answer.maxmarks));
    answer.facultycomments = text(req.body.facultycomments);
    attempt.obtainedmarks = attempt.answers.reduce((sum, item) => sum + number(item.marks), 0);
    attempt.status = "Evaluated";
    attempt.evaluateddate = new Date();
    const data = await attempt.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.evaluateAttemptWithAi = async (req, res) => {
  try {
    const attempt = await Attempt.findOne({ _id: req.body.attemptid, colid: Number(req.body.colid) });
    if (!attempt) return res.status(404).json({ success: false, message: "Attempt not found" });
    const aiConfig = await getAiConfig(req.body.colid, req.body.provider);
    if (!aiConfig?.apikey) return res.status(400).json({ success: false, message: `Active ${req.body.provider} AI configuration was not found` });
    for (const answer of attempt.answers) {
      const prompt = `Evaluate this student answer in ${text(req.body.language) || "English"}.
Question: ${answer.question}
Maximum marks: ${answer.maxmarks}
Student answer: ${answer.answer}
Return only JSON: {"marks": number, "feedback": "brief feedback"}. Award marks between 0 and maximum marks.`;
      const raw = await callAi(req.body.provider, aiConfig.apikey, prompt);
      const parsed = parseJson(raw);
      answer.aiMarks = Math.min(number(parsed.marks), number(answer.maxmarks));
      answer.marks = answer.aiMarks;
      answer.aiFeedback = text(parsed.feedback);
      answer.facultycomments = text(parsed.feedback);
    }
    attempt.obtainedmarks = attempt.answers.reduce((sum, item) => sum + number(item.marks), 0);
    attempt.status = "Evaluated";
    attempt.evaluateddate = new Date();
    const data = await attempt.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.totalAssessmentMarks = totalAssessmentMarks;
