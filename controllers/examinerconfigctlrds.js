const ExaminerConfigds = require('../Models/examinerconfigds.js');

// Create examiner configuration
exports.createexaminerconfigds = async (req, res) => {
    try {
        // Ensure colid is Number
        if (req.body.colid) {
            req.body.colid = Number(req.body.colid);
        }
        const entry = await ExaminerConfigds.create(req.body);
        res.status(201).json(entry);
    } catch (err) {
        // res.status(400).json({ error: err.message });
    }
};

// List examiner configurations
exports.listexaminerconfigds = async (req, res) => {
    try {
        // Build query with colid filter
        const query = { ...req.query };
        if (query.colid) {
            query.colid = Number(query.colid);
        }
        const list = await ExaminerConfigds.find(query);
        res.status(200).json(list);
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};

// Edit examiner configuration (POST)
exports.editexaminerconfigds = async (req, res) => {
    try {
        const { _id, ...updateFields } = req.body;
        // Ensure colid is Number
        if (updateFields.colid) {
            updateFields.colid = Number(updateFields.colid);
        }
        const updated = await ExaminerConfigds.findByIdAndUpdate(_id, updateFields, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        // res.status(400).json({ error: err.message });
    }
};

// Delete examiner configuration (GET)
exports.deleteexaminerconfigds = async (req, res) => {
    try {
        const { _id } = req.query;
        await ExaminerConfigds.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
};
