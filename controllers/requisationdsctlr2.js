const requisationds2 = require("../Models/requisationds2");

exports.addrequisationds2 = async (req, res) => {
    try {
        // faculty, facultyid, itemcode, itemname, quantity, reqdate, allotted, allotdate, poid, storeid, storename, reqstatus, year
        const newReq = await requisationds2.create(req.body);
        res.status(201).json({
            success: true,
            message: "Requisition added successfully",
            data: newReq
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding requisition",
            error: error.message
        });
    }
};

exports.getallrequisationds2 = async (req, res) => {
    try {
        const { colid } = req.query;
        const requisitions = await requisationds2.find({ colid }).sort({ reqdate: -1 });
        res.status(200).json({
            success: true,
            count: requisitions.length,
            data: { requisitions }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching requisitions",
            error: error.message
        });
    }
};

exports.updaterequisationds2 = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedReq = await requisationds2.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedReq) return res.status(404).json({ success: false, message: "Requisition not found" });
        res.status(200).json({
            success: true,
            message: "Requisition updated",
            data: updatedReq
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating requisition",
            error: error.message
        });
    }
};

exports.deleterequisationds2 = async (req, res) => {
    try {
        const { id } = req.query;
        await requisationds2.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Requisition deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting requisition", error: error.message });
    }
};

exports.getrequisationdsbyid2 = async (req, res) => {
    try {
        const { id } = req.query;
        const reqData = await requisationds2.findById(id);
        if (!reqData) return res.status(404).json({ success: false, message: "Requisition not found" });
        res.status(200).json({ success: true, data: reqData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching requisition", error: error.message });
    }
};
