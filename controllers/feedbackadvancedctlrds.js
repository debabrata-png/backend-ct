const FeedbackAdvancedForm = require("../Models/feedbackadvancedformds");
const FeedbackAdvancedResponse = require("../Models/feedbackadvancedresponseds");
const AiConfiguration = require("../Models/aiconfigurationds");
const InsDetails = require("../Models/insdetails");
const Awsconfig = require("../Models/awsconfig");
const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path");

const upload = multer({ storage: multer.memoryStorage() });
exports.uploadImageMiddleware = upload.single("file");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const colNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const escapeRegex = (value) => text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cleanArray = (value) => (Array.isArray(value) ? value.map((item) => text(item)).filter(Boolean) : []);
const cleanLinks = (value) =>
  Array.isArray(value)
    ? value
        .map((item) => ({ label: text(item.label || item.url), url: text(item.url) }))
        .filter((item) => item.url)
    : [];

const normalizeForm = (body = {}) => ({
  colid: colNumber(body.colid),
  academicyear: text(body.academicyear),
  title: text(body.title),
  description: text(body.description),
  instructions: text(body.instructions),
  images: cleanArray(body.images),
  links: cleanLinks(body.links),
  startdate: text(body.startdate),
  enddate: text(body.enddate),
  status: text(body.status) || "Active",
  publicslug: text(body.publicslug) || `fb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  sections: Array.isArray(body.sections)
    ? body.sections.map((section) => ({
        _id: section._id,
        title: text(section.title) || "Section",
        text: text(section.text),
        images: cleanArray(section.images),
        links: cleanLinks(section.links),
        questions: Array.isArray(section.questions)
          ? section.questions
              .filter((question) => text(question.question))
              .map((question) => ({
                _id: question._id,
                question: text(question.question),
                type: text(question.type) === "Short Answer Type" ? "Short Answer Type" : "5 Point Scale",
                images: cleanArray(question.images),
                links: cleanLinks(question.links),
                required: text(question.required) || "Yes"
              }))
          : []
      }))
    : [],
  user: text(body.user)
});

const getGeminiConfig = async (colid) =>
  (await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()) ||
  (await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i }).sort({ _id: -1 }).lean());

const encodeS3Key = (key) => String(key || "").split("/").map(encodeURIComponent).join("/");
const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const getDefaultAwsConfig = async (colid) =>
  Awsconfig.findOne({ colid: Number(colid), type: /^aws$/i, default: /^yes$/i }).sort({ _id: -1 }).lean();

const callGemini = async ({ colid, model, prompt }) => {
  const config = await getGeminiConfig(colid);
  if (!config || !config.apikey) throw new Error("Gemini API key is not configured");
  const selectedModel = text(model) || "gemini-2.5-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${encodeURIComponent(config.apikey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Gemini request failed");
  return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n").trim() || "";
};

const parseJsonArray = (value) => {
  const raw = text(value).replace(/^```json/i, "").replace(/^```/i, "").replace(/```$/i, "").trim();
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : parsed.questions || [];
  } catch (error) {
    return raw
      .split("\n")
      .map((line) => line.replace(/^\d+[\).:-]\s*/, "").trim())
      .filter(Boolean)
      .map((question) => ({ question, type: "5 Point Scale" }));
  }
};

const isWithinWindow = (form) => {
  const today = new Date();
  const start = form.startdate ? new Date(`${form.startdate}T00:00:00`) : null;
  const end = form.enddate ? new Date(`${form.enddate}T23:59:59`) : null;
  if (start && today < start) return false;
  if (end && today > end) return false;
  return true;
};

