const AdmissionApplication = require("../Models/admissionapplicationdynamic");
const AdmissionFormField = require("../Models/admissionformfield");
const RegulationMaster = require("../Models/regulationmasterds");
const RegulationSubject = require("../Models/regulationsubjectds");
const RegulationSeat = require("../Models/regulationseatds");
const User = require("../Models/user");

const categories = ["General", "SC", "ST", "OBC", "EWS", "EBC", "PH", "Supernumerary", "Sports"];
const subjectTypes = ["Major", "Minor", "AEC", "SEC", "VAC", "IDC"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const clean = (value) => String(value || "").trim();
const escapeRegex = (value = "") => clean(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getProgramName = (application) => application.programapplied || application.program || application.programcode || "";

const buildSearchQuery = (body = {}) => {
  const colid = toNumber(body.colid);
  const query = { colid, applicationstatus: "Applied" };

  if (body.academicyear) query.academicyear = body.academicyear;
  if (body.programcode) query.programcode = body.programcode;
  if (body.category) query.category = body.category;
  if (body.name) query.name = { $regex: escapeRegex(body.name), $options: "i" };
  if (body.email) query.email = { $regex: escapeRegex(body.email), $options: "i" };
  if (body.phone) query.phone = { $regex: escapeRegex(body.phone), $options: "i" };

  const dynamicFilters = Array.isArray(body.dynamicFilters) ? body.dynamicFilters : [];
  dynamicFilters.forEach((filter) => {
    const fieldname = clean(filter.fieldname);
    const value = clean(filter.value);
    if (fieldname && value) {
      query[`extraFields.${fieldname}`] = { $regex: escapeRegex(value), $options: "i" };
    }
  });

  return query;
};

const getSubjectCapacity = async ({ colid, academicyear, regulation, programcode, category, samestate, subject, type }) => {
  const seatRows = await RegulationSeat.find({
    colid,
    academicyear,
    regulation,
    programcode,
    category,
    samestate,
    subject,
    type
  }).lean();

  const totalSeats = seatRows.reduce((sum, item) => sum + Number(item.noofseats || 0), 0);
  const subjectFilter = {};
  subjectFilter[type] = subject;
  const admitted = await User.countDocuments({
    colid,
    role: { $regex: /^student$/i },
    admissionyear: academicyear,
    programcode,
    category,
    samestate,
    ...subjectFilter
  });

  return {
    subject,
    type,
    totalSeats,
    admitted,
    availableSeats: Math.max(totalSeats - admitted, 0)
  };
};

const getCapacity = async ({ colid, academicyear, regulation, programcode, category, samestate, major, minor }) => {
  const majorCapacity = await getSubjectCapacity({
    colid,
    academicyear,
    regulation,
    programcode,
    category,
    samestate,
    subject: major,
    type: "Major"
  });

  const minorCapacity = minor
    ? await getSubjectCapacity({
        colid,
        academicyear,
        regulation,
        programcode,
        category,
        samestate,
        subject: minor,
        type: "Minor"
      })
    : null;

  return {
    major: majorCapacity,
    minor: minorCapacity
  };
};

exports.getDynamicAdmissionToUserOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const [applications, dynamicFields, regulations] = await Promise.all([
      AdmissionApplication.find({ colid, applicationstatus: "Applied" })
        .select("academicyear programapplied programcode category")
        .lean(),
      AdmissionFormField.find({ colid, isactive: "Yes" }).sort({ order: 1, label: 1 }).lean(),
      RegulationMaster.find({ colid, isactive: "Yes" }).sort({ regulation: 1 }).lean()
    ]);

    const programMap = new Map();
    const yearSet = new Set();
    applications.forEach((item) => {
      if (item.academicyear) yearSet.add(item.academicyear);
      if (item.programcode) {
        programMap.set(item.programcode, {
          programcode: item.programcode,
          program: item.programapplied || item.programcode
        });
      }
    });

    res.json({
      success: true,
      academicyears: Array.from(yearSet).sort(),
      programs: Array.from(programMap.values()).sort((a, b) => String(a.program).localeCompare(String(b.program))),
      categories,
      subjectTypes,
      semesters,
      dynamicFields,
      regulations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchDynamicAdmissionApplicants = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = buildSearchQuery({ ...req.body, colid });
    const data = await AdmissionApplication.find(query).sort({ createdAt: -1 }).limit(200).lean();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRegulationsForAdmission = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const academicyear = clean(req.query.academicyear);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    let regulationNames = [];
    if (academicyear) {
      regulationNames = await RegulationSubject.distinct("regulation", { colid, academicyear });
    }

    const masterQuery = { colid, isactive: "Yes" };
    if (regulationNames.length) masterQuery.regulation = { $in: regulationNames };
    const regulations = await RegulationMaster.find(masterQuery).sort({ regulation: 1 }).lean();
    res.json({ success: true, data: regulations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAdmissionSubjectOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const academicyear = clean(req.query.academicyear);
    const regulation = clean(req.query.regulation);
    const programcode = clean(req.query.programcode);
    const type = clean(req.query.type);
    if (colid === undefined || !academicyear || !regulation || !programcode || !type) {
      return res.status(400).json({ success: false, message: "colid, academic year, regulation, program and type are required" });
    }

    const data = await RegulationSubject.find({
      colid,
      academicyear,
      regulation,
      programcode,
      type,
      status: "Active"
    }).sort({ subject: 1 }).lean();

    res.json({ success: true, data: data.map((item) => item.subject).filter(Boolean) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkAdmissionMajorCapacity = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const payload = {
      colid,
      academicyear: clean(req.body.academicyear),
      regulation: clean(req.body.regulation),
      programcode: clean(req.body.programcode),
      category: clean(req.body.category),
      samestate: clean(req.body.samestate),
      major: clean(req.body.major),
      minor: clean(req.body.minor)
    };
    if (colid === undefined || !payload.academicyear || !payload.regulation || !payload.programcode || !payload.category || !payload.samestate || !payload.major) {
      return res.status(400).json({ success: false, message: "All capacity fields are required" });
    }

    const capacity = await getCapacity(payload);
    res.json({ success: true, data: capacity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.admitDynamicApplicantToUser = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const applicationId = clean(req.body.applicationId);
    const userData = req.body.userData || {};
    if (colid === undefined || !applicationId) {
      return res.status(400).json({ success: false, message: "colid and application id are required" });
    }

    const application = await AdmissionApplication.findOne({ _id: applicationId, colid });
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    if (application.applicationstatus !== "Applied") {
      return res.status(400).json({ success: false, message: `Application status is ${application.applicationstatus}` });
    }

    const finalUser = {
      name: clean(userData.name || application.name),
      email: clean(userData.email || application.email).toLowerCase(),
      phone: clean(userData.phone || application.phone),
      password: clean(userData.password || "Password@123"),
      role: "Student",
      regno: clean(userData.regno),
      programcode: clean(userData.programcode || application.programcode),
      admissionyear: clean(userData.admissionyear || application.academicyear),
      semester: clean(userData.semester || "1"),
      section: clean(userData.section),
      gender: clean(userData.gender || application.gender),
      department: clean(userData.department || getProgramName(application)),
      category: clean(userData.category || application.category),
      address: clean(userData.address || application.address),
      status: Number(userData.status || 1),
      colid,
      user: clean(userData.user),
      addedby: clean(userData.addedby || userData.user),
      institution: clean(userData.institution),
      regulation: clean(userData.regulation),
      samestate: clean(userData.samestate || "Yes"),
      admissionapplicationid: applicationId,
      Major: clean(userData.Major),
      Minor: clean(userData.Minor),
      AEC: clean(userData.AEC),
      SEC: clean(userData.SEC),
      VAC: clean(userData.VAC),
      IDC: clean(userData.IDC)
    };

    const requiredFields = ["name", "email", "phone", "password", "role", "regno", "programcode", "admissionyear", "semester", "section", "department", "colid", "status"];
    const missing = requiredFields.filter((field) => !finalUser[field] && finalUser[field] !== 0);
    if (missing.length) return res.status(400).json({ success: false, message: "Required user fields are missing", missingRequiredFields: missing });
    if (finalUser.Major && finalUser.Minor && finalUser.Major === finalUser.Minor) {
      return res.status(400).json({ success: false, message: "Major and Minor cannot be the same subject" });
    }

    const existing = await User.findOne({ email: finalUser.email });
    if (existing) return res.status(409).json({ success: false, message: "User already exists with this email" });

    const capacity = await getCapacity({
      colid,
      academicyear: finalUser.admissionyear,
      regulation: finalUser.regulation,
      programcode: finalUser.programcode,
      category: finalUser.category,
      samestate: finalUser.samestate,
      major: finalUser.Major,
      minor: finalUser.Minor
    });
    if (capacity.major.availableSeats <= 0) {
      return res.status(400).json({ success: false, message: "Admission not available. No seats left.", capacity });
    }
    if (capacity.minor && capacity.minor.availableSeats <= 0) {
      return res.status(400).json({ success: false, message: "Admission not available. No minor seats left.", capacity });
    }

    const createdUser = await User.create(finalUser);
    application.applicationstatus = "Admitted";
    await application.save();

    res.status(201).json({
      success: true,
      message: "Student admitted and user created",
      data: createdUser,
      capacity: {
        ...capacity,
        major: {
          ...capacity.major,
          admitted: capacity.major.admitted + 1,
          availableSeats: Math.max(capacity.major.availableSeats - 1, 0)
        },
        minor: capacity.minor
          ? {
              ...capacity.minor,
              admitted: capacity.minor.admitted + 1,
              availableSeats: Math.max(capacity.minor.availableSeats - 1, 0)
            }
          : null
      }
    });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: "User already exists with this email" });
    res.status(500).json({ success: false, message: error.message });
  }
};
