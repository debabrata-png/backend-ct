const RegulationSeat = require("../Models/regulationseatds");
const RegulationMaster = require("../Models/regulationmasterds");
const RegulationSubject = require("../Models/regulationsubjectds");
const MPrograms = require("../Models/mprograms");

const academicYears = ["2026-27", "2027-28", "2028-29", "2029-30", "2030-31"];
const subjectTypes = new Set(["Major", "Minor", "AEC", "SEC", "VAC", "IDC"]);
const categories = new Set(["General", "SC", "ST", "OBC", "EWS", "EBC", "PH", "Sports", "Supernumerary"]);
const yesNoValues = new Set(["Yes", "No"]);

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const clean = (value) => String(value || "").trim();

const cleanPayload = (input = {}) => ({
  academicyear: clean(input.academicyear || "2026-27"),
  regulationid: clean(input.regulationid),
  regulation: clean(input.regulation),
  program: clean(input.program),
  programcode: clean(input.programcode),
  subject: clean(input.subject),
  type: subjectTypes.has(input.type) ? input.type : "",
  category: categories.has(input.category) ? input.category : "",
  noofseats: toNumber(input.noofseats) || 0,
  samestate: yesNoValues.has(input.samestate) ? input.samestate : "Yes",
  colid: toNumber(input.colid),
  user: clean(input.user)
});

const validatePayload = (payload) => {
  if (payload.colid === undefined) return "colid is required";
  if (!payload.academicyear) return "Academic year is required";
  if (!payload.regulation) return "Regulation is required";
  if (!payload.program) return "Program is required";
  if (!payload.subject) return "Subject is required";
  if (!payload.type) return "Type is required";
  if (!payload.category) return "Category is required";
  return "";
};

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  if (source.academicyear) query.academicyear = source.academicyear;
  if (source.regulation) query.regulation = source.regulation;
  if (source.programcode) query.programcode = source.programcode;
  if (source.program) query.program = source.program;
  if (source.subject) query.subject = source.subject;
  if (source.type) query.type = source.type;
  if (source.category) query.category = source.category;
  if (source.samestate) query.samestate = source.samestate;
  return query;
};

exports.getRegulationSeatOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const subjectQuery = { colid };
    if (req.query.regulation) subjectQuery.regulation = req.query.regulation;
    if (req.query.programcode) subjectQuery.programcode = req.query.programcode;
    if (req.query.type) subjectQuery.type = req.query.type;

    const [regulations, programs, subjects] = await Promise.all([
      RegulationMaster.find({ colid, isactive: "Yes" }).sort({ regulation: 1 }).lean(),
      MPrograms.find({ colid }).sort({ program: 1, programcode: 1 }).lean(),
      RegulationSubject.find(subjectQuery).sort({ subject: 1 }).lean()
    ]);

    res.json({
      success: true,
      academicYears,
      subjectTypes: Array.from(subjectTypes),
      categories: Array.from(categories),
      regulations,
      programs: programs.map((item) => ({
        _id: item._id,
        program: item.program || item.name || "",
        programcode: item.programcode || "",
        type: item.type || "",
        year: item.year || ""
      })),
      subjects: Array.from(new Map(subjects.map((item) => [item.subject, {
        _id: item._id,
        subject: item.subject,
        regulation: item.regulation,
        program: item.program,
        programcode: item.programcode,
        type: item.type
      }])).values())
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createRegulationSeat = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });

    const data = await RegulationSeat.create(payload);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRegulationSeats = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const data = await RegulationSeat.find(query).sort({ academicyear: 1, regulation: 1, program: 1, type: 1, subject: 1, category: 1 });
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRegulationSeat = async (req, res) => {
  try {
    const payload = cleanPayload(req.body);
    const error = validatePayload(payload);
    if (error) return res.status(400).json({ success: false, message: error });

    const data = await RegulationSeat.findByIdAndUpdate(req.body.id, payload, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRegulationSeat = async (req, res) => {
  try {
    const data = await RegulationSeat.findByIdAndDelete(req.body.id);
    if (!data) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
