const sourceds = require('../Models/sourceds.js');

// Create source
exports.createsourceds = async (req, res) => {
    try {
        req.body.colid = Number(req.body.colid);
        const source = await sourceds.create(req.body);
        res.status(201).json({ success: true, data: source });
    } catch (err) {
        // console.error('Error in createsourceds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Get all sources
exports.getallsourcesds = async (req, res) => {
    try {
        const { colid } = req.query;
        const query = { colid: Number(colid), is_active: 'Yes' };

        const sources = await sourceds.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: sources });
    } catch (err) {
        // console.error('Error in getallsourcesds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Update source
exports.updatesourceds = async (req, res) => {
    try {
        const { id } = req.query;
        if (req.body.colid) {
            req.body.colid = Number(req.body.colid);
        }

        const source = await sourceds.findByIdAndUpdate(id, req.body, { new: true });

        if (!source) {
            return res.status(404).json({ success: false, message: 'Source not found' });
        }

        res.status(200).json({ success: true, data: source });
    } catch (err) {
        // console.error('Error in updatesourceds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};

// Delete source
exports.deletesourceds = async (req, res) => {
    try {
        const { id } = req.params;
        const source = await sourceds.findByIdAndDelete(id);

        if (!source) {
            return res.status(404).json({ success: false, message: 'Source not found' });
        }

        res.status(200).json({ success: true, message: 'Source deleted successfully' });
    } catch (err) {
        // console.error('Error in deletesourceds:', err);
        // res.status(500).json({ success: false, message: err.message });
    }
};
