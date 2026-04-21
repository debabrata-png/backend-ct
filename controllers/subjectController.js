const Subject = require('../Models/Subject');
const MPrograms = require('../Models/mprograms');

// Create a subject
exports.createSubject = async (req, res) => {
    try {
        const { name, user, colid, subjectName, fullName, programName } = req.body;
        if (!colid || !subjectName || !programName) {
            return res.status(400).json({ success: false, error: 'colid, subjectName, and programName are required' });
        }
        const subject = await Subject.create({ name, user, colid: Number(colid), subjectName, fullName, programName });
        res.status(201).json({ success: true, data: subject });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all subjects (optionally filter by colid)
exports.getAllSubjects = async (req, res) => {
    try {
        const filter = {};
        if (req.query.colid) filter.colid = Number(req.query.colid);
        const subjects = await Subject.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get subject by ID
exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ success: false, error: 'Subject not found' });
        res.status(200).json({ success: true, data: subject });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a subject
exports.updateSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!subject) return res.status(404).json({ success: false, error: 'Subject not found' });
        res.status(200).json({ success: true, data: subject });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        if (!subject) return res.status(404).json({ success: false, error: 'Subject not found' });
        res.status(200).json({ success: true, message: 'Subject deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Form metadata: programs + subjects for a given colid (used by admission form)
exports.getFormMetadata = async (req, res) => {
    try {
        const { colid } = req.query;
        if (!colid) return res.status(400).json({ success: false, error: 'colid is required' });

        const programs = await MPrograms.find({ colid: Number(colid) });
        const subjects = await Subject.find({ colid: Number(colid) });

        res.status(200).json({ success: true, programs, subjects });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
