const ExamMarks1 = require('../Models/exammarks1ds.js');

// Create papers/structure
exports.createexammarks1ds = async (req, res) => {
  try {
    const entry = await ExamMarks1.create(req.body);
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List structures
exports.listexammarks1ds = async (req, res) => {
  try {
    const list = await ExamMarks1.find(req.query);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit structure (POST)
exports.editexammarks1ds = async (req, res) => {
  try {
    const { _id, ...updateFields } = req.body;
    const updated = await ExamMarks1.findByIdAndUpdate(_id, updateFields, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete structure (GET)
exports.deleteexammarks1ds = async (req, res) => {
  try {
    const { _id } = req.query;
    await ExamMarks1.findByIdAndDelete(_id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
