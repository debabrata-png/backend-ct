const storerequisationds2 = require("../Models/storerequisationds2");

exports.addstorerequisationds2 = async (req, res) => {
    try {
        // year, itemcode, itemname, store, storeid, reqdate, quantity, reqstatus, poid
        const newReq = await storerequisationds2.create(req.body);
        res.status(201).json({
            success: true,
            message: "Store Requisition added successfully",
            data: newReq
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding store requisition",
            error: error.message
        });
    }
};

exports.getallstorerequisationds2 = async (req, res) => {
    try {
        const { colid, page, limit, reqstatus, storeid } = req.query;
        const query = { colid };
        if (reqstatus) query.reqstatus = reqstatus;
        if (storeid) query.storeid = storeid;

        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            const total = await storerequisationds2.countDocuments(query);
            const requisitions = await storerequisationds2.find(query)
                .sort({ reqdate: -1 })
                .skip(skip)
                .limit(limitNum);

            res.status(200).json({
                success: true,
                count: requisitions.length,
                total,
                data: { requisitions },
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    pages: Math.ceil(total / limitNum)
                }
            });
        } else {
            const requisitions = await storerequisationds2.find(query).sort({ reqdate: -1 });
            res.status(200).json({
                success: true,
                count: requisitions.length,
                data: { requisitions }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching store requisitions",
            error: error.message
        });
    }
};

exports.updatestorerequisationds2 = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedReq = await storerequisationds2.findByIdAndUpdate(id, req.body, { new: true });
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

exports.deletestorerequisationds2 = async (req, res) => {
    try {
        const { id } = req.query;
        await storerequisationds2.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Requisition deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting requisition", error: error.message });
    }
};

exports.getstorerequisationdsbyid2 = async (req, res) => {
    try {
        const { id } = req.query;
        const reqData = await storerequisationds2.findById(id);
        if (!reqData) return res.status(404).json({ success: false, message: "Requisition not found" });
        res.status(200).json({ success: true, data: reqData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching requisition", error: error.message });
    }
};
