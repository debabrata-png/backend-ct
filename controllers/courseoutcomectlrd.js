const CourseOutcome = require("../Models/courseoutcomeds");
const Syllabus = require("../Models/syllabusds");
const AiConfiguration = require("../Models/aiconfigurationds");

const text = (value) => String(value || "").trim();
const escRegex = (value) => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const toArray = (value) => {
  if (Array.isArray(value)) return value.map(text).filter(Boolean);
  return String(value || "")
    .split(/[,;|]/)
    .map(text)
    .filter(Boolean);
};
const uniq = (items) => [...new Set(items.map(text).filter(Boolean))];

const fields = ["academicyear", "regulation", "program", "programcode", "type", "subject", "semester", "course", "coursecode"];

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
  modules: toArray(input.modules || input.module),
  topics: toArray(input.topics || input.topic || input.syllabus),
  bloomlevels: toArray(input.bloomlevels || input.bloomLevels || input.bloom),
  conumber: text(input.conumber || input.coNumber),
  co: text(input.co || input.courseoutcome || input.courseOutcome),
  status: text(input.status) || "Active",
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
  if (!payload.modules.length) return "At least one module is required";
  if (!payload.topics.length) return "At least one topic is required";
  if (!payload.bloomlevels.length) return "At least one Bloom taxonomy level is required";
  if (!payload.co) return "CO is required";
  return "";
};

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  fields.forEach((field) => {
    if (text(source[field])) query[field] = text(source[field]);
  });
  if (text(source.status)) query.status = text(source.status);
  if (text(source.module)) query.modules = text(source.module);
  if (text(source.topic)) query.topics = text(source.topic);
  if (text(source.bloomlevel)) query.bloomlevels = text(source.bloomlevel);
  return query;
};

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
        { role: "system", content: "You create concise, measurable course outcomes for higher education curricula. Return valid JSON only." },
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
      max_tokens: 3000,
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

const parseJsonList = (content) => {
  const clean = text(content).replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  try {
    const parsed = JSON.parse(clean);
    return Array.isArray(parsed) ? parsed : parsed.outcomes || parsed.courseOutcomes || [];
  } catch (error) {
    const match = clean.match(/\[[\s\S]*\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      return Array.isArray(parsed) ? parsed : [];
    }
    return clean.split(/\n+/).map((line, index) => ({ conumber: `CO${index + 1}`, co: line.replace(/^[-*\d.)\s]+/, "") })).filter((item) => text(item.co));
  }
};

const buildPrompt = ({ body, syllabusItems }) => {
  const syllabusText = syllabusItems.map((item, index) => `${index + 1}. Module: ${item.module}\nTopic/Syllabus: ${item.syllabus}`).join("\n\n");
  return `Generate ${Number(body.count) || 3} course outcomes as valid JSON.

Course context:
Academic year: ${body.academicyear}
Regulation: ${body.regulation}
Program: ${body.program} (${body.programcode})
Type: ${body.type}
Subject: ${body.subject}
Semester: ${body.semester}
Course: ${body.course} (${body.coursecode})
Selected modules: ${toArray(body.modules).join(", ")}
Selected topics: ${toArray(body.topics).join(", ")}
Bloom taxonomy levels to use: ${toArray(body.bloomlevels).join(", ")}

Syllabus:
${syllabusText}

Return only a JSON array. Each item must be:
{ "conumber": "CO1", "co": "After completing this course, students will be able to ..." }

Use measurable verbs aligned with the selected Bloom taxonomy levels. Keep each CO one sentence.`;
};

exports.getCourseOutcomes = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await CourseOutcome.find(query).sort({ academicyear: 1, regulation: 1, program: 1, semester: 1, course: 1, conumber: 1 }).lean();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCourseOutcome = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await CourseOutcome.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCourseOutcome = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = await CourseOutcome.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCourseOutcome = async (req, res) => {
  try {
    const data = await CourseOutcome.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkCreateCourseOutcomes = async (req, res) => {
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
    if (valid.length) await CourseOutcome.insertMany(valid, { ordered: false });
    res.json({ success: true, inserted: valid.length, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateCourseOutcomes = async (req, res) => {
  try {
    const body = req.body || {};
    const colid = toNumber(body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!text(body.provider)) return res.status(400).json({ success: false, message: "AI provider is required" });

    const basePayload = cleanPayload({ ...body, co: "placeholder", colid });
    const validation = validatePayload(basePayload);
    if (validation && validation !== "CO is required") return res.status(400).json({ success: false, message: validation });

    const syllabusQuery = { colid };
    fields.forEach((field) => {
      if (text(body[field])) syllabusQuery[field] = text(body[field]);
    });
    const modules = toArray(body.modules);
    const topics = toArray(body.topics);
    if (modules.length) syllabusQuery.module = { $in: modules };
    const syllabusItems = await Syllabus.find(syllabusQuery).sort({ module: 1 }).lean();
    const selectedSyllabus = topics.length
      ? syllabusItems.filter((item) => topics.includes(text(item.syllabus)))
      : syllabusItems;

    const aiConfig = await getAiConfig(colid, body.provider);
    if (!aiConfig?.apikey) return res.status(400).json({ success: false, message: `Active ${body.provider} AI configuration was not found` });

    const raw = await callAi(body.provider, aiConfig.apikey, buildPrompt({ body, syllabusItems: selectedSyllabus }));
    const generated = parseJsonList(raw).slice(0, Number(body.count) || 3);
    if (!generated.length) return res.status(400).json({ success: false, message: "AI did not return any course outcomes" });

    const docs = generated.map((item, index) => ({
      ...basePayload,
      co: text(item.co || item.outcome || item.courseOutcome),
      conumber: text(item.conumber || item.coNumber) || `CO${index + 1}`,
      modules: modules.length ? modules : uniq(selectedSyllabus.map((item) => item.module)),
      topics: topics.length ? topics : uniq(selectedSyllabus.map((item) => item.syllabus)),
      status: text(body.status) || "Active"
    })).filter((item) => item.co);

    const data = docs.length ? await CourseOutcome.insertMany(docs, { ordered: false }) : [];
    res.json({ success: true, inserted: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
