const GeneratorRequirement = require("../Models/conductexamgeneratorrequirementds");
const GeneratorMaster = require("../Models/conductexamgeneratormasterds");
const GeneratorAllocation = require("../Models/conductexamgeneratorallocationds");
const ConductExamRoll = require("../Models/conductexamrollds");
const ConductExam = require("../Models/conductexamds");
const AiConfiguration = require("../Models/aiconfigurationds");
const Institution = require("../Models/insdetails");

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

const reqPayload = (body = {}) => ({
  colid: colNumber(body.colid),
  campus: text(body.campus),
  building: text(body.building),
  generatorcapacity: number(body.generatorcapacity || body.generatorCapacity),
  fuel: number(body.fuel),
  noofgenerators: number(body.noofgenerators || body.noOfGenerators) || 1,
  user: text(body.user)
});

const masterPayload = (body = {}) => ({
  colid: colNumber(body.colid),
  generatorcode: text(body.generatorcode || body.generatorCode),
  makemodel: text(body.makemodel || body.makeModel || body.model),
  suppliername: text(body.suppliername || body.supplierName),
  type: ["rent", "own"].includes(text(body.type).toLowerCase()) ? text(body.type).toLowerCase() : "own",
  generatorcapacity: number(body.generatorcapacity || body.generatorCapacity),
  status: text(body.status) || "Active",
  user: text(body.user)
});

const filterFrom = (source = {}, fields = []) => {
  const filter = {};
  const colid = colNumber(source.colid);
  if (colid !== undefined) filter.colid = colid;
  fields.forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  return filter;
};

const validateReq = (item) => {
  if (item.colid === undefined) return "colid is required";
  if (!item.campus) return "Campus is required";
  if (!item.building) return "Building is required";
  if (item.generatorcapacity <= 0) return "Generator capacity is required";
  if (item.fuel < 0) return "Fuel cannot be negative";
  if (item.noofgenerators <= 0) return "No of generators is required";
  return "";
};

const validateMaster = (item) => {
  if (item.colid === undefined) return "colid is required";
  if (!item.generatorcode) return "Generator code is required";
  if (!item.makemodel) return "Make model is required";
  if (!item.suppliername) return "Supplier name is required";
  if (item.generatorcapacity <= 0) return "Generator capacity is required";
  return "";
};

const getDefaultGemini = async (colid) => (
  await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
  || await AiConfiguration.findOne({ colid, type: /^gemini$/i, active: /^yes$/i }).sort({ _id: -1 }).lean()
);

const callGemini = async (apikey, prompt, requestedModel = "") => {
  const models = [text(requestedModel), "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"].filter(Boolean);
  let lastError = "";
  for (const model of [...new Set(models)]) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apikey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2 } })
    });
    const data = await response.json();
    if (response.ok) return data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
    lastError = data.error?.message || `Gemini failed for ${model}`;
  }
  throw new Error(lastError || "Gemini request failed");
};

