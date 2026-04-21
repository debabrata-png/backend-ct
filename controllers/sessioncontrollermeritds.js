const AllocationSession = require('../Models/allocationsessionmeritds');
const Student = require('../Models/studentmeritds');
const Subject = require('../Models/subjectmeritds');

// Create allocation session
exports.createds = async (req, res) => {
    try {
        const { sessionName, programmeCode, allocationType, colid } = req.body;

        const session = await AllocationSession.create({
            sessionName,
            programmeCode,
            allocationType,
            status: 'PENDING',
            currentRound: 0,
            colid
        });

        res.status(201).json({
            success: true,
            message: 'Allocation session created successfully',
            data: session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating session',
            error: error.message
        });
    }
};

// Get all sessions
exports.getAllds = async (req, res) => {
    try {
        const { programmeCode, status, colid } = req.query;


        const filter = {};
        if (colid) filter.colid = parseInt(colid);

        if (programmeCode) filter.programmeCode = programmeCode;
        if (status) filter.status = status;

        const sessions = await AllocationSession.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sessions',
            error: error.message
        });
    }
};

// Get single session
exports.getOneds = async (req, res) => {
    try {
        const { sessionId, colid } = req.body;

        const session = await AllocationSession.findOne({ _id: sessionId, colid });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        res.status(200).json({
            success: true,
            data: session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching session',
            error: error.message
        });
    }
};

// Update session
exports.updateds = async (req, res) => {
    try {
        const { sessionId, updates, colid } = req.body;

        const session = await AllocationSession.findOneAndUpdate(
            { _id: sessionId, colid },
            updates,
            { new: true, runValidators: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Session updated successfully',
            data: session
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating session',
            error: error.message
        });
    }
};

// Delete session
exports.deleteOneds = async (req, res) => {
    try {
        const { sessionId, colid } = req.query;

        const session = await AllocationSession.findOne({ _id: sessionId, colid });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        if (session.status !== 'PENDING') {
            return res.status(400).json({
                success: false,
                message: 'Can only delete PENDING sessions'
            });
        }

        await AllocationSession.findOneAndDelete({ _id: sessionId, colid });

        res.status(200).json({
            success: true,
            message: 'Session deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting session',
            error: error.message
        });
    }
};

// Validate before starting allocation
exports.validateStartds = async (req, res) => {
    try {
        const { sessionId, colid } = req.body;

        const session = await AllocationSession.findOne({ _id: sessionId, colid });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        const warnings = [];
        const errors = [];

        // Check students exist
        const studentCount = await Student.countDocuments({
            programmeCode: session.programmeCode,
            isActive: true,
            colid
        });

        if (studentCount === 0) {
            errors.push('No students found for this programme');
        }

        // Check subjects exist
        const subjects = await Subject.find({
            programmeCode: session.programmeCode,
            isActive: true,
            colid
        });

        if (subjects.length === 0) {
            errors.push('No subjects found for this programme');
        }

        // Calculate total seats
        const totalSeats = subjects.reduce((sum, subject) =>
            sum + (subject.totalSeats - subject.allocatedSeats), 0);

        if (totalSeats === 0) {
            errors.push('No available seats in any subject');
        }

        if (studentCount > totalSeats) {
            warnings.push(`${studentCount - totalSeats} students may not get allocation (Total students: ${studentCount}, Total seats: ${totalSeats})`);
        }

        res.status(200).json({
            success: true,
            valid: errors.length === 0,
            warnings,
            errors,
            stats: {
                studentCount,
                subjectCount: subjects.length,
                totalSeats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error validating session',
            error: error.message
        });
    }
};
