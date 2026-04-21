const prassigneds2 = require("../Models/prassigneds2");

exports.addprassigneds2 = async (req, res) => {
    try {
        const newAssignment = await prassigneds2.create(req.body);

        // CRITICAL: Update the status of the original store requisition
        if (req.body.storereqid) {
            await storerequisationds2.findByIdAndUpdate(
                req.body.storereqid,
                { reqstatus: 'Assigned' }
            );
        }

        res.status(201).json({
            success: true,
            message: "PR Assigned successfully",
            data: newAssignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error assigning PR",
            error: error.message
        });
    }
};

exports.getallprassigneds2 = async (req, res) => {
    try {
        const { colid, page, limit, prassigneemail } = req.query;
        const query = { colid };
        if (prassigneemail) query.prassigneemail = prassigneemail;

        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            const total = await prassigneds2.countDocuments(query);
            const assignments = await prassigneds2.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNum);

            res.status(200).json({
                success: true,
                count: assignments.length,
                total,
                data: { assignments },
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    pages: Math.ceil(total / limitNum)
                }
            });
        } else {
            const assignments = await prassigneds2.find(query).sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                count: assignments.length,
                data: { assignments }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching PR assignments",
            error: error.message
        });
    }
};

exports.updateprassigneds2 = async (req, res) => {
    try {
        const { id, storereqid } = req.query;
        let updatedAssignment;
        if (id) {
            updatedAssignment = await prassigneds2.findByIdAndUpdate(id, req.body, { new: true });
        } else if (storereqid) {
            updatedAssignment = await prassigneds2.findOneAndUpdate({ storereqid }, req.body, { new: true });
        }

        if (!updatedAssignment) return res.status(404).json({ success: false, message: "Assignment not found" });
        res.status(200).json({
            success: true,
            message: "Assignment updated",
            data: updatedAssignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating assignment",
            error: error.message
        });
    }
};

exports.deleteprassigneds2 = async (req, res) => {
    try {
        const { id } = req.query;
        await prassigneds2.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Assignment deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting assignment", error: error.message });
    }
};

// New Controller to fetch OEs
exports.getOEUsers2 = async (req, res) => {
    try {
        const { colid } = req.query;
        // Assuming 'User' model is available or needs to be required
        const User = require('../Models/user');

        const oes = await User.find({
            colid: colid,
            role: { $in: ['PE', 'SPE'] },
            status: 1 // Assuming 1 is active
        }).select('name email role');

        res.status(200).json({
            success: true,
            count: oes.length,
            data: oes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching OEs",
            error: error.message
        });
    }
};

const storerequisationds2 = require("../Models/storerequisationds2");

exports.getAssignedRequisitions2 = async (req, res) => {
    try {
        const { colid, page, limit, user, reqstatus } = req.query;

        // 1. Find all assignments for this user
        // We fetch ALL assignments first to get the full list of IDs. 
        // If the list is massive this might be slow, but for a single user it should be fine.
        const assignments = await prassigneds2.find({ colid, prassigneemail: user }).select('storereqid');
        const assignedIds = assignments.map(a => a.storereqid);

        // 2. Query Store Requisitions using these IDs with pagination
        const query = { _id: { $in: assignedIds } };
        if (reqstatus) query.reqstatus = reqstatus;

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
                total: requisitions.length,
                data: { requisitions }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching assigned requisitions",
            error: error.message
        });
    }
};
