const Subject = require('../Models/subjectmeritds');

// Create new subject
exports.createds = async (req, res) => {
    try {
        const { subjectCode, subjectName, programmeCode, totalSeats, colid } = req.body;

        const existingSubject = await Subject.findOne({ subjectCode, colid });
        if (existingSubject) {
            return res.status(400).json({
                success: false,
                message: 'Subject with this code already exists'
            });
        }

        const subject = await Subject.create({
            subjectCode,
            subjectName,
            programmeCode,
            totalSeats,
            allocatedSeats: 0,
            colid
        });

        res.status(201).json({
            success: true,
            message: 'Subject created successfully',
            data: subject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating subject',
            error: error.message
        });
    }
};

// Get all subjects
exports.getAllds = async (req, res) => {
    try {
        const { programmeCode, isActive, colid } = req.query;


        const filter = {};
        if (colid) filter.colid = parseInt(colid);

        if (programmeCode) filter.programmeCode = programmeCode;
        if (isActive !== undefined) filter.isActive = isActive === 'true';

        const subjects = await Subject.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: subjects.length,
            data: subjects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching subjects',
            error: error.message
        });
    }
};

// Get single subject
exports.getOneds = async (req, res) => {
    try {
        const { subjectCode, colid } = req.body;

        const subject = await Subject.findOne({ subjectCode, colid });

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found'
            });
        }

        res.status(200).json({
            success: true,
            data: subject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching subject',
            error: error.message
        });
    }
};

// Update subject
exports.updateds = async (req, res) => {
    try {
        const { subjectCode, updates, colid } = req.body;

        const subject = await Subject.findOneAndUpdate(
            { subjectCode, colid },
            updates,
            { new: true, runValidators: true }
        );

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subject updated successfully',
            data: subject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating subject',
            error: error.message
        });
    }
};

// Delete subject
exports.deleteOneds = async (req, res) => {
    try {
        const { subjectCode, colid } = req.query;

        const subject = await Subject.findOneAndDelete({ subjectCode, colid });

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Subject not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subject deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting subject',
            error: error.message
        });
    }
};

// Get subjects by programme
exports.getByProgrammeds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const subjects = await Subject.find({ programmeCode, colid, isActive: true })
            .sort({ subjectName: 1 });

        res.status(200).json({
            success: true,
            count: subjects.length,
            data: subjects
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching subjects',
            error: error.message
        });
    }
};

// Reset allocated seats for a programme
exports.resetSeatsds = async (req, res) => {
    try {
        const { programmeCode, colid } = req.body;

        const result = await Subject.updateMany(
            { programmeCode, colid },
            { $set: { allocatedSeats: 0 } }
        );

        res.status(200).json({
            success: true,
            message: `Reset ${result.modifiedCount} subjects`,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error resetting seats',
            error: error.message
        });
    }
};
