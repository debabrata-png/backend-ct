const requisationds12 = require("../Models/requisationds12");
const requisationds2 = require("../Models/requisationds2");

// Add to Staging (Level 0)
exports.addrequisationds12 = async (req, res) => {
    try {
        const newReq = await requisationds12.create({ ...req.body, reqstatus: 'Pending Approval' });
        res.status(201).json({
            success: true,
            message: "Requisition sent for approval",
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

// Get All Staging (For Approver)
exports.getallrequisationds12 = async (req, res) => {
    try {
        const { colid } = req.query;
        // Fetch only those pending approval? Or all? Let's fetch all for history, filtering in frontend usually.
        const requisitions = await requisationds12.find({ colid }).sort({ reqdate: -1 });
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

// Approve: Move from ds1 to ds
exports.approverequisationds12 = async (req, res) => {
    try {
        const { id } = req.body;
        const stagingReq = await requisationds12.findById(id);

        if (!stagingReq) {
            return res.status(404).json({ success: false, message: "Requisition not found" });
        }

        if (stagingReq.reqstatus === 'Approved') {
            return res.status(400).json({ success: false, message: "Already Approved" });
        }

        // Create in Main Store Request
        // We strip _id to let mongo generate new one, or mapped fields
        const mainReqPayload = stagingReq.toObject();
        delete mainReqPayload._id;
        delete mainReqPayload.__v;
        mainReqPayload.reqstatus = 'Pending'; // Pending for Store Manager now

        const newMainReq = await requisationds2.create(mainReqPayload);

        // Update Staging Status
        stagingReq.reqstatus = 'Approved';
        await stagingReq.save();

        res.status(200).json({
            success: true,
            message: "Requisition Approved and Sent to Store",
            data: newMainReq
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error approving requisition",
            error: error.message
        });
    }
};

// Reject in Staging
exports.rejectrequisationds12 = async (req, res) => {
    try {
        const { id } = req.body; // or query
        await requisationds12.findByIdAndUpdate(id, { reqstatus: 'Rejected' });
        res.status(200).json({ success: true, message: "Requisition Rejected" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error rejecting requisition", error: error.message });
    }
};

exports.deleterequisationds12 = async (req, res) => {
    try {
        const { id } = req.query;
        await requisationds12.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Requisition deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting requisition", error: error.message });
    }
};
