const PRList = require("./../Models/prlist");
const PRTemplate = require("./../Models/prtemplate");

// Get templates by colid
exports.getTemplates = async (req, res) => {
    try {
        const { colid } = req.body;
        const data = await PRTemplate.find({ colid });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create PR
exports.createPR = async (req, res) => {
    try {
        const data = req.body;

        data.level = 0; // default level

        const pr = new PRList(data);
        await pr.save();

        res.json({ message: "PR Created", pr });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};