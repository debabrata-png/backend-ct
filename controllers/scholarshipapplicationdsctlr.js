// scholarshipapplicationdsctlr.js
const ScholarshipApplicationds = require("../Models/scholarshipapplicationds");

// Create Scholarship Application
exports.createscholarshipapplicationds = async (req, res) => {
  try {
    const {
      name,
      user,
      colid,
      scholarshipname,
      applicantname,
      applicantemail,
      regno,
      applicantphone,
      category,
      program,
      programcode,
      address,
    } = req.body;

    const newApplication = await ScholarshipApplicationds.create({
      name,
      user,
      colid: parseInt(colid),
      scholarshipname,
      applicantname,
      applicantemail,
      regno,
      applicantphone,
      category,
      program,
      programcode,
      address,
    });
    res.status(200).json({ success: true, application: newApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating application", error: error.message });
  }
};

// Get All Applications or Filter by Scholarship
exports.getscholarshipapplicationds = async (req, res) => {
  try {
    const { scholarshipname, colid } = req.query;
    let filter = {};
    if (scholarshipname) filter.scholarshipname = scholarshipname;

    const applications = await ScholarshipApplicationds.find({
      ...filter,
      colid: parseInt(colid),
    });
    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching applications", error: error.message });
  }
};

// Approve/Reject Application (uses POST instead of PUT)
exports.updatescholarshipapplicationds = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    // Status must be 'approved' or 'rejected'
    const updated = await ScholarshipApplicationds.findByIdAndUpdate(applicationId, { status }, { new: true });
    res.status(200).json({ success: true, application: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating application status", error: error.message });
  }
};
