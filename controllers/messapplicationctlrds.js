const messapplicationds = require("../Models/messapplicationds");
const hostelbedallocation = require("../Models/hostelbedallocation");

// Create Mess Application
exports.createmessapplicationds = async (req, res) => {
  try {
    const { regno, colid } = req.body;
    
    // Get student's building
    const allocation = await hostelbedallocation.findOne({ 
      regno, 
      colid: parseInt(colid) 
    });
    
    if (!allocation) {
      return res.status(404).json({ 
        success: false, 
        message: "Student not allocated to any building" 
      });
    }
    
    // Check if already applied for this month
    const existing = await messapplicationds.findOne({
      regno,
      colid: parseInt(colid),
      applicationmonth: req.body.applicationmonth,
      buildingname: allocation.buildingname
    });
    
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: "Application already submitted for this month" 
      });
    }
    
    const application = await messapplicationds.create({
      ...req.body,
      buildingname: allocation.buildingname
    });
    
    return res.status(201).json({ success: true, data: application });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Mess Applications by Regno
exports.getmessapplicationds = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    const applications = await messapplicationds.find({ 
      regno,
      colid: parseInt(colid) 
    }).sort({ createdAt: -1 });
    
    return res.status(200).json({ success: true, data: applications });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Mess Applications for Manager
exports.getallmessapplicationds = async (req, res) => {
  try {
    const { buildingname, colid, appstatus } = req.query;
    
    const filter = {
      buildingname,
      colid: parseInt(colid)
    };
    
    if (appstatus) {
      filter.appstatus = appstatus;
    }
    
    const applications = await messapplicationds.find(filter).sort({ createdAt: -1 });
    
    return res.status(200).json({ success: true, data: applications });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Approve/Reject Mess Application
exports.updatemessapplicationds = async (req, res) => {
  try {
    const { id, appstatus, rejectionreason, approvedby } = req.body;
    
    const updateData = {
      appstatus,
      approvedby
    };
    
    if (appstatus === 'Approved') {
      updateData.approvaldate = new Date();
    } else if (appstatus === 'Rejected') {
      updateData.rejectionreason = rejectionreason;
    }
    
    const application = await messapplicationds.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    return res.status(200).json({ 
      success: true, 
      message: `Application ${appstatus.toLowerCase()} successfully`,
      data: application 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Mess Application
exports.deletemessapplicationds = async (req, res) => {
  try {
    const { id } = req.params;
    await messapplicationds.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
