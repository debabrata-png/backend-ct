const grnds2 = require('../Models/grnds2');
const gatewaypassds2 = require('../Models/gatewaypassds2');

// Create GRN from a completed Gateway Pass
exports.addgrnds2 = async (req, res) => {
    try {
        const {
            gatePassNumber, poid, colid,
            storeId, storeName, receivedBy,
            items, remarks, billAmount, user
        } = req.body;

        // Validate gate pass exists and is not already GRN'd
        const gatePass = await gatewaypassds2.findOne({ passNumber: gatePassNumber, colid });
        if (!gatePass) return res.status(404).json({ success: false, message: 'Gate Pass not found' });
        if (gatePass.status === 'GRN Created') {
            return res.status(400).json({ success: false, message: 'GRN already created for this gate pass' });
        }

        const grnNo = `GRN-${Date.now()}`;
        const grn = await grnds2.create({
            grnNo,
            gatePassNumber,
            poid,
            colid,
            vendorName: gatePass.vendorName,
            vendorAddress: gatePass.vendorAddress,
            partyName: gatePass.vendorName,
            storeId, storeName, receivedBy,
            dcInvoiceNo: gatePass.dcInvoiceNo,
            lrNo: gatePass.lrNo,
            vehicleNo: gatePass.vehicleNo,
            billAmount: billAmount || gatePass.billAmount || 0,
            remarks, items, user,
            name: grnNo
        });

        // Mark gate pass as GRN Created
        await gatewaypassds2.findByIdAndUpdate(gatePass._id, { status: 'GRN Created' });

        res.status(201).json({ success: true, data: grn });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all GRNs for an institution
exports.getallgrnds2 = async (req, res) => {
    try {
        const grns = await grnds2.find({ colid: Number(req.query.colid) }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: grns });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get GRNs pending Quality Check
exports.getpendinggrnds2 = async (req, res) => {
    try {
        const grns = await grnds2.find({ colid: Number(req.query.colid), status: 'Pending QC' }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: grns });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Mark GRN as QC Done (called by quality check controller)
exports.markgrnqcdone2 = async (req, res) => {
    try {
        const { grnNo, colid, status } = req.body;
        const grn = await grnds2.findOneAndUpdate(
            { grnNo, colid },
            { status: status || 'QC Done' },
            { new: true }
        );
        if (!grn) return res.status(404).json({ success: false, message: 'GRN not found' });
        res.status(200).json({ success: true, data: grn });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
