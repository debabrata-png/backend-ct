const Outcomeag = require('../Models/Outcomeag');

// Create Outcome
exports.createoutcomeag = async (req, res) => {
    try {
        const { outcomename, description, user, colid, isactive, name } = req.body;
        const newOutcome = new Outcomeag({ outcomename, description, user, colid, isactive, name });
        await newOutcome.save();
        res.status(201).json({ status: "Success", data: newOutcome });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
};

// Get All Outcomes (Filtered by colid)
exports.getalloutcomeag = async (req, res) => {
    try {
        const { colid } = req.query;
        const outcomes = await Outcomeag.find({ colid });
        res.status(200).json({ status: "Success", data: outcomes });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
};

// Update Outcome
exports.updateoutcomeag = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedOutcome = await Outcomeag.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ status: "Success", data: updatedOutcome });
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
};

// Delete Outcome
exports.deleteoutcomeag = async (req, res) => {
    try {
        const { id } = req.params;
        await Outcomeag.findByIdAndDelete(id);
        res.status(200).json({ status: 'Success', message: 'Outcome Deleted Successfully' });
    } catch (err) {
        console.error('Delete Outcome Error:', err);
        res.status(500).json({ status: 'Error', message: err.message });
    }
};
