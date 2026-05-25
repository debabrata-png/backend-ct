const CounselorMapping = require("../Models/counselormapping");
const RegulationMaster = require("../Models/regulationmasterds");
const RegulationCourseMap = require("../Models/regulationcoursemapds");
const MPrograms = require("../Models/mprograms");
const User = require("../Models/user");

const text = (value) => String(value || "").trim();
const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
const uniq = (rows) => [...new Set(rows.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));

const payload = (body = {}) => ({
  colid: toNumber(body.colid),
  academicyear: text(body.academicyear || body.academicYear || body.year),
  regulation: text(body.regulation),
  program: text(body.program),
  programcode: text(body.programcode),
  counselorname: text(body.counselorname || body.counsellorname),
  counseloremail: text(body.counseloremail || body.counselloremail),
  user: text(body.user),
  status: text(body.status || "Active") || "Active"
});

const programOptions = async (colid, academicyear, regulation) => {
  const courseMapQuery = { colid };
  if (academicyear) courseMapQuery.academicyear = academicyear;
  if (regulation) courseMapQuery.regulation = regulation;

  const coursePrograms = await RegulationCourseMap.aggregate([
    { $match: courseMapQuery },
    { $group: { _id: { program: "$program", programcode: "$programcode" } } },
    { $project: { _id: 0, program: "$_id.program", programcode: "$_id.programcode" } },
    { $sort: { program: 1, programcode: 1 } }
  ]);
  if (coursePrograms.length) return coursePrograms;

  const programQuery = { colid };
  if (academicyear) programQuery.year = academicyear;
  const programs = await MPrograms.find(programQuery).sort({ Order: 1, program: 1, programcode: 1 }).lean();
  return programs.map((item) => ({
    program: item.program || item.name || "",
    programcode: item.programcode || ""
  })).filter((item) => item.program || item.programcode);
};

exports.getCounselorMappingOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const academicyear = text(req.query.academicyear);
    const regulation = text(req.query.regulation);
    const [programYears, courseYears, regulations, counselorsByRole] = await Promise.all([
      MPrograms.distinct("year", { colid }),
      RegulationCourseMap.distinct("academicyear", { colid }),
      RegulationMaster.find({ colid, isactive: "Yes" }).sort({ regulation: 1 }).lean(),
      User.find({ colid, role: { $regex: /counsellor|counselor/i } }).select("name email role").sort({ name: 1 }).lean()
    ]);

    let counselors = counselorsByRole;
    if (!counselors.length) {
      counselors = await User.find({ colid, role: { $ne: "Student" } }).select("name email role").sort({ name: 1 }).lean();
    }

    const programs = await programOptions(colid, academicyear, regulation);
    res.json({
      success: true,
      academicyears: uniq([...programYears, ...courseYears]),
      regulations,
      programs,
      counselors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCounselorMappings = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid || req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const query = { colid };
    ["academicyear", "regulation", "programcode", "counseloremail", "status"].forEach((field) => {
      if (text(req.query[field])) query[field] = text(req.query[field]);
    });
    const data = await CounselorMapping.find(query).sort({ academicyear: -1, regulation: 1, program: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveCounselorMapping = async (req, res) => {
  try {
    const data = payload(req.body);
    if (!data.colid || !data.academicyear || !data.regulation || !data.program || !data.programcode || !data.counselorname || !data.counseloremail) {
      return res.status(400).json({ success: false, message: "Academic year, regulation, program and counselor are required" });
    }
    const filter = req.body.id
      ? { _id: req.body.id, colid: data.colid }
      : { colid: data.colid, academicyear: data.academicyear, regulation: data.regulation, programcode: data.programcode };
    const row = await CounselorMapping.findOneAndUpdate(filter, data, { new: true, upsert: !req.body.id, runValidators: true });
    res.json({ success: true, data: row });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCounselorMapping = async (req, res) => {
  try {
    const row = await CounselorMapping.findOneAndDelete({ _id: req.body.id, colid: toNumber(req.body.colid) });
    if (!row) return res.status(404).json({ success: false, message: "Mapping not found" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