exports.getForms = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const filter = { colid };
    ["academicyear", "status"].forEach((field) => {
      if (text(req.query[field])) filter[field] = text(req.query[field]);
    });
    const data = await FeedbackAdvancedForm.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveForm = async (req, res) => {
  try {
    const payload = normalizeForm(req.body);
    if (payload.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!payload.academicyear || !payload.title) return res.status(400).json({ success: false, message: "Academic year and title are required" });
    const data = req.body.id
      ? await FeedbackAdvancedForm.findOneAndUpdate({ _id: req.body.id, colid: payload.colid }, payload, { new: true, runValidators: true })
      : await FeedbackAdvancedForm.create(payload);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? "Public link already exists" : error.message });
  }
};

exports.deleteForm = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const result = await FeedbackAdvancedForm.deleteOne({ _id: req.body.id, colid });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!req.file) return res.status(400).json({ success: false, message: "Select an image to upload" });
    if (!/^image\//i.test(req.file.mimetype || "")) {
      return res.status(400).json({ success: false, message: "Only image files can be uploaded" });
    }
    const config = await getDefaultAwsConfig(colid);
    if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
      return res.status(400).json({ success: false, message: "Default AWS configuration is missing or incomplete" });
    }
    const cleanName = path.basename(req.file.originalname || "feedback-image").replace(/[^\w.\-() ]/g, "_");
    const folder = text(req.body.folder) || "general";
    const key = `${colid}/feedback-advanced/${folder}/${Date.now()}-${cleanName}`;
    const s3 = new AWS.S3({
      accessKeyId: config.username,
      secretAccessKey: config.password,
      region: config.region
    });
    await s3.putObject({
      Bucket: config.bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    }).promise();
    res.json({
      success: true,
      filename: cleanName,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bucket: config.bucket,
      region: config.region,
      key,
      url: s3Url(config.bucket, config.region, key)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateQuestions = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const prompt = `Create ${number(req.body.count) || 5} feedback questions in ${text(req.body.language) || "English"}.
Topic: ${text(req.body.topic)}
Question type: ${text(req.body.questiontype) || "5 Point Scale"}.
Return only JSON array. Each item must have "question" and "type", where type is either "5 Point Scale" or "Short Answer Type".`;
    const output = await callGemini({ colid, model: req.body.model, prompt });
    const questions = parseJsonArray(output).map((item) => ({
      question: text(item.question || item),
      type: text(item.type) === "Short Answer Type" ? "Short Answer Type" : "5 Point Scale",
      images: [],
      links: [],
      required: "Yes"
    })).filter((item) => item.question);
    res.json({ success: true, questions, raw: output });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.publicForm = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const formFilter = req.query.formid
      ? { _id: req.query.formid, colid }
      : { publicslug: text(req.query.slug), colid };
    const [form, institution] = await Promise.all([
      FeedbackAdvancedForm.findOne(formFilter).lean(),
      InsDetails.findOne({ colid }).sort({ _id: -1 }).lean()
    ]);
    if (!form) return res.status(404).json({ success: false, message: "Feedback form not found" });
    res.json({ success: true, form, institution, accepting: /^active$/i.test(form.status) && isWithinWindow(form) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.submitResponse = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const formid = text(req.body.formid);
    if (colid === undefined || !formid) return res.status(400).json({ success: false, message: "colid and form are required" });
    const form = await FeedbackAdvancedForm.findOne({ _id: formid, colid }).lean();
    if (!form) return res.status(404).json({ success: false, message: "Feedback form not found" });
    if (!/^active$/i.test(form.status) || !isWithinWindow(form)) return res.status(400).json({ success: false, message: "This feedback form is not accepting responses" });
    const incoming = req.body.answers || {};
    const answers = [];
    form.sections.forEach((section) => {
      section.questions.forEach((question) => {
        const value = incoming[String(question._id)];
        answers.push({
          sectionid: String(section._id),
          section: section.title,
          questionid: String(question._id),
          question: question.question,
          type: question.type,
          answer: text(value),
          score: question.type === "5 Point Scale" ? number(value) : 0
        });
      });
    });
    const data = await FeedbackAdvancedResponse.create({
      colid,
      academicyear: form.academicyear,
      formid,
      formtitle: form.title,
      respondentname: text(req.body.respondentname),
      respondentemail: text(req.body.respondentemail),
      respondentphone: text(req.body.respondentphone),
      answers,
      user: text(req.body.respondentemail)
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.analysis = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    const formid = text(req.query.formid);
    if (colid === undefined || !formid) return res.status(400).json({ success: false, message: "colid and form are required" });
    const filter = { colid, formid };
    if (text(req.query.academicyear)) filter.academicyear = text(req.query.academicyear);
    const [form, responses, institution] = await Promise.all([
      FeedbackAdvancedForm.findOne({ _id: formid, colid }).lean(),
      FeedbackAdvancedResponse.find(filter).sort({ submitteddate: -1 }).lean(),
      InsDetails.findOne({ colid }).sort({ _id: -1 }).lean()
    ]);
    const questionMap = {};
    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        const key = answer.questionid;
        if (!questionMap[key]) {
          questionMap[key] = {
            questionid: key,
            section: answer.section,
            question: answer.question,
            type: answer.type,
            count: 0,
            average: 0,
            scale: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            textanswers: []
          };
        }
        questionMap[key].count += 1;
        if (answer.type === "5 Point Scale") {
          const score = Math.min(5, Math.max(1, number(answer.score || answer.answer)));
          questionMap[key].scale[score] += 1;
          questionMap[key].average += score;
        } else if (answer.answer) {
          questionMap[key].textanswers.push(answer.answer);
        }
      });
    });
    const questions = Object.values(questionMap).map((item) => ({
      ...item,
      average: item.type === "5 Point Scale" && item.count ? Number((item.average / item.count).toFixed(2)) : 0
    }));
    res.json({ success: true, form, responses, questions, institution, totalResponses: responses.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.analyzeSentiment = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const formid = text(req.body.formid);
    const questionid = text(req.body.questionid);
    if (colid === undefined || !formid || !questionid) return res.status(400).json({ success: false, message: "colid, form and question are required" });
    const allMode = questionid === "__all__";
    const responses = await FeedbackAdvancedResponse.find(allMode ? { colid, formid } : { colid, formid, "answers.questionid": questionid }).lean();
    const grouped = {};
    let questionText = "";
    responses.forEach((response) => {
      response.answers
        .filter((answer) => answer.type === "Short Answer Type" && answer.answer && (allMode || answer.questionid === questionid))
        .forEach((answer) => {
          questionText = questionText || answer.question;
          if (!grouped[answer.questionid]) grouped[answer.questionid] = { question: answer.question, answers: [] };
          grouped[answer.questionid].answers.push(answer.answer);
        });
    });
    const groups = Object.values(grouped);
    if (!groups.length) return res.json({ success: true, analysis: allMode ? "No text responses found for this feedback." : "No text responses found for this question." });
    const responseText = groups.map((group, groupIndex) => (
      `Question ${groupIndex + 1}: ${group.question}\n${group.answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n")}`
    )).join("\n\n");
    const prompt = allMode
      ? `Analyze all text responses for this feedback form.
${responseText}
Return: 1. overall summary of all responses, 2. question-wise sentiment, 3. positive themes, 4. negative themes, 5. neutral themes, 6. actionable improvement suggestions.`
      : `Analyze the sentiment of these feedback responses question-wise.
Question: ${questionText}
Responses:
${groups[0].answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n")}
Also include a summary of all responses for this question. Return positive, neutral, negative themes and improvement suggestions.`;
    const analysis = await callGemini({ colid, model: req.body.model, prompt });
    await FeedbackAdvancedResponse.updateMany(
      allMode ? { colid, formid } : { colid, formid, "answers.questionid": questionid },
      { $push: { sentimentanalysis: { questionid, question: allMode ? "All text responses" : questionText, analysis, analyzedAt: new Date() } } }
    );
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
