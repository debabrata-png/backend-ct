const Questionsectionds = require('../Models/questionsectionds');

// Create section
exports.createsectionds = async (req, res) => {
    try {
        const { name, user, colid, questionbankcode, section, sectiontitle, description, questiontype, totalquestions, noofquestionsneedtoattend, markspersquestion } = req.body;

        if (!name || !user || !colid || !questionbankcode || !section || !sectiontitle || !questiontype || !totalquestions || !noofquestionsneedtoattend || !markspersquestion) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        // FIXED: Calculate based on questions need to attend
        const totalmarks = noofquestionsneedtoattend * markspersquestion;

        const sectionsection = await Questionsectionds.create({
            name,
            user,
            colid,
            questionbankcode,
            section,
            sectiontitle,
            description,
            questiontype,
            totalquestions,
            noofquestionsneedtoattend,
            markspersquestion,
            totalmarks
        });

        res.status(201).json({
            success: true,
            message: 'Section created successfully',
            data: sectionsection
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get sections by question bank code
exports.getsectiondsbyqbcode = async (req, res) => {
    try {
        const { questionbankcode, colid } = req.query;

        if (!questionbankcode || !colid) {
            return res.status(400).json({
                success: false,
                message: 'questionbankcode and colid are required'
            });
        }

        const sections = await Questionsectionds.find({
            questionbankcode: questionbankcode,
            colid: parseInt(colid)
        }).sort({ section: 1 });

        res.status(200).json({
            success: true,
            data: sections
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update section
exports.updatesectionds = async (req, res) => {
    try {
        const { _id, sectiontitle, description, questiontype, totalquestions, noofquestionsneedtoattend, markspersquestion } = req.body;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'Section ID is required'
            });
        }

        // FIXED: Calculate based on questions need to attend
        const totalmarks = noofquestionsneedtoattend * markspersquestion;

        const updated = await Questionsectionds.findByIdAndUpdate(
            _id,
            { 
                sectiontitle, 
                description, 
                questiontype, 
                totalquestions, 
                noofquestionsneedtoattend, 
                markspersquestion,
                totalmarks 
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Section not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete section
exports.deletesectionds = async (req, res) => {
    try {
        const { _id } = req.query;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'Section ID is required'
            });
        }

        const deleted = await Questionsectionds.findByIdAndDelete(_id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Section not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Section deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