exports.options = async (req, res) => {
  try {
    const colid = colNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [rolls, requirements, generators, exams] = await Promise.all([
      ConductExamRoll.find({ colid }).select("academicyear exam examcode campus building examdate examslot").lean(),
      GeneratorRequirement.find({ colid }).sort({ campus: 1, building: 1 }).lean(),
      GeneratorMaster.find({ colid }).sort({ generatorcode: 1 }).lean(),
      ConductExam.find({ colid }).sort({ academicyear: -1, examname: 1 }).lean()
    ]);
    res.json({
      success: true,
      rolls,
      requirements,
      generators,
      exams,
      academicyears: uniq(rolls.map((row) => row.academicyear)),
      campuses: uniq([...rolls.map((row) => row.campus), ...requirements.map((row) => row.campus)]),
      buildings: uniq([...rolls.map((row) => row.building), ...requirements.map((row) => row.building)])
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRequirements = async (req, res) => {
  try {
    const filter = filterFrom(req.query, ["campus", "building"]);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await GeneratorRequirement.find(filter).sort({ campus: 1, building: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveRequirement = async (req, res) => {
  try {
    const item = reqPayload(req.body);
    const error = validateReq(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await GeneratorRequirement.findOneAndUpdate({ _id: req.body.id, colid: item.colid }, item, { new: true, runValidators: true })
      : await GeneratorRequirement.findOneAndUpdate({ colid: item.colid, campus: item.campus, building: item.building }, item, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? "Requirement already exists for this campus and building" : error.message });
  }
};

exports.deleteRequirement = async (req, res) => {
  try {
    const result = await GeneratorRequirement.deleteOne({ _id: req.body.id, colid: colNumber(req.body.colid) });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkRequirements = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    let saved = 0;
    const errors = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = reqPayload({ ...items[i], colid, user: req.body.user || items[i].user });
      const error = validateReq(item);
      if (error) {
        errors.push({ rowNumber: i + 2, message: error });
        continue;
      }
      await GeneratorRequirement.findOneAndUpdate({ colid, campus: item.campus, building: item.building }, item, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
      saved += 1;
    }
    res.json({ success: true, saved, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMasters = async (req, res) => {
  try {
    const filter = filterFrom(req.query, ["generatorcode", "makemodel", "suppliername", "type", "status"]);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await GeneratorMaster.find(filter).sort({ generatorcode: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveMaster = async (req, res) => {
  try {
    const item = masterPayload(req.body);
    const error = validateMaster(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await GeneratorMaster.findOneAndUpdate({ _id: req.body.id, colid: item.colid }, item, { new: true, runValidators: true })
      : await GeneratorMaster.findOneAndUpdate({ colid: item.colid, generatorcode: item.generatorcode }, item, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? "Generator code already exists" : error.message });
  }
};

exports.deleteMaster = async (req, res) => {
  try {
    const result = await GeneratorMaster.deleteOne({ _id: req.body.id, colid: colNumber(req.body.colid) });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkMasters = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    let saved = 0;
    const errors = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = masterPayload({ ...items[i], colid, user: req.body.user || items[i].user });
      const error = validateMaster(item);
      if (error) {
        errors.push({ rowNumber: i + 2, message: error });
        continue;
      }
      await GeneratorMaster.findOneAndUpdate({ colid, generatorcode: item.generatorcode }, item, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
      saved += 1;
    }
    res.json({ success: true, saved, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const buildAllocationRows = (slots, requirements, generators, mode, user) => {
  const available = [...generators].sort((a, b) => Number(b.generatorcapacity || 0) - Number(a.generatorcapacity || 0));
  const rows = [];
  slots.forEach((slot) => {
    const requirement = requirements.find((row) => row.campus === slot.campus && row.building === slot.building);
    if (!requirement) return;
    const needed = Math.max(1, Number(requirement.noofgenerators || 1));
    const selected = available.filter((gen) => Number(gen.generatorcapacity || 0) >= Number(requirement.generatorcapacity || 0)).slice(0, needed);
    selected.forEach((gen) => rows.push({
      colid: slot.colid,
      academicyear: slot.academicyear,
      exam: slot.exam,
      examcode: slot.examcode,
      examdate: slot.examdate,
      examslot: slot.examslot,
      campus: slot.campus,
      building: slot.building,
      roomcount: slot.roomcount,
      studentcount: slot.studentcount,
      requiredcapacity: requirement.generatorcapacity,
      requiredfuel: requirement.fuel,
      requiredgenerators: requirement.noofgenerators,
      generatorcode: gen.generatorcode,
      makemodel: gen.makemodel,
      suppliername: gen.suppliername,
      generatortype: gen.type,
      generatorcapacity: gen.generatorcapacity,
      allocationmode: mode,
      status: "Allocated",
      user
    }));
  });
  return rows;
};

exports.allocate = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const academicyear = text(req.body.academicyear);
    const examcode = text(req.body.examcode);
    if (colid === undefined || !academicyear || !examcode) return res.status(400).json({ success: false, message: "Academic year and exam code are required" });
    const rolls = await ConductExamRoll.find({ colid, academicyear, examcode, applied: "Yes", campus: { $ne: "" }, building: { $ne: "" }, examroom: { $ne: "" } }).lean();
    const slotMap = new Map();
    rolls.forEach((row) => {
      const key = [row.examdate, row.examslot, row.campus, row.building].map(text).join("||");
      if (!slotMap.has(key)) slotMap.set(key, { colid, academicyear, exam: row.exam, examcode, examdate: row.examdate, examslot: row.examslot, campus: row.campus, building: row.building, rooms: new Set(), studentcount: 0 });
      const slot = slotMap.get(key);
      slot.rooms.add(row.examroom);
      slot.studentcount += 1;
    });
    const slots = [...slotMap.values()].map((row) => ({ ...row, roomcount: row.rooms.size, rooms: undefined })).filter((row) => row.examdate && row.examslot && row.campus && row.building);
    const [requirements, generators] = await Promise.all([
      GeneratorRequirement.find({ colid }).lean(),
      GeneratorMaster.find({ colid, status: /^Active$/i }).lean()
    ]);
    if (!slots.length) return res.status(400).json({ success: false, message: "No allocated exam rooms found for selected exam" });
    if (!requirements.length) return res.status(400).json({ success: false, message: "No generator requirement found" });
    if (!generators.length) return res.status(400).json({ success: false, message: "No active generators found" });
    let aiText = "";
    if (text(req.body.mode).toLowerCase() === "gemini") {
      const config = await getDefaultGemini(colid);
      if (config?.apikey) {
        aiText = await callGemini(config.apikey, [
          "Allocate generators for exam buildings. Return concise recommendations. Software will perform final deterministic allocation.",
          `Rules: ${text(req.body.rules) || "Use sufficient capacity and avoid under-allocation."}`,
          `Slots: ${JSON.stringify(slots)}`,
          `Requirements: ${JSON.stringify(requirements)}`,
          `Generators: ${JSON.stringify(generators.map((g) => ({ generatorcode: g.generatorcode, capacity: g.generatorcapacity, type: g.type, supplier: g.suppliername })))}`
        ].join("\n"), req.body.geminiModel);
      }
    }
    const rows = buildAllocationRows(slots, requirements, generators, text(req.body.mode).toLowerCase() === "gemini" ? "Gemini" : "Auto", text(req.body.user));
    await GeneratorAllocation.deleteMany({ colid, academicyear, examcode });
    if (rows.length) {
      await GeneratorAllocation.insertMany(rows, { ordered: false });
    }
    const data = await GeneratorAllocation.find({ colid, academicyear, examcode }).sort({ examdate: 1, examslot: 1, campus: 1, building: 1 }).lean();
    const institution = await Institution.findOne({ colid }).sort({ _id: -1 }).lean();
    res.json({ success: true, saved: data.length, data, slots, aiText, institution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllocations = async (req, res) => {
  try {
    const filter = filterFrom(req.query, ["academicyear", "exam", "examcode", "examdate", "examslot", "campus", "building", "generatorcode", "status"]);
    if (filter.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const [data, institution] = await Promise.all([
      GeneratorAllocation.find(filter).sort({ examdate: 1, examslot: 1, campus: 1, building: 1 }).lean(),
      Institution.findOne({ colid: filter.colid }).sort({ _id: -1 }).lean()
    ]);
    res.json({ success: true, data, institution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const allocationPayload = (body = {}) => ({
  colid: colNumber(body.colid),
  academicyear: text(body.academicyear),
  exam: text(body.exam),
  examcode: text(body.examcode),
  examdate: text(body.examdate),
  examslot: text(body.examslot),
  campus: text(body.campus),
  building: text(body.building),
  roomcount: number(body.roomcount),
  studentcount: number(body.studentcount),
  requiredcapacity: number(body.requiredcapacity),
  requiredfuel: number(body.requiredfuel),
  requiredgenerators: number(body.requiredgenerators),
  generatorcode: text(body.generatorcode),
  makemodel: text(body.makemodel),
  suppliername: text(body.suppliername),
  generatortype: text(body.generatortype || body.type),
  generatorcapacity: number(body.generatorcapacity),
  allocationmode: text(body.allocationmode) || "Manual",
  status: text(body.status) || "Allocated",
  user: text(body.user)
});

const validateAllocation = (item) => {
  if (item.colid === undefined) return "colid is required";
  for (const field of ["academicyear", "examcode", "examdate", "examslot", "campus", "building", "generatorcode"]) {
    if (!item[field]) return `${field} is required`;
  }
  return "";
};

exports.saveAllocation = async (req, res) => {
  try {
    const item = allocationPayload(req.body);
    const error = validateAllocation(item);
    if (error) return res.status(400).json({ success: false, message: error });
    const data = req.body.id
      ? await GeneratorAllocation.findOneAndUpdate({ _id: req.body.id, colid: item.colid }, item, { new: true, runValidators: true })
      : await GeneratorAllocation.findOneAndUpdate(
        { colid: item.colid, academicyear: item.academicyear, examcode: item.examcode, examdate: item.examdate, examslot: item.examslot, campus: item.campus, building: item.building, generatorcode: item.generatorcode },
        item,
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.code === 11000 ? "Generator allocation already exists" : error.message });
  }
};

exports.deleteAllocation = async (req, res) => {
  try {
    const result = await GeneratorAllocation.deleteOne({ _id: req.body.id, colid: colNumber(req.body.colid) });
    res.json({ success: true, deleted: result.deletedCount || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkAllocations = async (req, res) => {
  try {
    const colid = colNumber(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    let saved = 0;
    const errors = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = allocationPayload({ ...items[i], colid, user: req.body.user || items[i].user });
      const error = validateAllocation(item);
      if (error) {
        errors.push({ rowNumber: i + 2, message: error });
        continue;
      }
      await GeneratorAllocation.findOneAndUpdate(
        { colid, academicyear: item.academicyear, examcode: item.examcode, examdate: item.examdate, examslot: item.examslot, campus: item.campus, building: item.building, generatorcode: item.generatorcode },
        item,
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
      );
      saved += 1;
    }
    res.json({ success: true, saved, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
