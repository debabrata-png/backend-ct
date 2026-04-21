const gatewaypassds2 = require("../Models/gatewaypassds2");
const storepoorderds2 = require("../Models/storepoorderds2");
const storepoitemsds2 = require("../Models/storepoitemsds2");

// Add a new Gateway Pass
exports.addGatewayPass2 = async (req, res) => {
    try {
        const passData = req.body;

        // Ensure passNumber is unique or generate one
        if (!passData.passNumber) {
            const dateObj = new Date();
            const yyyy = dateObj.getFullYear();
            const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
            const uniq = String(Date.now()).slice(-4);
            passData.passNumber = `GP-${yyyy}${mm}${uniq}`;
        }

        // Fetch PO details to validate/link
        const po = await storepoorderds2.findOne({ poid: passData.poid, colid: passData.colid });
        if (!po) {
            return res.status(404).json({ success: false, message: "Linked PO not found." });
        }

        // For Inward passes, we want to update the PO status to Partially Delivered or Delivered based on items
        // Wait till store actually completes it? Inward pass is just security gate logging it.
        // We'll just create the gate pass.

        const newPass = await gatewaypassds2.create(passData);

        // Update PO Items gateReceivedQuantity for tracking
        if (passData.passType === 'Inward' && passData.items && passData.items.length > 0) {
            for (const item of passData.items) {
                if (Number(item.deliveredQuantity) > 0 && item.itemid) {
                    await storepoitemsds2.findOneAndUpdate(
                        { colid: passData.colid, poid: passData.poid, itemid: item.itemid },
                        { $inc: { gateReceivedQuantity: Number(item.deliveredQuantity) } }
                    );
                }
            }
        }

        res.status(201).json({
            success: true,
            message: "Gateway Pass generated successfully",
            data: newPass
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error generating Gateway Pass",
            error: error.message
        });
    }
};

// Get all Gateway Passes for a college
exports.getAllGatewayPasses2 = async (req, res) => {
    try {
        const { colid, type } = req.query;
        let query = { colid };
        if (type) query.passType = type;

        const passes = await gatewaypassds2.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: passes.length,
            data: passes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching Gateway Passes",
            error: error.message
        });
    }
};

// Get pass by ID
exports.getGatewayPassById2 = async (req, res) => {
    try {
        const { id } = req.query;
        const pass = await gatewaypassds2.findById(id);
        if (!pass) return res.status(404).json({ success: false, message: "Gateway Pass not found" });

        res.status(200).json({ success: true, data: pass });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching Gateway Pass", error: error.message });
    }
};

// Update pass (e.g., adding signatures later)
exports.updateGatewayPass2 = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedPass = await gatewaypassds2.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPass) return res.status(404).json({ success: false, message: "Gateway Pass not found" });

        // If updating signatures to true, maybe update PO status? 
        // For Phase 2, security generates it. Store incharge might sign it later or through Quality Check.

        res.status(200).json({
            success: true,
            message: "Gateway Pass updated successfully",
            data: updatedPass
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating Gateway Pass",
            error: error.message
        });
    }
};
