const AdmissionApplication = require("../Models/admissionapplicationdynamic");
const AdmissionFormField = require("../Models/admissionformfield");
const RegulationMaster = require("../Models/regulationmasterds");
const RegulationSubject = require("../Models/regulationsubjectds");
const RegulationSeat = require("../Models/regulationseatds");
const User = require("../Models/user");
const AiConfiguration = require("../Models/aiconfigurationds");
const EmailConfiguration = require("../Models/emailconfigurationds");
const nodemailer = require("nodemailer");

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

const getDefaultGeminiConfig = async (colid) => (
  await AiConfiguration.findOne({ colid: Number(colid), type: /^gemini$/i, active: /^yes$/i, default: /^yes$/i }).sort({ _id: -1 }).lean()
  || await AiConfiguration.findOne({ colid: Number(colid), type: /^gemini$/i, active: /^yes$/i }).sort({ _id: -1 }).lean()
);

const getEmailHost = (config = {}) => {
  if (config.smtp) return config.smtp;
  if (config.smptp) return config.smptp;
  if (/gmail/i.test(config.provider || "")) return "smtp.gmail.com";
  return "";
};

const createMailTransporter = (config) => {
  const port = Number(config.port) || (/gmail/i.test(config.provider || "") ? 465 : 587);
  return nodemailer.createTransport({
    host: getEmailHost(config),
    port,
    secure: String(config.secure || "").toLowerCase() === "yes" || String(config.secure || "").toLowerCase() === "true" || port === 465,
    auth: {
      user: config.username,
      pass: config.password
    }
  });
};

const getAdmissionEmailConfig = async (colid) => {
  const activeQuery = { colid: Number(colid), isactive: /^yes$/i };
  return (
    await EmailConfiguration.findOne({ ...activeQuery, provider: /^gmail$/i, type: /^admission$/i, default: /^yes$/i }).sort({ updatedAt: -1, createdAt: -1 }).lean()
    || await EmailConfiguration.findOne({ ...activeQuery, provider: /^gmail$/i, type: /^admission$/i }).sort({ updatedAt: -1, createdAt: -1 }).lean()
    || await EmailConfiguration.findOne({ ...activeQuery, default: /^yes$/i }).sort({ updatedAt: -1, createdAt: -1 }).lean()
    || await EmailConfiguration.findOne(activeQuery).sort({ updatedAt: -1, createdAt: -1 }).lean()
  );
};

const escapeHtml = (value) => clean(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

const sendAdmissionWelcomeMail = async ({ colid, student, password, institution }) => {
  try {
    if (!student?.email) return { sent: false, reason: "Student email missing" };
    const config = await getAdmissionEmailConfig(colid);
    if (!config?.username || !config?.password || !getEmailHost(config)) {
      return { sent: false, reason: "Active email configuration is missing or incomplete" };
    }

    const transporter = createMailTransporter(config);
    const displayInstitution = institution || student.institution || "Institution";
    const subject = `Welcome to ${displayInstitution}`;
    const text = [
      `Dear ${student.name || "Student"},`,
      "",
      `Your admission has been confirmed and your student login has been created.`,
      "",
      `Username: ${student.email}`,
      `Password: ${password}`,
      `Registration No: ${student.regno || ""}`,
      `Program: ${student.department || student.programcode || ""}`,
      "",
      "Please keep these credentials safely and change your password after login if the system provides that option.",
      "",
      "This is an automated email."
    ].join("\n");
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">
        <p>Dear ${escapeHtml(student.name || "Student")},</p>
        <p>Your admission has been confirmed and your student login has been created.</p>
        <table style="border-collapse:collapse;margin:12px 0">
          <tr><td style="padding:7px 10px;border:1px solid #d1d5db"><b>Username</b></td><td style="padding:7px 10px;border:1px solid #d1d5db">${escapeHtml(student.email)}</td></tr>
          <tr><td style="padding:7px 10px;border:1px solid #d1d5db"><b>Password</b></td><td style="padding:7px 10px;border:1px solid #d1d5db">${escapeHtml(password)}</td></tr>
          <tr><td style="padding:7px 10px;border:1px solid #d1d5db"><b>Registration No</b></td><td style="padding:7px 10px;border:1px solid #d1d5db">${escapeHtml(student.regno)}</td></tr>
          <tr><td style="padding:7px 10px;border:1px solid #d1d5db"><b>Program</b></td><td style="padding:7px 10px;border:1px solid #d1d5db">${escapeHtml(student.department || student.programcode)}</td></tr>
        </table>
        <p>Please keep these credentials safely and change your password after login if the system provides that option.</p>
        <p style="font-size:12px;color:#6b7280">This is an automated email.</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${displayInstitution}" <${config.username}>`,
      to: student.email,
      subject,
      text,
      html
    });

    return { sent: true };
  } catch (error) {
    console.error("Admission welcome mail failed:", error.message);
    return { sent: false, reason: error.message };
  }
};

