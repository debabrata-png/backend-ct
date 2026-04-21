const storepoitemsds = require("../Models/storepoitemsds");

exports.addstorepoitemsds = async (req, res) => {
    try {
        // year, poid, vendor, vendorid, quantity, price, description, reqdate, postatus, itemid, itemname, itemtype
        const newItem = await storepoitemsds.create(req.body);

        // Update Store Requisition Status if linked
        if (req.body.storereqid) {
            const storerequisationds = require("../Models/storerequisationds");
            await storerequisationds.findByIdAndUpdate(req.body.storereqid, { reqstatus: 'PO Created' });
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

exports.getallstorepoitemsds = async (req, res) => {
    try {
        const { colid } = req.query;
        const poItems = await storepoitemsds.find({ colid });
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

exports.updatestorepoitemsds = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedItem = await storepoitemsds.findByIdAndUpdate(id, req.body, { new: true });
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

exports.deletestorepoitemsds = async (req, res) => {
    try {
        const { id } = req.query;
        await storepoitemsds.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "PO Item deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting PO item", error: error.message });
    }
};

exports.getstorepoitemsdsbyid = async (req, res) => {
    try {
        const { id } = req.query;
        const item = await storepoitemsds.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "PO Item not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching PO item", error: error.message });
    }
};
