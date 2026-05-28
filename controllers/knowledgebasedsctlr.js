const Knowledgebase = require('../Models/knowledgebaseds');
const AiConfiguration = require('../Models/aiconfigurationds');
const Lead = require('../Models/crmh1');
const User = require('../Models/user');

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const text = (value) => String(value || '').trim();

const cleanRegex = (value) => text(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parseGeminiJson = (value) => {
  const raw = text(value);
  if (!raw) return {};
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return {};
    try {
      return JSON.parse(match[0]);
    } catch (innerErr) {
      return {};
    }
  }
};

const getGeminiConfig = async (colid) => {
  const baseQuery = { colid, type: /^Gemini$/i, active: /^Yes$/i };
  return await AiConfiguration.findOne({ ...baseQuery, default: /^Yes$/i }).lean()
    || await AiConfiguration.findOne(baseQuery).sort({ updatedAt: -1, createdAt: -1 }).lean();
};

const callGemini = async ({ apikey, prompt }) => {
  const models = ['gemini-3.1-flash-lite', 'gemini-2.5-flash-lite', 'gemini-2.5-flash'];
  let lastMessage = '';
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apikey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }]
      })
    });
    const payload = await response.json();
    if (response.ok) {
      return (payload.candidates?.[0]?.content?.parts || []).map((part) => part.text || '').join('\n').trim();
    }
    lastMessage = payload.error?.message || `Gemini call failed for ${model}`;
  }
  throw new Error(lastMessage || 'Gemini call failed');
};

const chooseCounselor = async (colid) => {
  const counselors = await User.find({
    colid,
    role: { $regex: /counsellor|counselor/i },
    email: { $exists: true, $ne: '' }
  }).select('name email').sort({ updatedAt: 1, name: 1 }).lean();
  if (counselors.length) return counselors[Math.floor(Math.random() * counselors.length)];

  const users = await User.find({
    colid,
    role: { $not: /^Student$/i },
    email: { $exists: true, $ne: '' }
  }).select('name email').sort({ updatedAt: 1, name: 1 }).limit(50).lean();
  if (users.length) return users[Math.floor(Math.random() * users.length)];
  return null;
};

const makeKbFilter = (source = {}) => {
  const colid = toNumber(source.colid);
  const filter = {};
  if (colid !== undefined) filter.colid = colid;
  if (text(source.type)) filter.type = text(source.type);
  if (text(source.level)) filter.level = text(source.level);
  if (text(source.search)) {
    const regex = new RegExp(cleanRegex(source.search), 'i');
    filter.$or = [{ title: regex }, { type: regex }, { level: regex }, { helptext: regex }];
  }
  return filter;
};

exports.getKnowledgebase = async (req, res) => {
  try {
    const data = await Knowledgebase.find(makeKbFilter(req.query)).sort({ type: 1, level: 1, title: 1 }).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveKnowledgebase = async (req, res) => {
  try {
    const payload = {
      colid: toNumber(req.body.colid),
      title: text(req.body.title),
      type: text(req.body.type),
      level: text(req.body.level),
      helptext: text(req.body.helptext),
      user: text(req.body.user)
    };
    if (payload.colid === undefined) return res.status(400).json({ success: false, message: 'colid is required' });
    if (!payload.title || !payload.type || !payload.level) return res.status(400).json({ success: false, message: 'Title, type and level are required' });

    const data = req.body.id
      ? await Knowledgebase.findOneAndUpdate({ _id: req.body.id, colid: payload.colid }, payload, { new: true, runValidators: true })
      : await Knowledgebase.create(payload);
    if (!data) return res.status(404).json({ success: false, message: 'Knowledgebase row not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteKnowledgebase = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: 'colid is required' });
    await Knowledgebase.findOneAndDelete({ _id: req.body.id, colid });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.bulkKnowledgebase = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: 'colid is required' });
    const docs = (req.body.items || [])
      .map((row) => ({
        colid,
        title: text(row.title || row.Title),
        type: text(row.type || row.Type),
        level: text(row.level || row.Level),
        helptext: text(row.helptext || row.HelpText || row['Help Text']),
        user: text(row.user || req.body.user)
      }))
      .filter((row) => row.title && row.type && row.level);
    if (docs.length) await Knowledgebase.insertMany(docs, { ordered: false });
    res.json({ success: true, saved: docs.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.chatWithKnowledgebase = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: 'colid is required' });
    const question = text(req.body.question);
    if (!question) return res.status(400).json({ success: false, message: 'Question is required' });

    const type = text(req.body.type);
    const level = text(req.body.level);
    const history = Array.isArray(req.body.history) ? req.body.history.slice(-10) : [];
    const kbRows = await Knowledgebase.find(makeKbFilter({ colid, type, level })).sort({ title: 1 }).limit(80).lean();
    const config = await getGeminiConfig(colid);
    if (!config?.apikey) return res.status(400).json({ success: false, message: 'Default active Gemini AI configuration is missing' });

    const prompt = `You are an AI helpdesk chatbot for an institution. Use only the knowledgebase content when answering factual questions. If the answer is not in the knowledgebase, say that you do not have enough information and ask a helpful follow-up.

Knowledgebase:
${kbRows.map((row, index) => `${index + 1}. Title: ${row.title}\nType: ${row.type}\nLevel: ${row.level}\nHelp: ${row.helptext}`).join('\n\n')}

Recent conversation:
${history.map((msg) => `${msg.role || 'user'}: ${msg.content || msg.text || ''}`).join('\n')}

Current user message:
${question}

Return only valid JSON:
{
  "answer": "friendly conversational answer",
  "shouldCreateLead": true/false,
  "lead": {
    "name": "",
    "email": "",
    "phone": "",
    "course_interested": ""
  },
  "leadFollowupQuestion": "ask for any missing lead detail if user appears interested"
}`;

    const raw = await callGemini({ apikey: config.apikey, prompt });
    const parsed = parseGeminiJson(raw);
    let answer = text(parsed.answer) || raw || 'I could not generate an answer.';
    const lead = parsed.lead || {};
    let createdLead = null;

    const hasContact = text(lead.email) || text(lead.phone);
    if (parsed.shouldCreateLead && text(lead.name) && hasContact && text(lead.course_interested)) {
      const existing = await Lead.findOne({
        colid,
        $or: [
          ...(text(lead.email) ? [{ email: text(lead.email) }] : []),
          ...(text(lead.phone) ? [{ phone: text(lead.phone) }] : [])
        ]
      }).lean();
      if (!existing) {
        const counselor = await chooseCounselor(colid);
        createdLead = await Lead.create({
          colid,
          user: counselor?.email || 'AI Helpdesk',
          name: text(lead.name),
          email: text(lead.email),
          phone: text(lead.phone),
          category: 'General',
          course_interested: text(lead.course_interested),
          source: 'AI Helpdesk',
          pipeline_stage: 'New Lead',
          leadstatus: 'Active',
          assignedto: counselor?.email || 'NA',
          comments: `Created by AI Helpdesk chatbot. Type: ${type}. Level: ${level}.`
        });
        answer += `\n\nI have shared your details with our counselor team.`;
      }
    } else if (text(parsed.leadFollowupQuestion)) {
      answer += `\n\n${text(parsed.leadFollowupQuestion)}`;
    }

    res.json({ success: true, answer, lead: createdLead, usedKnowledgebase: kbRows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
