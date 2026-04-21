const storepoitemsds2 = require("../Models/storepoitemsds2");

exports.addstorepoitemsds2 = async (req, res) => {
    try {
        // Validations for Phase 1
        const storepoorderds2 = require("../Models/storepoorderds2");
        const poOrder = await storepoorderds2.findOne({ poid: req.body.poid, colid: req.body.colid });
        if (poOrder && poOrder.postatus && poOrder.postatus !== 'Draft') {
            return res.status(400).json({ success: false, message: "PO is not in Draft state. Items cannot be added." });
        }

        const storerequisationds2 = require("../Models/storerequisationds2");
        if (req.body.storereqid) {
            const reqData = await storerequisationds2.findById(req.body.storereqid);
            if (reqData && req.body.quantity > reqData.quantity) {
                return res.status(400).json({ success: false, message: `PO item quantity (${req.body.quantity}) cannot exceed Original PR item quantity (${reqData.quantity}).` });
            }
        }

        const newItem = await storepoitemsds2.create(req.body);

        // Update Store Requisition Status if linked
        if (req.body.storereqid) {
            const currentReq = await storerequisationds2.findById(req.body.storereqid);
            if (currentReq) {
                const newOrderedQuantity = (currentReq.orderedQuantity || 0) + req.body.quantity;
                const newStatus = newOrderedQuantity >= currentReq.quantity ? 'Completed' : 'Assigned';
                await storerequisationds2.findByIdAndUpdate(req.body.storereqid, {
                    orderedQuantity: newOrderedQuantity,
                    reqstatus: newStatus
                });
            }
        }

        res.status(201).json({
            success: true,
            message: "Store PO Item added successfully",
            data: newItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding PO item",
            error: error.message
        });
    }
};

exports.getallstorepoitemsds2 = async (req, res) => {
    try {
        const { colid } = req.query;
        const poItems = await storepoitemsds2.find({ colid });
        res.status(200).json({
            success: true,
            count: poItems.length,
            data: { poItems }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching PO items",
            error: error.message
        });
    }
};

exports.updatestorepoitemsds2 = async (req, res) => {
    try {
        const { id } = req.query;
        const existingItem = await storepoitemsds2.findById(id);
        if (!existingItem) return res.status(404).json({ success: false, message: "PO Item not found" });

        // Phase 1 Draft Validation
        const storepoorderds2 = require("../Models/storepoorderds2");
        const poOrder = await storepoorderds2.findOne({ poid: existingItem.poid, colid: existingItem.colid });

        if (poOrder && poOrder.postatus && poOrder.postatus !== 'Draft') {
            return res.status(400).json({ success: false, message: "PO is not in Draft state. Items cannot be modified." });
        }

        if (req.body.quantity && existingItem.storereqid) {
            const storerequisationds2 = require("../Models/storerequisationds2");
            const reqData = await storerequisationds2.findById(existingItem.storereqid);
            if (reqData && req.body.quantity > reqData.quantity) {
                return res.status(400).json({ success: false, message: `PO item quantity (${req.body.quantity}) cannot exceed Original PR item quantity (${reqData.quantity}).` });
            }
        }

        // Log Revision
        if (req.body.quantity && req.body.quantity !== existingItem.quantity && poOrder) {
            const pologds2 = require("../Models/pologds2");
            await pologds2.create({
                poid: poOrder.poid,
                po_object_id: poOrder._id,
                action: 'Modified',
                user: req.body.user || existingItem.user,
                colid: poOrder.colid,
                remarks: 'Item quantity revised during draft.',
                changes: [{
                    itemId: existingItem.itemid,
                    itemname: existingItem.itemname,
                    originalQty: existingItem.quantity,
                    revisedQty: req.body.quantity
                }]
            });
        }

        const updatedItem = await storepoitemsds2.findByIdAndUpdate(id, req.body, { new: true });

        // Update PR tracking if quantity changed
        if (req.body.quantity && req.body.quantity !== existingItem.quantity && existingItem.storereqid) {
            const storerequisationds2 = require("../Models/storerequisationds2");
            const currentReq = await storerequisationds2.findById(existingItem.storereqid);
            if (currentReq) {
                const diff = req.body.quantity - existingItem.quantity;
                const newOrderedQuantity = Math.max(0, (currentReq.orderedQuantity || 0) + diff);
                const newStatus = newOrderedQuantity >= currentReq.quantity ? 'Completed' : 'Assigned';
                await storerequisationds2.findByIdAndUpdate(existingItem.storereqid, {
                    orderedQuantity: newOrderedQuantity,
                    reqstatus: newStatus
                });
            }
        }

        if (!updatedItem) return res.status(404).json({ success: false, message: "PO Item not found" });
        res.status(200).json({
            success: true,
            message: "PO Item updated",
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating PO item",
            error: error.message
        });
    }
};

exports.deletestorepoitemsds2 = async (req, res) => {
    try {
        const { id } = req.query;
        const existingItem = await storepoitemsds2.findById(id);
        if (!existingItem) return res.status(404).json({ success: false, message: "PO Item not found" });

        const storepoorderds2 = require("../Models/storepoorderds2");
        const poOrder = await storepoorderds2.findOne({ poid: existingItem.poid, colid: existingItem.colid });
        if (poOrder && poOrder.postatus && poOrder.postatus !== 'Draft') {
            return res.status(400).json({ success: false, message: "PO is not in Draft state. Items cannot be removed." });
        }

        await storepoitemsds2.findByIdAndDelete(id);

        if (existingItem.storereqid) {
            const storerequisationds2 = require("../Models/storerequisationds2");
            const currentReq = await storerequisationds2.findById(existingItem.storereqid);
            if (currentReq) {
                const newOrderedQuantity = Math.max(0, (currentReq.orderedQuantity || 0) - existingItem.quantity);
                const newStatus = newOrderedQuantity > 0 ? 'Assigned' : 'Approved'; // Revert status
                await storerequisationds2.findByIdAndUpdate(existingItem.storereqid, {
                    orderedQuantity: newOrderedQuantity,
                    reqstatus: newStatus
                });
            }
        }

        res.status(200).json({ success: true, message: "PO Item deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting PO item", error: error.message });
    }
};

exports.getstorepoitemsdsbyid2 = async (req, res) => {
    try {
        const { id } = req.query;
        const item = await storepoitemsds2.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "PO Item not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching PO item", error: error.message });
    }
};
