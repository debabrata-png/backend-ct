const exammarks2ds = require('../Models/exammarks2ds');

// Create
exports.createexammarks2ds = async (req, res) => {
    try {
        const { name, user, colid, student, regno, examcode, semester, subject, marks } = req.body;
        // Basic validation - adjust as per schema requirements
        if (!colid || !regno) {
            return res.status(400).json({ status: 'error', message: 'College ID and Reg No are required' });
        }

        const newRecord = new exammarks2ds(req.body);
        await newRecord.save();
        res.status(201).json({ status: 'success', data: newRecord });

    } catch (error) {
        console.error('Error in createexammarks2ds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Get by Regno (for Student Profile)
exports.getexammarks2ds = async (req, res) => {
    try {
        const { colid, regno } = req.query; // Using query params for GET

        // Debugging logs
        console.log('API /getexammarks2ds hit');
        console.log('Query Params:', { colid, regno });

        if (!colid || !regno) {
            // Try body if query is empty (sometimes post is used)
            if (req.body.colid && req.body.regno) {
                const marks = await exammarks2ds.find({ colid: req.body.colid, regno: req.body.regno });
                return res.status(200).json({ status: 'success', data: marks });
            }
            return res.status(400).json({ status: 'error', message: 'College ID and Reg No are required' });
        }

        const marks = await exammarks2ds.find({ colid, regno });
        console.log(`Found ${marks.length} records for colid: ${colid}, regno: ${regno}`);

        res.status(200).json({ status: 'success', data: marks });

    } catch (error) {
        console.error('Error in getexammarks2ds:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// Update
exports.updateexammarks2ds = async (req, res) => {
    try {
        const { id, updates } = req.body;
        if (!id) return res.status(400).json({ status: 'error', message: 'ID required' });

        const updated = await exammarks2ds.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ status: 'success', data: updated });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Delete
exports.deleteexammarks2ds = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ status: 'error', message: 'ID required' });

        await exammarks2ds.findByIdAndDelete(id);
        res.status(200).json({ status: 'success', message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
