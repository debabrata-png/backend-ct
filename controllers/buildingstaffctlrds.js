const buildingstaffds = require("../Models/buildingstaffds");
const hostelmodel = require("../Models/hostelmodel");
const hostelbedallocation = require("../Models/hostelbedallocation");
const Ledgerstud = require("../Models/ledgerstud");

// Add/Configure Building Staff
exports.addbuildingstaffds = async (req, res) => {
  try {
    // Check if already exists
    const existing = await buildingstaffds.findOne({
      buildingname: req.body.buildingname,
      colid: req.body.colid
    });

    if (existing) {
      // Update existing
      const updated = await buildingstaffds.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );
      return res.status(200).json({ success: true, data: updated });
    }

    const staffconfig = await buildingstaffds.create(req.body);
    return res.status(201).json({ success: true, data: staffconfig });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Building Staff Config
exports.getbuildingstaffds = async (req, res) => {
  try {
    const { colid } = req.query;
    const staffconfigs = await buildingstaffds.find({ 
      colid: parseInt(colid) 
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: staffconfigs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Building Staff by Building Name
exports.getbuildingstaffbyname = async (req, res) => {
  try {
    const { buildingname, colid } = req.query;
    const staffconfig = await buildingstaffds.findOne({ 
      buildingname,
      colid: parseInt(colid) 
    });
    
    if (!staffconfig) {
      return res.status(404).json({ success: false, message: "Configuration not found" });
    }
    
    return res.status(200).json({ success: true, data: staffconfig });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update Building Staff
exports.updatebuildingstaffds = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await buildingstaffds.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Building Staff
exports.deletebuildingstaffds = async (req, res) => {
  try {
    const { id } = req.params;
    await buildingstaffds.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Add Mess Fee for All Students in Building (Bulk)
exports.addbulkmessfeeds = async (req, res) => {
  try {
    const { buildingname, colid, messfeepermonth, feeitem, feecategory, academicyear, user, username } = req.body;

    // Get all students in this building
    const allocations = await hostelbedallocation.find({
      buildingname,
      colid: parseInt(colid)
    });

    if (allocations.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No students found in this building" 
      });
    }

    // Create ledger entries for all students
    const ledgerEntries = [];
    for (const allocation of allocations) {
      const ledgerEntry = {
        name: `Mess Fee - ${buildingname}`,
        user: user,
        feegroup: feecategory || "Mess",
        regno: allocation.regno,
        student: allocation.student,
        feeitem: feeitem || "Monthly Mess Fee",
        amount: messfeepermonth,
        type: "Debit",
        feecategory: feecategory || "Mess",
        academicyear: academicyear,
        colid: parseInt(colid),
        createdby: username
      };
      ledgerEntries.push(ledgerEntry);
    }

    // Bulk insert ledger entries
    const result = await Ledgerstud.insertMany(ledgerEntries);

    return res.status(201).json({ 
      success: true, 
      message: `Mess fee added for ${result.length} students`,
      data: result 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
