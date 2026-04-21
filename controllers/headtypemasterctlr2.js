const headtypemasterds2 = require("../Models/headtypemasterds2");

exports.addHeadType2 = async (req, res) => {
    try {
        const { name, colid } = req.body;
        if (!name || !colid) {
            return res.status(400).json({ success: false, message: "Name and colid are required." });
        }
        const newHeadType = await headtypemasterds2.create({ name, colid });
        res.status(201).json({ success: true, data: newHeadType });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHeadTypes2 = async (req, res) => {
    try {
        const { colid } = req.query;
        if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

        const headTypes = await headtypemasterds2.find({ colid });
        res.status(200).json({ success: true, data: headTypes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteHeadType2 = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ success: false, message: "id is required" });

        await headtypemasterds2.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Head Type deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
