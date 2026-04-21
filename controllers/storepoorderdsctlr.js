const storepoorderds = require("../Models/storepoorderds");

exports.addstorepoorderds = async (req, res) => {
    try {
        // year, vendor, vendorid, poid, price, description, returnamount, netprice, updatedate, postatus
        const newPO = await storepoorderds.create(req.body);
        res.status(201).json({
            success: true,
            message: "Store PO added successfully",
            data: newPO
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding store PO",
            error: error.message
        });
    }
};

exports.getallstorepoorderds = async (req, res) => {
    try {
        const { colid, page, limit } = req.query;
        const query = { colid };

        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const skip = (pageNum - 1) * limitNum;

            const total = await storepoorderds.countDocuments(query);
            const poOrders = await storepoorderds.find(query)
                .sort({ createdAt: -1 }) // Explicit sort important for pagination stability
                .skip(skip)
                .limit(limitNum);

            res.status(200).json({
                success: true,
                count: poOrders.length,
                total,
                data: { poOrders },
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    pages: Math.ceil(total / limitNum)
                }
            });
        } else {
            const poOrders = await storepoorderds.find(query).sort({ createdAt: -1 });
            res.status(200).json({
                success: true,
                count: poOrders.length,
                data: { poOrders } // Kept { poOrders } as per original
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching store POs",
            error: error.message
        });
    }
};

exports.updatestorepoorderds = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedPO = await storepoorderds.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPO) return res.status(404).json({ success: false, message: "PO not found" });
        res.status(200).json({
            success: true,
            message: "PO updated",
            data: updatedPO
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating PO",
            error: error.message
        });
    }
};

exports.deletestorepoorderds = async (req, res) => {
    try {
        const { id } = req.query;
        await storepoorderds.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "PO deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting PO", error: error.message });
    }
};

exports.getstorepoorderdsbyid = async (req, res) => {
    try {
        const { id } = req.query;
        const po = await storepoorderds.findById(id);
        if (!po) return res.status(404).json({ success: false, message: "PO not found" });
        res.status(200).json({ success: true, data: po });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching PO", error: error.message });
    }
};

exports.approveStorePO = async (req, res) => {
    try {
        const { poid, status, user } = req.body;
        // Logic to approve PO (finding by poid string or _id depending on usage)
        // Assuming _id for update consistency for now
        const updatedPO = await storepoorderds.findByIdAndUpdate(poid, { postatus: status }, { new: true });

        if (!updatedPO) return res.status(404).json({ message: "PO not found" });

        res.status(200).json({ success: true, message: "PO Approved", data: updatedPO });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error approving PO", error: error.message });
    }
};



exports.verifyDynamicStep = async (req, res) => {
    try {
        const { id, user_email } = req.body;
        const approvalconfigds = require("../Models/approvalconfigds");

        const po = await storepoorderds.findById(id);
        if (!po) return res.status(404).json({ success: false, message: "PO not found" });

        // Fetch Config Steps
        const steps = await approvalconfigds.find({ colid: po.colid, module: 'Purchase Order' }).sort({ stepNumber: 1 });

        if (steps.length === 0) {
            return res.status(400).json({ success: false, message: "No approval configuration found." });
        }

        const currentStepIndex = po.currentStep - 1; // 1-based to 0-based
        if (currentStepIndex >= steps.length) {
            return res.status(400).json({ success: false, message: "Already fully approved." });
        }

        const stepConfig = steps[currentStepIndex];

        // Authorization Check
        if (stepConfig.approverEmail !== user_email) {
            return res.status(403).json({ success: false, message: `Unauthorized. Waiting for ${stepConfig.approverEmail}` });
        }

        // Proceed with Approval
        // Create Approval Action Log in separate table
        const storepoapprovalds = require("../Models/storepoapprovalds");
        await storepoapprovalds.create({
            colid: po.colid,
            poid: po.poid, // or po._id if linking by ID primarily, but poid is string identifier
            stepNumber: po.currentStep,
            approverEmail: user_email,
            action: 'Approved',
            user: user_email, // Using email as username ref
            actionDate: new Date()
        });

        const nextStep = po.currentStep + 1;

        if (nextStep > steps.length) {
            // All Steps Completed
            po.postatus = 'Approved';
            po.approvalStatus = 'Completed';
            // po.level = steps.length; // Legacy
        } else {
            // Move to Next Step
            po.currentStep = nextStep;
            po.postatus = `Pending Step ${nextStep}`;
            po.approvalStatus = `Pending Step ${nextStep}`;
            // po.level = po.currentStep - 1; // Legacy
        }

        await po.save();
        res.status(200).json({ success: true, message: `Step ${po.currentStep - 1} Verified`, data: po });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying step", error: error.message });
    }
};
