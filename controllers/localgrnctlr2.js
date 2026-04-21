const localgrnds2 = require("../Models/localgrnds2");

exports.addLocalGRN2 = async (req, res) => {
    try {
        const { grnNo, lpoId, storeid, storeName, vendorName, items, receivedBy, colid } = req.body;

        if (!grnNo || !lpoId || !storeid || !colid) {
            return res.status(400).json({ success: false, message: "Missing required fields for GRN." });
        }

        const newGRN = await localgrnds2.create({
            grnNo, lpoId, storeid, storeName, vendorName, items, receivedBy, colid
        });

        res.status(201).json({ success: true, data: newGRN });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getLocalGRNs2 = async (req, res) => {
    try {
        const { colid, storeid } = req.query;
        if (!colid) return res.status(400).json({ success: false, message: "colid is required." });

        const query = { colid };
        if (storeid) query.storeid = storeid;

        const grns = await localgrnds2.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: grns });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
