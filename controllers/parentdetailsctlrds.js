const parentdetailsds = require("../Models/parentdetailsds");
const User = require("../Models/user");

// Add Parent Details
exports.addparentdetailsds = async (req, res) => {
  try {
    const parentdetails = await parentdetailsds.create(req.body);
    return res.status(201).json({ success: true, data: parentdetails });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Parent Details by colid
exports.getparentdetailsds = async (req, res) => {
  try {
    const { colid } = req.query;
    const parentdetails = await parentdetailsds.find({ 
      colid: parseInt(colid) 
    }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: parentdetails });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get Parent Details by Regno
exports.getparentbyregno = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    const parentdetails = await parentdetailsds.findOne({ 
      regno: regno,
      colid: parseInt(colid)
    });
    
    if (!parentdetails) {
      return res.status(404).json({ success: false, message: "Parent details not found" });
    }
    
    return res.status(200).json({ success: true, data: parentdetails });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Update Parent Details
exports.updateparentdetailsds = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await parentdetailsds.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Parent Details
exports.deleteparentdetailsds = async (req, res) => {
  try {
    const { id } = req.params;
    await parentdetailsds.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Search Students
exports.searchstudentsds = async (req, res) => {
  try {
    const { query, colid } = req.query;
    const students = await User.find({
      colid: parseInt(colid),
      $or: [
        { name: { $regex: query, $options: "i" } },
        { regno: { $regex: query, $options: "i" } }
      ]
    }).limit(10);
    
    return res.status(200).json({ success: true, data: students });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
