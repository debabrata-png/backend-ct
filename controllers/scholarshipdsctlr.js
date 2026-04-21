// scholarshipdsctlr.js
const Scholarshipds = require("../Models/scholarshipds");

// Create Scholarship Endpoint
exports.createscholarshipds = async (req, res) => {
  try {
    const { name, user, colid, scholarshipname, amount, category, program, programcode, startdate, enddate } = req.body;
    const newScholarship = await Scholarshipds.create({
      name,
      user,
      colid: parseInt(colid),
      scholarshipname,
      amount,
      category,
      program,
      programcode,
      startdate,
      enddate
    });
    res.status(200).json({ success: true, scholarship: newScholarship });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating scholarship", error: error.message });
  }
};

exports.getallscholarshipds = async (req, res) => {
  try {
    const { colid } = req.query;
    if (colid) {
      const scholarships = await Scholarshipds.find({ colid: parseInt(colid) });
      return res.status(200).json({ success: true, scholarships });
    }
    res.status(200).json({ success: true, scholarships: []  }); // Return empty if no colid
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching scholarships", error: error.message });
  }
};


// Filter Scholarships Endpoint (for applications)
exports.filterscholarshipds = async (req, res) => {
  try {
    const { category, programcode, colid } = req.query;
    const filteredScholarships = await Scholarshipds.find({
      category,
      programcode,
      colid: parseInt(colid),
    });
    res.status(200).json({ success: true, scholarships: filteredScholarships });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error filtering scholarships", error: error.message });
  }
};

// Edit Scholarship - POST (not PUT), data from req.body, id from req.query
exports.editscholarshipds = async (req, res) => {
  try {
    const { id } = req.query;
    // Only allow fields to be updated that make sense
    const update = req.body;
    const updatedScholarship = await Scholarshipds.findByIdAndUpdate(id, update, { new: true });
    if (!updatedScholarship)
      return res.status(404).json({ success: false, message: "Scholarship not found" });
    res.status(200).json({ success: true, scholarship: updatedScholarship });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating scholarship", error: error.message });
  }
};

// Delete Scholarship - GET (not DELETE), id from req.query
exports.deletescholarshipds = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedScholarship = await Scholarshipds.findByIdAndDelete(id);
    if (!deletedScholarship)
      return res.status(404).json({ success: false, message: "Scholarship not found" });
    res.status(200).json({ success: true, scholarship: deletedScholarship });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting scholarship", error: error.message });
  }
};
