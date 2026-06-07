const ConductExamInvigilatorAllocation = require("../Models/conductexaminvigilatorallocationds");
const ConductExamCourse = require("../Models/conductexamcourseds");
const ConductExamRoll = require("../Models/conductexamrollds");
const ConductExamInvigilation = require("../Models/conductexaminvigilationds");
const ConductExam = require("../Models/conductexamds");
const AiConfiguration = require("../Models/aiconfigurationds");
const Institution = require("../Models/insdetails");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const uniq = (values) => [...new Set(values.map((item) => text(item)).filter(Boolean))].sort((a, b) => a.localeCompare(b));

const payload = (body = {}) => ({
  colid: number(body.colid),
  academicyear: text(body.academicyear || body.academicYear),
  regulation: text(body.regulation),
  exam: text(body.exam || body.examname),
  examcode: text(body.examcode),
  campus: text(body.campus),
  building: text(body.building),
  room: text(body.room || body.examroom),
  invigilator: text(body.invigilator || body.invigilatorname || body.invigilatorName),
  invigilatoremail: text(body.invigilatoremail || body.invigilatorEmail),
  examdate: text(body.examdate),
  slot: text(body.slot || body.examslot),
  attendance: ["Present", "Absent"].includes(text(body.attendance)) ? text(body.attendance) : "",
  user: text(body.user)
});

const validate = (item) => {
  if (item.colid === undefined) return "colid is required";
  for (const field of ["academicyear", "exam", "examcode", "campus", "building", "room", "invigilator", "invigilatoremail", "examdate", "slot"]) {
    if (!item[field]) return `${field} is required`;
  }
  return "";
};

const buildFilter = (source = {}) => {
  const filter = {};
  const colid = number(source.colid);
  if (colid !== undefined) filter.colid = colid;
  ["academicyear", "regulation", "exam", "examcode", "campus", "building", "room", "invigilator", "invigilatoremail", "examdate", "slot", "attendance"].forEach((field) => {
    if (source[field]) filter[field] = source[field];
  });
  return filter;
};

const getDefaultGeminiConfig = async (colid) => (
  await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
  || await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i }).sort({ _id: -1 }).lean()
);

const callGeminiText = async (apikey, prompt, requestedModel = "") => {
  const allowedModels = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash", "gemini-1.5-flash"];
  const selectedModel = text(requestedModel);
  const models = selectedModel && allowedModels.includes(selectedModel)
    ? [selectedModel, ...allowedModels.filter((model) => model !== selectedModel)]
    : allowedModels;
  let lastError = "";
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apikey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 }
      })
    });
    const data = await response.json();
    if (response.ok) return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
    lastError = data.error?.message || `Gemini request failed for ${model}`;
  }
  throw new Error(lastError || "Gemini request failed");
};

const parseJsonArray = (value) => {
  const raw = text(value);
  if (!raw) return [];
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonText = fenced ? fenced[1] : raw.slice(raw.indexOf("["), raw.lastIndexOf("]") + 1);
  if (!jsonText || jsonText === raw.slice(0, 0)) return [];
  const parsed = JSON.parse(jsonText);
  return Array.isArray(parsed) ? parsed : [];
};

const roomKey = (row) => [row.academicyear, row.examcode, row.examdate, row.slot || row.examslot, row.campus, row.building, row.room || row.examroom].map(text).join("||");

const loadRoomSlots = async ({ colid, academicyear, examcode }) => {
  const rolls = await ConductExamRoll.find({
    colid,
    academicyear,
    examcode,
    campus: { $nin: ["", null] },
    building: { $nin: ["", null] },
    examroom: { $nin: ["", null] },
    examdate: { $nin: ["", null] },
    examslot: { $nin: ["", null] }
  }).sort({ examdate: 1, examslot: 1, campus: 1, building: 1, examroom: 1 }).lean();
  const map = new Map();
  rolls.forEach((row) => {
    const key = roomKey(row);
    if (!map.has(key)) {
      map.set(key, {
        academicyear: row.academicyear,
        regulation: row.regulation || "",
        exam: row.exam,
        examcode: row.examcode,
        campus: row.campus,
        building: row.building,
        room: row.examroom,
        examdate: row.examdate,
        slot: row.examslot
      });
    }
  });
  return [...map.values()];
};

