const Lead = require("../Models/crmh1");
const User = require("../Models/user");

const userRequiredFields = [
  "name",
  "email",
  "phone",
  "password",
  "role",
  "regno",
  "programcode",
  "admissionyear",
  "semester",
  "section",
  "department",
  "colid",
  "status"
];

const escapeRegex = (value = "") => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== "";

const buildUserDataFromLead = (lead, overrides = {}) => {
  const leadObj = lead.toObject ? lead.toObject() : lead;

  return {
    name: leadObj.name || "",
    email: leadObj.email || "",
    phone: leadObj.phone || "",
    password: "Password@123",
    role: "Student",
    regno: "",
    programcode: leadObj.program || leadObj.course_interested || "",
    admissionyear: leadObj.expected_admission_year || leadObj.year || "",
    semester: "1",
    section: "",
    gender: "",
    department: leadObj.category || leadObj.program_type || "",
    category: leadObj.category || "",
    address: leadObj.address || "",
    user: leadObj.user || "",
    addedby: overrides.addedby || leadObj.user || "",
    status: 1,
    colid: leadObj.colid,
    fathername: "",
    mothername: "",
    dob: "",
    scholarship: leadObj.scholarship_interest || "",
    institution: leadObj.institution || "",
    ...overrides
  };
};

const getMissingRequiredFields = (data) =>
  userRequiredFields.filter((field) => !hasValue(data[field]));

exports.searchCrmLeadsForUserds = async (req, res) => {
  try {
    const {
      colid,
      search,
      name,
      email,
      phone,
      category,
      course_interested,
      program,
      pipeline_stage,
      leadstatus
    } = req.query;

    if (!colid) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const query = { colid: Number(colid) };

    if (search) {
      const pattern = { $regex: escapeRegex(search), $options: "i" };
      query.$or = [
        { name: pattern },
        { email: pattern },
        { phone: pattern },
        { category: pattern },
        { course_interested: pattern },
        { program: pattern }
      ];
    }

    if (name) query.name = { $regex: escapeRegex(name), $options: "i" };
    if (email) query.email = { $regex: escapeRegex(email), $options: "i" };
    if (phone) query.phone = { $regex: escapeRegex(phone), $options: "i" };
    if (category) query.category = { $regex: escapeRegex(category), $options: "i" };
    if (course_interested) query.course_interested = { $regex: escapeRegex(course_interested), $options: "i" };
    if (program) query.program = { $regex: escapeRegex(program), $options: "i" };
    if (pipeline_stage) query.pipeline_stage = pipeline_stage;
    if (leadstatus) query.leadstatus = leadstatus;

    const leads = await Lead.find(query)
      .sort({ updatedAt: -1 })
      .limit(50)
      .lean();

    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error searching CRM leads", error: error.message });
  }
};

exports.getLeadUserPrefillds = async (req, res) => {
  try {
    const { lead_id } = req.query;

    if (!lead_id) {
      return res.status(400).json({ success: false, message: "lead_id is required" });
    }

    const lead = await Lead.findById(lead_id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    const userData = buildUserDataFromLead(lead);

    res.status(200).json({
      success: true,
      data: {
        lead,
        userData,
        missingRequiredFields: getMissingRequiredFields(userData)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error preparing lead data", error: error.message });
  }
};

exports.createUserFromLeadds = async (req, res) => {
  try {
    const { lead_id, userData = {} } = req.body;

    if (!lead_id) {
      return res.status(400).json({ success: false, message: "lead_id is required" });
    }

    const lead = await Lead.findById(lead_id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    const finalUserData = buildUserDataFromLead(lead, userData);
    finalUserData.colid = Number(finalUserData.colid);
    finalUserData.status = Number(finalUserData.status || 1);

    const missingRequiredFields = getMissingRequiredFields(finalUserData);
    if (missingRequiredFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Required user fields are missing",
        missingRequiredFields
      });
    }

    const existingUser = await User.findOne({ email: finalUserData.email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists with this email" });
    }

    const createdUser = await User.create(finalUserData);

    lead.leadstatus = "Converted";
    lead.pipeline_stage = "Admission Done";
    await lead.save();

    res.status(201).json({
      success: true,
      message: "Lead data inserted into user model successfully",
      data: createdUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user from lead", error: error.message });
  }
};
