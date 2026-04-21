const Questionsds = require('../Models/questionsds');
const Questionsectionds = require('../Models/questionsectionds');
const Editquestionlogds = require('../Models/editquestionlogds');
const Questionbankds = require('../Models/questionbankds');

// Create question manually
exports.createquestionds = async (req, res) => {
    try {
        const { name, user, colid, questionbankcode, sectionid, section, question, questiontype, marks, options, answer } = req.body;

        if (!name || !user || !colid || !questionbankcode || !sectionid || !question || !questiontype || !marks) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        const questiondata = await Questionsds.create({
            name,
            user,
            colid,
            questionbankcode,
            sectionid,
            section,
            question,
            questiontype,
            marks,
            options: options || [],
            answer
        });

        res.status(201).json({
            success: true,
            message: 'Question created successfully',
            data: questiondata
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get section and question bank details for AI generation (frontend will use this)
exports.getcontextforai = async (req, res) => {
    try {
        const { sectionid, questionbankcode, colid } = req.query;

        if (!sectionid || !questionbankcode || !colid) {
            return res.status(400).json({
                success: false,
                message: 'sectionid, questionbankcode, and colid are required'
            });
        }

        // Get section details
        const section = await Questionsectionds.findById(sectionid);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: 'Section not found'
            });
        }

        // Get question bank details
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
            data: {
                section: section,
                questionbank: questionbank
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Bulk create questions (after AI generation in frontend)
exports.bulkcreatequestionsds = async (req, res) => {
    try {
        const { name, user, colid, questionbankcode, sectionid, section, questions } = req.body;

        if (!name || !user || !colid || !questionbankcode || !sectionid || !questions || !Array.isArray(questions)) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }

        const questionsToInsert = questions.map(q => ({
            name,
            user,
            colid,
            questionbankcode,
            sectionid,
            section,
            question: q.question,
            questiontype: q.questiontype,
            marks: q.marks,
            options: q.options || [],
            answer: q.answer
        }));

        const inserted = await Questionsds.insertMany(questionsToInsert);

        res.status(201).json({
            success: true,
            message: `${inserted.length} questions created successfully`,
            data: inserted
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get questions by question bank code
exports.getquestionsbyqbcode = async (req, res) => {
    try {
        const { questionbankcode, colid } = req.query;

        if (!questionbankcode || !colid) {
            return res.status(400).json({
                success: false,
                message: 'questionbankcode and colid are required'
            });
        }

        const questions = await Questionsds.find({
            questionbankcode: questionbankcode,
            colid: parseInt(colid)
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: questions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get questions by section ID
exports.getquestionsbysectionid = async (req, res) => {
    try {
        const { sectionid, colid } = req.query;

        if (!sectionid || !colid) {
            return res.status(400).json({
                success: false,
                message: 'sectionid and colid are required'
            });
        }

        const questions = await Questionsds.find({
            sectionid: sectionid,
            colid: parseInt(colid)
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: questions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update question
exports.updatequestionds = async (req, res) => {
    try {
        const { _id, user, colid, questionbankcode, question, questiontype, marks, options, answer, moderator, name } = req.body;

        if (!_id || !user) {
            return res.status(400).json({
                success: false,
                message: 'Question ID and user are required'
            });
        }

        // Get original question
        const originalQuestion = await Questionsds.findById(_id);
        if (!originalQuestion) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        // Check if moderator is editing (create log)
        if (moderator && user === moderator) {
            await Editquestionlogds.create({
                name: name,
                user: user,
                colid: colid,
                questionbankcode: questionbankcode,
                section: originalQuestion.section,
                prevquestion: originalQuestion.question,
                editedquestion: question,
                questiontype: questiontype,
                marks: marks,
                prevoptions: originalQuestion.options || [],
                editedoptions: options || [],
                prevanswer: originalQuestion.answer,
                editedanswer: answer
            });
        }

        // Update question
        const updated = await Questionsds.findByIdAndUpdate(
            _id,
            { question, questiontype, marks, options, answer },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Question updated successfully',
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete question
exports.deletequestionds = async (req, res) => {
    try {
        const { _id } = req.query;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: 'Question ID is required'
            });
        }

        const deleted = await Questionsds.findByIdAndDelete(_id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Question deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