const loadInvigilators = async ({ colid, academicyear, exam, examcode }) => {
  const query = { colid, academicyear, examcode };
  if (text(exam)) query.exam = text(exam);
  const invigilationRows = await ConductExamInvigilation.find(query).sort({ invigilatorname: 1, invigilatoremail: 1 }).lean();
  const map = new Map();
  invigilationRows.forEach((row) => {
    const email = text(row.invigilatoremail);
    if (email) map.set(email.toLowerCase(), { invigilator: row.invigilatorname, invigilatoremail: email });
  });
  return [...map.values()].filter((row) => row.invigilator && row.invigilatoremail);
};

const saveAssignments = async ({ colid, user, assignments }) => {
  const valid = assignments.map((item) => payload({ ...item, colid, user })).filter((item) => !validate(item));
  if (!valid.length) return { saved: 0, data: [] };
  await ConductExamInvigilatorAllocation.bulkWrite(valid.map((item) => ({
    updateOne: {
      filter: {
        colid,
        academicyear: item.academicyear,
        examcode: item.examcode,
        examdate: item.examdate,
        slot: item.slot,
        campus: item.campus,
        building: item.building,
        room: item.room
      },
      update: { $set: item },
      upsert: true
    }
  })));
  const data = await ConductExamInvigilatorAllocation.find({
    colid,
    academicyear: valid[0].academicyear,
    examcode: valid[0].examcode
  }).sort({ examdate: 1, slot: 1, campus: 1, building: 1, room: 1 }).lean();
  return { saved: valid.length, data };
};

