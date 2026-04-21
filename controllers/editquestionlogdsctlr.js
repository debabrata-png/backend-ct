const Editquestionlogds = require('../Models/editquestionlogds');

// Get logs by question bank code
exports.getlogsbyqbcode = async (req, res) => {
    try {
        const { questionbankcode, colid } = req.query;

        if (!questionbankcode || !colid) {
            return res.status(400).json({
                success: false,
                message: 'questionbankcode and colid are required'
            });
        }

        const logs = await Editquestionlogds.find({
            questionbankcode: questionbankcode,
            colid: parseInt(colid)
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: logs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
