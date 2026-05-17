const path = require("path");
const AWS = require("aws-sdk");
const Assessment = require("../Models/neplmsdescriptiveassessmentds");
const Attempt = require("../Models/neplmsdescriptiveattemptds");
const AiConfiguration = require("../Models/aiconfigurationds");
const Awsconfig = require("../Models/awsconfig");
const Remedial = require("../Models/neplmsremedialds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const escRegex = (value) => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const stripCodeFence = (content) => text(content).replace(/^```json\s*/i, "").replace(/^```html\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
const safeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
}[char]));
const encodeS3Key = (key) => String(key || "").split("/").map(encodeURIComponent).join("/");
const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const getAiConfig = async (colid, provider) => {
  const providerRegex = new RegExp(`^${escRegex(provider)}$`, "i");
  return AiConfiguration.findOne({ colid: Number(colid), type: providerRegex, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
    || AiConfiguration.findOne({ colid: Number(colid), type: providerRegex, active: /^yes$/i }).sort({ _id: -1 }).lean();
};

const getDefaultAwsConfig = async (colid) => Awsconfig.findOne({ colid: Number(colid), type: /^aws$/i, default: /^yes$/i }).sort({ _id: -1 }).lean();

const parseJson = (content) => {
  const clean = stripCodeFence(content);
  const startObj = clean.indexOf("{");
  const startArr = clean.indexOf("[");
  const start = startArr >= 0 && (startObj < 0 || startArr < startObj) ? startArr : startObj;
  const end = startArr >= 0 && start === startArr ? clean.lastIndexOf("]") : clean.lastIndexOf("}");
  return JSON.parse(start >= 0 && end > start ? clean.slice(start, end + 1) : clean);
};

const callChatGpt = async (apikey, prompt, json = true) => {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apikey}` },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: json ? "Return valid JSON only." : "Create helpful academic remedial learning material." },
        { role: "user", content: prompt }
      ],
      temperature: 0.35
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "ChatGPT API request failed");
  return data.choices?.[0]?.message?.content || "";
};

const callGemini = async (apikey, prompt, json = true) => {
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
  let lastError = "";
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apikey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.35, ...(json ? { responseMimeType: "application/json" } : {}) }
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

const callAi = async (provider, apikey, prompt, json = true) => {
  const normalized = text(provider).toLowerCase();
  if (normalized === "gemini") return callGemini(apikey, prompt, json);
  if (normalized === "claude") return callClaude(apikey, prompt);
  return callChatGpt(apikey, prompt, json);
};

const remedialBaseFromItem = (item, contenttype, link, extra = {}) => ({
  assessmentid: text(item.assessmentid),
  assessmenttitle: text(item.assessmenttitle),
  questionid: text(item.questionid),
  question: text(item.question),
  academicyear: text(item.academicyear),
  regulation: text(item.regulation),
  program: text(item.program),
  programcode: text(item.programcode),
  course: text(item.course),
  coursecode: text(item.coursecode),
  topic: text(extra.topic || item.topic || item.sectiontitle || item.question),
  student: text(item.student),
  regno: text(item.regno),
  contenttype,
  title: text(extra.title) || `${contenttype} - ${text(item.topic || item.question).slice(0, 80)}`,
  description: text(extra.description),
  link: text(link),
  provider: text(extra.provider),
  marks: number(item.marks),
  maxmarks: number(item.maxmarks),
  percentage: number(item.percentage),
  status: "Active",
  colid: Number(item.colid),
  user: text(item.user)
});

const identifyQuestionConcept = async (provider, apikey, item) => {
  const prompt = `Analyze the assessment question and identify the exact academic concept the student needs remedial support for.

Course: ${item.course} (${item.coursecode})
Assessment topic/section: ${item.topic}
Question: ${item.question}
Student score: ${item.marks}/${item.maxmarks}

Return only JSON:
{
  "concept": "short searchable concept phrase, not a sentence",
  "reason": "one short reason why this is the concept"
}`;
  const parsed = parseJson(await callAi(provider, apikey, prompt, true));
  return {
    concept: text(parsed.concept || parsed.topic || item.topic || item.question).slice(0, 160),
    reason: text(parsed.reason || parsed.description)
  };
};

exports.getCandidates = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const threshold = number(req.query.threshold);
    const assessmentid = text(req.query.assessmentid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!assessmentid) return res.status(400).json({ success: false, message: "assessment is required" });
    const assessment = await Assessment.findOne({ _id: assessmentid, colid }).lean();
    if (!assessment) return res.status(404).json({ success: false, message: "Assessment not found" });
    const query = { colid, assessmentid };
    if (text(req.query.facultyemail)) query.facultyemail = text(req.query.facultyemail);
    const attempts = await Attempt.find(query).sort({ student: 1 }).lean();
    const rows = [];
    attempts.forEach((attempt) => {
      (attempt.answers || []).forEach((answer) => {
        const maxmarks = number(answer.maxmarks);
        const marks = number(answer.marks);
        const percentage = maxmarks > 0 ? Number(((marks / maxmarks) * 100).toFixed(2)) : 0;
        if (percentage < threshold) {
          rows.push({
            id: `${attempt._id}-${answer.questionid}`,
            attemptid: String(attempt._id),
            assessmentid: String(attempt.assessmentid),
            assessmenttitle: attempt.assessmenttitle || assessment.title,
            questionid: answer.questionid,
            question: answer.question,
            sectiontitle: answer.sectiontitle,
            academicyear: attempt.academicyear,
            regulation: attempt.regulation,
            program: attempt.program,
            programcode: attempt.programcode,
            course: attempt.course,
            coursecode: attempt.coursecode,
            topic: answer.sectiontitle || assessment.topic || answer.question,
            student: attempt.student,
            regno: attempt.regno,
            marks,
            maxmarks,
            percentage,
            colid,
            user: text(req.query.user)
          });
        }
      });
    });
    res.json({ success: true, assessment, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateVideos = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!items.length) return res.status(400).json({ success: false, message: "Please select remedial rows" });
    const provider = text(req.body.provider) || "Gemini";
    const aiConfig = await getAiConfig(colid, provider);
    if (!aiConfig?.apikey) return res.status(400).json({ success: false, message: `Active ${provider} AI configuration was not found` });
    const created = [];
    for (const rawItem of items) {
      const item = { ...rawItem, colid, user: text(req.body.user) };
      const conceptInfo = await identifyQuestionConcept(provider, aiConfig.apikey, item);
      const content = conceptInfo.concept || `${item.course} ${item.topic}`;
      const link = `https://www.youtube.com/results?search_query=${encodeURIComponent(content)}`;
      created.push(await Remedial.create(remedialBaseFromItem(item, "Video", link, {
        title: `Video Search - ${content}`,
        topic: content,
        description: conceptInfo.reason || `AI identified concept from question: ${text(item.question).slice(0, 180)}`,
        provider
      })));
    }
    res.json({ success: true, inserted: created.length, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateMaterial = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!items.length) return res.status(400).json({ success: false, message: "Please select remedial rows" });
    const provider = text(req.body.provider) || "Gemini";
    const aiConfig = await getAiConfig(colid, provider);
    if (!aiConfig?.apikey) return res.status(400).json({ success: false, message: `Active ${provider} AI configuration was not found` });
    const awsConfig = await getDefaultAwsConfig(colid);
    if (!awsConfig?.username || !awsConfig?.password || !awsConfig?.bucket || !awsConfig?.region) {
      return res.status(400).json({ success: false, message: "Default AWS configuration is incomplete" });
    }
    const s3 = new AWS.S3({ accessKeyId: awsConfig.username, secretAccessKey: awsConfig.password, region: awsConfig.region });
    const created = [];
    for (const rawItem of items) {
      const item = { ...rawItem, colid, user: text(req.body.user) };
      const conceptInfo = await identifyQuestionConcept(provider, aiConfig.apikey, item);
      const concept = conceptInfo.concept || text(item.topic || item.question);
      const prompt = `Create compact HTML remedial course material for the academic concept identified from the question.
Course: ${item.course} (${item.coursecode})
Identified concept: ${concept}
Original question where student scored low: ${item.question}
Student score: ${item.marks}/${item.maxmarks}
Focus the content on the identified concept, not merely on the wording of the question.
Include: simple explanation, prerequisites, worked examples, practical applications, practice questions, and common mistakes. Return HTML only, no markdown fences.`;
      const generated = stripCodeFence(await callAi(provider, aiConfig.apikey, prompt, false));
      const html = /<!doctype html|<html[\s>]/i.test(generated) ? generated : `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${safeHtml(item.course)} Remedial Material</title>
  <style>
    body { font-family: Arial, sans-serif; color: #111827; line-height: 1.55; margin: 28px; }
    h1, h2, h3 { color: #12377a; }
    .meta { border: 1px solid #cbd5e1; background: #f8fafc; padding: 12px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <h1>Remedial Course Material</h1>
  <div class="meta">
    <strong>Student:</strong> ${safeHtml(item.student)} (${safeHtml(item.regno)})<br />
    <strong>Course:</strong> ${safeHtml(item.course)} (${safeHtml(item.coursecode)})<br />
    <strong>Concept:</strong> ${safeHtml(concept)}<br />
    <strong>Original Question:</strong> ${safeHtml(item.question)}
  </div>
  ${generated}
</body>
</html>`;
      const cleanCourse = path.basename(text(item.coursecode || "course")).replace(/[^\w.\-() ]/g, "_");
      const cleanRegno = path.basename(text(item.regno || "student")).replace(/[^\w.\-() ]/g, "_");
      const fileName = `${cleanRegno}-${cleanCourse}-${Date.now()}-remedial.html`;
      const key = `${colid}/nep-lms/remedial/${item.academicyear || "year"}/${item.coursecode || "course"}/${fileName}`;
      await s3.putObject({
        Bucket: awsConfig.bucket,
        Key: key,
        Body: Buffer.from(html, "utf8"),
        ContentType: "text/html; charset=utf-8"
      }).promise();
      const link = s3Url(awsConfig.bucket, awsConfig.region, key);
      created.push(await Remedial.create(remedialBaseFromItem(item, "Course Material", link, {
        title: `Remedial Material - ${concept}`,
        topic: concept,
        description: conceptInfo.reason || `Generated using ${provider} after concept identification`,
        provider
      })));
    }
    res.json({ success: true, inserted: created.length, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRemedial = async (req, res) => {
  try {
    const filter = { colid: Number(req.query.colid) };
    if (!filter.colid) return res.status(400).json({ success: false, message: "colid is required" });
    ["academicyear", "regulation", "program", "programcode", "course", "coursecode", "student", "regno", "contenttype", "topic", "status"].forEach((field) => {
      if (text(req.query[field])) filter[field] = text(req.query[field]);
    });
    const data = await Remedial.find(filter).sort({ createdAt: -1, student: 1, course: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRemedial = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const id = text(req.body.id || req.body._id);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!id) return res.status(400).json({ success: false, message: "id is required" });
    const payload = {};
    [
      "academicyear",
      "regulation",
      "program",
      "programcode",
      "course",
      "coursecode",
      "topic",
      "student",
      "regno",
      "contenttype",
      "title",
      "description",
      "link",
      "provider",
      "status"
    ].forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) payload[field] = text(req.body[field]);
    });
    ["marks", "maxmarks", "percentage"].forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) payload[field] = number(req.body[field]);
    });
    payload.user = text(req.body.user);
    const data = await Remedial.findOneAndUpdate({ _id: id, colid }, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Remedial record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRemedial = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const id = text(req.body.id || req.body._id);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!id) return res.status(400).json({ success: false, message: "id is required" });
    const data = await Remedial.findOneAndDelete({ _id: id, colid });
    if (!data) return res.status(404).json({ success: false, message: "Remedial record not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