exports.getAllocation = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await ConductExamInvigilatorAllocation.find(filter).sort({ academicyear: -1, examdate: 1, slot: 1, campus: 1, building: 1, room: 1 }).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveAllocation = async (req, res) => {
  try {
    const item = payload(req.body);
    const error = validate(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await ConductExamInvigilatorAllocation.findOneAndUpdate({ _id: req.body.id, colid: item.colid }, item, { new: true, runValidators: true })
      : await ConductExamInvigilatorAllocation.create(item);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAllocation = async (req, res) => {
  try {
    await ConductExamInvigilatorAllocation.findOneAndDelete({ _id: req.body.id, colid: number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAllocationsBulk = async (req, res) => {
  try {
    const colid = number(req.body.colid);
    const ids = Array.isArray(req.body.ids) ? req.body.ids.filter(Boolean) : [];
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!ids.length) return res.status(400).json({ success: false, message: "Select at least one allocation row" });
    const result = await ConductExamInvigilatorAllocation.deleteMany({ colid, _id: { $in: ids } });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.bulkAllocation = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const errors = [];
    let saved = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = payload({ ...items[index], colid: req.body.colid || items[index].colid, user: req.body.user || items[index].user });
      const error = validate(item);
      if (error) {
        errors.push({ rowNumber: items[index].rowNumber || index + 2, message: error });
        continue;
      }
      await ConductExamInvigilatorAllocation.create(item);
      saved += 1;
    }
    res.json({ success: true, saved, errors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.options = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [exams, courses, allocations, rolls, invigilators] = await Promise.all([
      ConductExam.find({ colid }).sort({ academicyear: -1, examname: 1 }).lean(),
      ConductExamCourse.find({ colid }).sort({ academicyear: -1, examdate: 1, examslot: 1 }).lean(),
      ConductExamInvigilatorAllocation.find({ colid }).lean(),
      ConductExamRoll.find({ colid, campus: { $nin: ["", null] }, building: { $nin: ["", null] }, examroom: { $nin: ["", null] } }).select("academicyear regulation exam examcode campus building examroom examdate examslot").lean(),
      loadInvigilators({ colid, academicyear: text(req.query.academicyear), exam: text(req.query.exam), examcode: text(req.query.examcode) })
    ]);
    const all = [...courses, ...allocations, ...rolls];
    const rooms = [...new Map(rolls.map((row) => [roomKey(row), {
      academicyear: row.academicyear,
      regulation: row.regulation || "",
      exam: row.exam,
      examcode: row.examcode,
      campus: row.campus,
      building: row.building,
      room: row.examroom,
      examdate: row.examdate,
      slot: row.examslot
    }])).values()];
    res.json({
      success: true,
      exams,
      courses,
      rooms,
      invigilators,
      academicyears: uniq(all.map((row) => row.academicyear)),
      regulations: uniq(all.map((row) => row.regulation)),
      examcodes: uniq(all.map((row) => row.examcode)),
      examsList: uniq(all.map((row) => row.exam)),
      campuses: uniq(rooms.map((row) => row.campus)),
      buildings: uniq(rooms.map((row) => row.building)),
      roomnames: uniq(rooms.map((row) => row.room)),
      examdates: uniq(all.map((row) => row.examdate)),
      slots: uniq([...courses.map((row) => row.examslot), ...allocations.map((row) => row.slot), ...rolls.map((row) => row.examslot)]),
      invigilatoremails: uniq([...invigilators.map((row) => row.invigilatoremail), ...allocations.map((row) => row.invigilatoremail)]),
      attendances: ["Present", "Absent"]
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.autoAllocate = async (req, res) => {
  try {
    const colid = number(req.body.colid);
    const academicyear = text(req.body.academicyear);
    const exam = text(req.body.exam);
    const examcode = text(req.body.examcode);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!academicyear || !exam || !examcode) return res.status(400).json({ success: false, message: "Academic year, exam and exam code are required" });
    const rooms = await loadRoomSlots({ colid, academicyear, examcode });
    if (!rooms.length) return res.status(400).json({ success: false, message: "No allocated rooms found. Please run seat allocation first." });
    const invigilators = await loadInvigilators({ colid, academicyear, exam, examcode });
    if (!invigilators.length) return res.status(400).json({ success: false, message: "No invigilators found in Invigilation Details for the selected academic year, exam and exam code." });
    const assignments = rooms.map((room, index) => ({ ...room, ...invigilators[index % invigilators.length] }));
    const result = await saveAssignments({ colid, user: req.body.user, assignments });
    res.json({ success: true, saved: result.saved, data: result.data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.aiAllocate = async (req, res) => {
  try {
    const colid = number(req.body.colid);
    const academicyear = text(req.body.academicyear);
    const exam = text(req.body.exam);
    const examcode = text(req.body.examcode);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!academicyear || !exam || !examcode) return res.status(400).json({ success: false, message: "Academic year, exam and exam code are required" });
    const rooms = await loadRoomSlots({ colid, academicyear, examcode });
    if (!rooms.length) return res.status(400).json({ success: false, message: "No allocated rooms found. Please run seat allocation first." });
    const invigilators = await loadInvigilators({ colid, academicyear, exam, examcode });
    if (!invigilators.length) return res.status(400).json({ success: false, message: "No invigilators found in Invigilation Details for the selected academic year, exam and exam code." });
    const config = await getDefaultGeminiConfig(colid);
    if (!config?.apikey) return res.status(400).json({ success: false, message: "Gemini configuration not found" });
    const prompt = `Create invigilator allocation for an examination.
Return ONLY a JSON array. Each item must contain: academicyear, regulation, exam, examcode, campus, building, room, examdate, slot, invigilatoremail.
Assign one invigilator to every room/date/slot. Use only the given invigilator emails. Follow these user rules: ${text(req.body.rules) || "distribute workload evenly"}.
Rooms: ${JSON.stringify(rooms)}
Invigilators: ${JSON.stringify(invigilators)}`;
    const aiText = await callGeminiText(config.apikey, prompt, req.body.geminiModel);
    const parsed = parseJsonArray(aiText);
    const invigilatorMap = new Map(invigilators.map((row) => [row.invigilatoremail.toLowerCase(), row]));
    const roomMap = new Map(rooms.map((row) => [roomKey(row), row]));
    const assignments = [];
    parsed.forEach((item) => {
      const base = roomMap.get(roomKey(item));
      const invigilator = invigilatorMap.get(text(item.invigilatoremail).toLowerCase());
      if (base && invigilator) assignments.push({ ...base, ...invigilator });
    });
    rooms.forEach((room, index) => {
      if (!assignments.some((item) => roomKey(item) === roomKey(room))) {
        assignments.push({ ...room, ...invigilators[index % invigilators.length] });
      }
    });
    const result = await saveAssignments({ colid, user: req.body.user, assignments });
    res.json({ success: true, saved: result.saved, data: result.data, aiText });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markAttendance = async (req, res) => {
  try {
    const colid = number(req.body.colid);
    const ids = Array.isArray(req.body.ids) ? req.body.ids.filter(Boolean) : [];
    const attendance = text(req.body.attendance);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!ids.length) return res.status(400).json({ success: false, message: "Select at least one row" });
    if (!["Present", "Absent"].includes(attendance)) return res.status(400).json({ success: false, message: "Attendance must be Present or Absent" });
    const result = await ConductExamInvigilatorAllocation.updateMany(
      { colid, _id: { $in: ids } },
      { $set: { attendance, user: text(req.body.user) } }
    );
    res.json({ success: true, updated: result.modifiedCount || result.nModified || 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.paymentSummary = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    const academicyear = text(req.query.academicyear);
    const examcode = text(req.query.examcode);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!academicyear || !examcode) return res.status(400).json({ success: false, message: "Academic year and exam code are required" });
    const [rows, rates, institution] = await Promise.all([
      ConductExamInvigilatorAllocation.find({ colid, academicyear, examcode }).sort({ invigilator: 1, examdate: 1, slot: 1 }).lean(),
      ConductExamInvigilation.find({ colid, academicyear, examcode }).lean(),
      Institution.findOne({ colid }).lean()
    ]);
    const rateMap = new Map();
    rates.forEach((row) => {
      const email = text(row.invigilatoremail).toLowerCase();
      if (email && !rateMap.has(email)) rateMap.set(email, Number(row.amountpersession) || 0);
    });
    const map = new Map();
    rows.forEach((row) => {
      const email = text(row.invigilatoremail).toLowerCase();
      if (!email) return;
      if (!map.has(email)) {
        map.set(email, {
          invigilator: row.invigilator,
          invigilatoremail: row.invigilatoremail,
          presentSessions: 0,
          absentSessions: 0,
          pendingSessions: 0,
          amountpersession: rateMap.get(email) || 0,
          totalamount: 0
        });
      }
      const item = map.get(email);
      if (row.attendance === "Present") item.presentSessions += 1;
      else if (row.attendance === "Absent") item.absentSessions += 1;
      else item.pendingSessions += 1;
    });
    const data = [...map.values()].map((item) => ({
      ...item,
      totalamount: item.presentSessions * item.amountpersession
    })).sort((a, b) => a.invigilator.localeCompare(b.invigilator));
    const totals = data.reduce((acc, row) => ({
      presentSessions: acc.presentSessions + row.presentSessions,
      absentSessions: acc.absentSessions + row.absentSessions,
      pendingSessions: acc.pendingSessions + row.pendingSessions,
      totalamount: acc.totalamount + row.totalamount
    }), { presentSessions: 0, absentSessions: 0, pendingSessions: 0, totalamount: 0 });
    res.json({ success: true, data, totals, institution });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.allocationOrder = async (req, res) => {
  try {
    const colid = number(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const filter = { colid };
    ["academicyear", "regulation", "exam", "examcode", "campus", "building", "room", "examdate", "slot"].forEach((field) => {
      if (text(req.body[field])) filter[field] = text(req.body[field]);
    });
    const emails = Array.isArray(req.body.invigilatoremails)
      ? req.body.invigilatoremails.map(text).filter(Boolean)
      : [];
    if (emails.length) filter.invigilatoremail = { $in: emails };
    else if (text(req.body.invigilatoremail)) filter.invigilatoremail = text(req.body.invigilatoremail);

    const [data, institution] = await Promise.all([
      ConductExamInvigilatorAllocation.find(filter).sort({
        invigilator: 1,
        invigilatoremail: 1,
        examdate: 1,
        slot: 1,
        campus: 1,
        building: 1,
        room: 1
      }).lean(),
      Institution.findOne({ colid }).lean()
    ]);
    res.json({ success: true, data, institution });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
