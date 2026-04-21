const ExamMarks2 = require('../Models/exammarks2ds.js');
const User = require('../Models/user.js');

// Create (marks entry)
exports.createexammarks2ds = async (req, res) => {
  try {
    const entry = await ExamMarks2.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    // res.status(400).json({ error: err.message });
  }
};

// List (marks entry)
exports.listexammarks2ds = async (req, res) => {
  try {
    const list = await ExamMarks2.find(req.query);
    res.status(200).json(list);
  } catch (err) {
    // res.status(500).json({ error: err.message });
  }
};

// Edit (POST)
exports.editexammarks2ds = async (req, res) => {
  try {
    const { _id, ...updateFields } = req.body;
    const updated = await ExamMarks2.findByIdAndUpdate(_id, updateFields, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    // res.status(400).json({ error: err.message });
  }
};

// Delete (GET)
exports.deleteexammarks2ds = async (req, res) => {
  try {
    const { _id } = req.query;
    await ExamMarks2.findByIdAndDelete(_id);
    res.status(200).json({ success: true });
  } catch (err) {
    // res.status(400).json({ error: err.message });
  }
};

exports.getstudentds = async (req, res) => {
  try {
    const { colid, regno } = req.query;
    if (!colid || !regno) return res.status(400).json({ error: "colid and regno required" });
    const student = await User.findOne({ colid, regno });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    // res.status(500).json({ error: err.message });
  }
}
