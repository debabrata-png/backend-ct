const gatewaypassds = require("../Models/gatewaypassds");
const parentdetailsds = require("../Models/parentdetailsds");
const crypto = require("crypto");

// Create Gateway Pass Application
exports.creategatewaypassds = async (req, res) => {
  try {
    const { regno, colid } = req.body;
    
    // Get parent email from parent details
    const parentdetails = await parentdetailsds.findOne({ regno, colid });
    
    if (!parentdetails) {
      return res.status(404).json({ 
        success: false, 
        message: "Parent details not found. Please contact warden." 
      });
    }
    
    // Generate unique approval token
    const approvaltoken = crypto.randomBytes(32).toString('hex');
    
    const gatewaypass = await gatewaypassds.create({
      ...req.body,
      parentemail: parentdetails.email,
      approvaltoken
    });
    
    // Return just the token, frontend will create the link
    return res.status(201).json({ 
      success: true, 
      data: gatewaypass,
      token: approvaltoken // Just send token to frontend
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Gateway Pass Applications by Regno
exports.getgatewaypassds = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    const applications = await gatewaypassds.find({ 
      regno,
      colid: parseInt(colid) 
    }).sort({ createdAt: -1 });
    
    return res.status(200).json({ success: true, data: applications });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Gateway Pass Applications for Warden
exports.getallgatewaypassds = async (req, res) => {
  try {
    const { colid } = req.query;
    const applications = await gatewaypassds.find({ 
      colid: parseInt(colid),
      parentstatus: 'Approved',
      wardenstatus: 'Pending'
    }).sort({ createdAt: -1 });
    
    return res.status(200).json({ success: true, data: applications });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Gateway Pass by Token (for parent approval)
exports.getgatewaypassbytoken = async (req, res) => {
  try {
    const { token } = req.params;
    const application = await gatewaypassds.findOne({ approvaltoken: token });
    
    if (!application) {
      return res.status(404).json({ success: false, message: "Invalid or expired link" });
    }
    
    return res.status(200).json({ success: true, data: application });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Parent Approval
exports.parentapprovalds = async (req, res) => {
  try {
    const { token, status, reason } = req.body;
    
    const application = await gatewaypassds.findOne({ approvaltoken: token });
    
    if (!application) {
      return res.status(404).json({ success: false, message: "Invalid or expired link" });
    }
    
    if (application.parentstatus !== 'Pending') {
      return res.status(400).json({ 
        success: false, 
        message: "This application has already been processed" 
      });
    }
    
    application.parentstatus = status;
    application.parentapprovaldate = new Date();
    
    if (status === 'Rejected') {
      application.overallstatus = 'Rejected';
      application.parentrejectionreason = reason;
    }
    
    await application.save();
    
    return res.status(200).json({ 
      success: true, 
      message: `Application ${status.toLowerCase()} successfully`,
      data: application 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Warden Approval
exports.wardenapprovalds = async (req, res) => {
  try {
    const { id, status, reason } = req.body;
    
    const application = await gatewaypassds.findById(id);
    
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    
    if (application.parentstatus !== 'Approved') {
      return res.status(400).json({ 
        success: false, 
        message: "Parent approval is required first" 
      });
    }
    
    application.wardenstatus = status;
    application.wardenapprovaldate = new Date();
    
    if (status === 'Approved') {
      application.overallstatus = 'Approved';
    } else if (status === 'Rejected') {
      application.overallstatus = 'Rejected';
      application.wardenrejectionreason = reason;
    }
    
    await application.save();
    
    return res.status(200).json({ 
      success: true, 
      message: `Application ${status.toLowerCase()} successfully`,
      data: application 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
