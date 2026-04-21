const approvalconfigds2 = require('../Models/approvalconfigds2');

exports.addConfig2 = async (req, res) => {
    try {
        // Just create a new entry for each step configuration
        const newConfig = await approvalconfigds2.create(req.body);
        res.status(200).json({ success: true, data: newConfig });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getConfig2 = async (req, res) => {
    try {
        const { colid, module } = req.query;
        // Fetch all steps for this module, sorted by step number
        const steps = await approvalconfigds2.find({ colid, module }).sort({ stepNumber: 1 });
        res.status(200).json({ success: true, data: steps });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateConfig2 = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const updatedConfig = await approvalconfigds2.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, data: updatedConfig });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteConfig2 = async (req, res) => {
    try {
        const { id } = req.query;
        await approvalconfigds2.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Approval config deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
