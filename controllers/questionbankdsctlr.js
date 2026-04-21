const Questionbankds = require('../Models/questionbankds');

// Create question bank
exports.createquestionbankds = async (req, res) => {
    try {
        const { name, user, colid, course, coursecode, faculty, moderator, questionbankcode } = req.body;

        if (!name || !user || !colid || !course || !coursecode || !faculty || !moderator || !questionbankcode) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // Check if questionbankcode already exists for this colid
        const existing = await Questionbankds.findOne({ 
            colid: colid, 
            questionbankcode: questionbankcode 
        });

        if (existing) {
            return res.status(400).json({ 
                success: false, 
                message: 'Question bank code already exists for this college. Please use a unique code.' 
            });
        }

        const questionbank = await Questionbankds.create({
            name,
            user,
            colid,
            course,
            coursecode,
            faculty,
            moderator,
            questionbankcode,
            isfinalized: false
        });

        res.status(201).json({
            success: true,
            message: 'Question bank created successfully',
            data: questionbank
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get question banks by colid with role-based filtering
exports.getquestionbankdsbycolid = async (req, res) => {
    try {
        const { colid, user } = req.query;

        if (!colid || !user) {
            return res.status(400).json({
                success: false,
                message: 'colid and user are required'
            });
        }

        // Find question banks where user is admin, faculty, or moderator
        const questionbanks = await Questionbankds.find({
            colid: parseInt(colid),
            $or: [
                { user: user },      // Admin who created
                { faculty: user },   // Faculty assigned
                { moderator: user }  // Moderator assigned
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: questionbanks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single question bank by code
exports.getquestionbankdsbycode = async (req, res) => {
    try {
        const { questionbankcode, colid } = req.query;

        if (!questionbankcode || !colid) {
            return res.status(400).json({
                success: false,
                message: 'questionbankcode and colid are required'
            });
        }

        const questionbank = await Questionbankds.findOne({ 
            questionbankcode: questionbankcode,
            colid: parseInt(colid)
        });

        if (!questionbank) {
            return res.status(404).json({
                success: false,
                message: 'Question bank not found'
            });
        }

        res.status(200).json({
            success: true,
            data: questionbank
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update question bank (Admin only)
exports.updatequestionbankds = async (req, res) => {
    try {
        const { questionbankcode, colid, user, course, coursecode, faculty, moderator } = req.body;

        if (!questionbankcode || !colid || !user) {
            return res.status(400).json({
                success: false,
                message: 'questionbankcode, colid, and user are required'
            });
        }

        // Check if user is admin (creator)
        const questionbank = await Questionbankds.findOne({ 
            questionbankcode: questionbankcode,
            colid: parseInt(colid),
            user: user
        });

        if (!questionbank) {
            return res.status(403).json({
                success: false,
                message: 'Only admin can update question bank'
            });
        }

        // Check if finalized
        if (questionbank.isfinalized) {
            return res.status(400).json({
                success: false,
                message: 'Cannot update finalized question bank'
            });
        }

        const updated = await Questionbankds.findOneAndUpdate(
            { questionbankcode: questionbankcode, colid: parseInt(colid) },
            { course, coursecode, faculty, moderator },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Question bank updated successfully',
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete question bank (Admin only)
exports.deletequestionbankds = async (req, res) => {
    try {
        const { questionbankcode, colid, user } = req.query;

        if (!questionbankcode || !colid || !user) {
            return res.status(400).json({
                success: false,
                message: 'questionbankcode, colid, and user are required'
            });
        }

        // Check if user is admin (creator)
        const questionbank = await Questionbankds.findOne({ 
            questionbankcode: questionbankcode,
            colid: parseInt(colid),
            user: user
        });

        if (!questionbank) {
            return res.status(403).json({
                success: false,
                message: 'Only admin can delete question bank'
            });
        }

        // Check if finalized
        if (questionbank.isfinalized) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete finalized question bank'
            });
        }

        await Questionbankds.deleteOne({ 
            questionbankcode: questionbankcode, 
            colid: parseInt(colid) 
        });

        res.status(200).json({
            success: true,
            message: 'Question bank deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Finalize question bank (Admin only)
exports.finalizequestionbankds = async (req, res) => {
    try {
        const { questionbankcode, colid, user, year, semester, examcode } = req.body;

        if (!questionbankcode || !colid || !user || !year || !semester || !examcode) {
            return res.status(400).json({
                success: false,
                message: 'questionbankcode, colid, user, year, semester, and examcode are required'
            });
        }

        // Check if user is admin (creator)
        const questionbank = await Questionbankds.findOne({ 
            questionbankcode: questionbankcode,
            colid: parseInt(colid),
            user: user
        });

        if (!questionbank) {
            return res.status(403).json({
                success: false,
                message: 'Only admin can finalize question bank'
            });
        }

        // Check if already finalized
        if (questionbank.isfinalized) {
            return res.status(400).json({
                success: false,
                message: 'Question bank is already finalized'
            });
        }

        const updated = await Questionbankds.findOneAndUpdate(
            { questionbankcode: questionbankcode, colid: parseInt(colid) },
            { 
                year,
                semester,
                examcode,
                isfinalized: true,
                finalizedby: user,
                finalizedat: new Date()
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Question bank finalized successfully',
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
