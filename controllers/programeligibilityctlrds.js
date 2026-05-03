const ProgramEligibility = require("../Models/programeligibilityds");
const AdmissionApplication = require("../Models/admissionapplicationdynamic");
const MPrograms = require("../Models/mprograms");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const cleanText = (value) => String(value || "").trim();

const normalizeSubject = (value) =>
  cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const cleanSubjects = (subjects = []) => {
  const seen = new Set();
  return subjects
    .map(cleanText)
    .filter(Boolean)
    .filter((subject) => {
      const key = normalizeSubject(subject);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const extractStudentSubjects = (student) => {
  const subjects = [];
  if (Array.isArray(student.twelvesubjectmarks)) {
    student.twelvesubjectmarks.forEach((item) => {
      if (item && item.subject) subjects.push(item.subject);
    });
  }

  cleanText(student.twelvesubjects)
    .split(/[,;|/]+/)
    .map(cleanText)
    .filter(Boolean)
    .forEach((item) => subjects.push(item));

  const normalized = new Map();
  subjects.forEach((subject) => {
    const key = normalizeSubject(subject);
    if (key && !normalized.has(key)) normalized.set(key, cleanText(subject));
  });
  return normalized;
};

exports.getProgramEligibilityOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const [programs, rules] = await Promise.all([
      MPrograms.find({ colid }).sort({ program: 1, programcode: 1 }).lean(),
      ProgramEligibility.find({ colid }).sort({ program: 1, programcode: 1 }).lean()
    ]);

    res.json({
      success: true,
      programs: programs.map((item) => ({
        _id: item._id,
        program: item.program || item.name || "",
        programcode: item.programcode || "",
        type: item.type || "",
        year: item.year || ""
      })),
      rules
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProgramEligibilityRule = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const programcode = cleanText(req.query.programcode);
    if (colid === undefined || !programcode) {
      return res.status(400).json({ success: false, message: "colid and program are required" });
    }

    const data = await ProgramEligibility.findOne({ colid, programcode }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveProgramEligibilityRule = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const programcode = cleanText(req.body.programcode);
    const program = cleanText(req.body.program);
    const requiredsubjects = cleanSubjects(req.body.requiredsubjects || []);
    if (colid === undefined || !programcode) {
      return res.status(400).json({ success: false, message: "colid and program are required" });
    }
    if (!requiredsubjects.length) {
      return res.status(400).json({ success: false, message: "Add at least one required subject" });
    }

    const data = await ProgramEligibility.findOneAndUpdate(
      { colid, programcode },
      { colid, programcode, program, requiredsubjects, user: cleanText(req.body.user) },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.runProgramEligibilityCheck = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const programcode = cleanText(req.body.programcode);
    const program = cleanText(req.body.program);
    if (colid === undefined || !programcode) {
      return res.status(400).json({ success: false, message: "colid and program are required" });
    }

    let requiredsubjects = cleanSubjects(req.body.requiredsubjects || []);
    if (!requiredsubjects.length) {
      const savedRule = await ProgramEligibility.findOne({ colid, programcode }).lean();
      requiredsubjects = cleanSubjects(savedRule?.requiredsubjects || []);
    }
    if (!requiredsubjects.length) {
      return res.status(400).json({ success: false, message: "Add at least one required subject" });
    }

    const students = await AdmissionApplication.find({ colid, programcode })
      .sort({ name: 1, phone: 1 })
      .lean();

    const normalizedRequired = requiredsubjects.map((subject) => ({
      subject,
      key: normalizeSubject(subject)
    }));

    const updates = [];
    const results = students.map((student) => {
      const availableMap = extractStudentSubjects(student);
      const missingSubjects = normalizedRequired
        .filter((item) => !availableMap.has(item.key))
        .map((item) => item.subject);
      const eligible = missingSubjects.length === 0;

      if (!eligible && student.applicationstatus !== "Ineligible") {
        updates.push({
          updateOne: {
            filter: { _id: student._id, colid },
            update: { $set: { applicationstatus: "Ineligible" } }
          }
        });
      }

      return {
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        academicyear: student.academicyear,
        programapplied: student.programapplied || program,
        programcode: student.programcode,
        category: student.category,
        gender: student.gender,
        previousstatus: student.applicationstatus,
        newstatus: eligible ? student.applicationstatus : "Ineligible",
        eligible,
        availableSubjects: Array.from(availableMap.values()).join(", "),
        missingSubjects: missingSubjects.join(", ")
      };
    });

    if (updates.length) await AdmissionApplication.bulkWrite(updates);

    const eligibleCount = results.filter((item) => item.eligible).length;
    const ineligibleCount = results.length - eligibleCount;

    res.json({
      success: true,
      count: results.length,
      updated: updates.length,
      requiredsubjects,
      summary: {
        total: results.length,
        eligible: eligibleCount,
        ineligible: ineligibleCount,
        updatedToIneligible: updates.length
      },
      data: results
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