const callGeminiJson = async (apikey, prompt) => {
  const models = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
  let lastError = "";
  for (const model of models) {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apikey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
      })
    });
    const data = await response.json();
    if (response.ok) {
      const output = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "{}";
      try {
        return JSON.parse(output);
      } catch (err) {
        return { registrationNumber: clean(output).split(/\s+/)[0] || "" };
      }
    }
    lastError = data.error?.message || `Gemini API request failed for ${model}`;
  }
  throw new Error(lastError || "Gemini API request failed");
};

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

exports.generateRegistrationNumber = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const rule = clean(req.body.rule);
    const application = req.body.application || {};
    const userData = req.body.userData || {};
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!rule) return res.status(400).json({ success: false, message: "Registration rule is required" });
    const admissionyear = clean(userData.admissionyear || application.academicyear);
    const programcode = clean(req.body.programcode || userData.programcode || application.programcode);
    if (!admissionyear || !programcode) {
      return res.status(400).json({ success: false, message: "Academic year and program code are required to generate registration number" });
    }

    const aiConfig = await getDefaultGeminiConfig(colid);
    if (!aiConfig?.apikey) {
      return res.status(400).json({ success: false, message: "Active/default Gemini AI configuration was not found" });
    }

    const effectiveApplication = { ...application, programcode };
    const effectiveUserData = { ...userData, programcode };

    const existingRegnos = await User.find({ colid, role: { $regex: /^student$/i }, admissionyear, programcode })
      .select("regno admissionyear programcode department")
      .sort({ createdAt: -1, _id: -1 })
      .limit(100)
      .lean();
    const admittedCount = await User.countDocuments({
      colid,
      role: { $regex: /^student$/i },
      admissionyear,
      programcode
    });
    const sequence = String(admittedCount + 1).padStart(4, "0");

    const prompt = `
You generate student registration numbers. Return ONLY JSON:
{
  "registrationNumber": "the registration number base without the final four digit running sequence",
  "reason": "short explanation"
}

Rule:
${rule}

Use the rule exactly. Use the application and user data below. Do not add the final four digit running sequence. The system will append this sequence separately: ${sequence}. Return only the registration number base, no spaces unless the rule explicitly requires spaces.

Program code selected in the Program Code textbox. This is authoritative:
${programcode}

Admitted student count for this academic year and program code:
${admittedCount}

Final four digit sequence to be appended:
${sequence}

Application data:
${JSON.stringify(effectiveApplication, null, 2)}

User form data:
${JSON.stringify(effectiveUserData, null, 2)}

Recent existing registration records:
${JSON.stringify(existingRegnos, null, 2)}
`;

    const result = await callGeminiJson(aiConfig.apikey, prompt);
    const registrationBase = clean(result.registrationNumber || result.regno || result.registrationno || result.registrationNumberGenerated).replace(/\d{4}$/, "");
    if (!registrationBase) {
      return res.status(400).json({ success: false, message: "Gemini did not return a registration number", data: result });
    }
    const registrationNumber = `${registrationBase}${sequence}`;
    res.json({ success: true, registrationNumber, sequence, admittedCount, reason: result.reason || "" });
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
    application.regno = finalUser.regno;
    await application.save();
    const welcomeMail = await sendAdmissionWelcomeMail({
      colid,
      student: createdUser,
      password: finalUser.password,
      institution: finalUser.institution
    });

    res.status(201).json({
      success: true,
      message: welcomeMail.sent
        ? "Student admitted, user created and welcome mail sent"
        : `Student admitted and user created. Welcome mail not sent: ${welcomeMail.reason || "Email configuration unavailable"}`,
      data: createdUser,
      welcomeMail,
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
