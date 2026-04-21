const ExamMarks1 = require('../Models/exammarks1ds.js');

// Create papers/structure
exports.createexammarks1ds = async (req, res) => {
    try {
        // Ensure colid is Number
        if (req.body.colid) {
            req.body.colid = Number(req.body.colid);
        }
        const entry = await ExamMarks1.create(req.body);
        res.status(201).json(entry);
    } catch (err) {
        // res.status(400).json({ error: err.message });
    }
};

// List structures
exports.listexammarks1ds = async (req, res) => {
    try {
        // Build query with colid filter
        const query = { ...req.query };
        if (query.colid) {
            query.colid = Number(query.colid);
        }
        const list = await ExamMarks1.find(query);
        res.status(200).json(list);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Edit structure (POST)
exports.editexammarks1ds = async (req, res) => {
    try {
        const { _id, ...updateFields } = req.body;
        // Ensure colid is Number
        if (updateFields.colid) {
            updateFields.colid = Number(updateFields.colid);
        }
        const updated = await ExamMarks1.findByIdAndUpdate(_id, updateFields, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        // res.status(400).json({ error: err.message });
    }
};

// Delete structure (GET)
exports.deleteexammarks1ds = async (req, res) => {
    try {
        const { _id } = req.query;
        await ExamMarks1.findByIdAndDelete(_id);
        res.status(200).json({ success: true });
    } catch (err) {
        // res.status(400).json({ error: err.message });
    }
};

