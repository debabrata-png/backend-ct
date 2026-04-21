const programmasterds = require('../Models/programmasterds.js');

// Create program
exports.createprogrammasterds = async (req, res) => {
    try {
        req.body.colid = Number(req.body.colid);
        const program = await programmasterds.create(req.body);
        res.status(201).json({ success: true, data: program });
    } catch (err) {
        // console.error('Error in createprogrammasterds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all programs
exports.getallprogramsds = async (req, res) => {
    try {
        const { colid, category, is_active } = req.query;
        
        let query = { colid: Number(colid) };
        
        if (category) query.category = category;
        if (is_active) query.is_active = is_active;
        
        const programs = await programmasterds.find(query).sort({ category: 1, course_name: 1 });
        
        res.status(200).json({ success: true, data: programs, count: programs.length });
    } catch (err) {
        // console.error('Error in getallprogramsds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get program by ID
exports.getprogrambyidds = async (req, res) => {
    try {
        const { id } = req.params;
        
        const program = await programmasterds.findById(id);
        
        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }
        
        res.status(200).json({ success: true, data: program });
    } catch (err) {
        // console.error('Error in getprogrambyidds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get programs by category
exports.getprogramsbycategoryds = async (req, res) => {
    try {
        const { category } = req.params;
        const { colid } = req.query;
        
        const programs = await programmasterds.find({
            colid: Number(colid),
            category,
            is_active: 'Yes'
        }).sort({ course_name: 1 });
        
        res.status(200).json({ success: true, data: programs, count: programs.length });
    } catch (err) {
        // console.error('Error in getprogramsbycategoryds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Update program
exports.updateprogrammasterds = async (req, res) => {
    try {
        const { id } = req.query;  // Changed from req.params
        
        if (req.body.colid) {
            req.body.colid = Number(req.body.colid);
        }
        
        const program = await programmasterds.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }
        
        res.status(200).json({ success: true, data: program });
    } catch (err) {
        // console.error('Error in updateprogrammasterds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Delete program
exports.deleteprogrammasterds = async (req, res) => {
    try {
        const { id } = req.params;
        
        const program = await programmasterds.findByIdAndDelete(id);
        
        if (!program) {
            return res.status(404).json({ success: false, message: 'Program not found' });
        }
        
        res.status(200).json({ success: true, message: 'Program deleted successfully' });
    } catch (err) {
        // console.error('Error in deleteprogrammasterds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
