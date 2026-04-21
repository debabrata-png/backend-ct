const storeitemds = require("../Models/storeitemds");
const stockregisterds = require("../Models/stockregisterds");

exports.addstoreitemds = async (req, res) => {
    try {
        const itemmasterds = require('../Models/itemmasterds');
        const { itemid, storeid, colid, quantity, user, storename } = req.body;

        // Fetch Item Code from Master
        const itemMaster = await itemmasterds.findById(itemid);
        if (!itemMaster) {
            return res.status(404).json({ success: false, message: "Item Master not found" });
        }

        const itemCode = itemMaster.itemcode;

        // Check if exists, if so update, else create
        // Logic similar to delivery:
        const storeitemds = require("../Models/storeitemds");
        const existingItem = await storeitemds.findOne({ itemcode: itemCode, colid: colid, storeid: storeid });

        let newItem;
        if (existingItem) {
            newItem = await storeitemds.findByIdAndUpdate(existingItem._id, { $inc: { quantity: Number(quantity) } }, { new: true });
        } else {
            newItem = await storeitemds.create({
                colid,
                user,
                storeid,
                storename,
                itemcode: itemCode,
                itemname: itemMaster.itemname,
                quantity: Number(quantity),
                type: itemMaster.itemtype,
                status: 'Available',
                name: 'Manual Stock Add'
            });
        }

        // Log to Stock Register
        const stockregisterds = require("../Models/stockregisterds");
        await stockregisterds.create({
            storeid: storeid,
            store: storeid,
            itemid: itemCode, // "itemcode is main"
            item: itemMaster.itemname,
            quantityadded: Number(quantity),
            quantityreturn: 0,
            netquantity: newItem.quantity,
            user: user,
            colid: colid,
            stockdate: new Date(),
            name: 'Manual Add'
        });

        res.status(201).json({
            success: true,
            message: "Store Item added/updated successfully",
            data: newItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding store item",
            error: error.message
        });
    }
};

exports.getallstoreitemds = async (req, res) => {
    try {
        const { colid } = req.query;
        const storeItems = await storeitemds.find({ colid });
        res.status(200).json({
            success: true,
            count: storeItems.length,
            data: { storeItems }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching store items",
            error: error.message
        });
    }
};

exports.updatestoreitemds = async (req, res) => {
    try {
        const { id } = req.query;
        const updatedItem = await storeitemds.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ success: false, message: "Store Item not found" });
        res.status(200).json({
            success: true,
            message: "Store Item updated",
            data: updatedItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating store item",
            error: error.message
        });
    }
};

exports.deletestoreitemds = async (req, res) => {
    try {
        const { id } = req.query;
        await storeitemds.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Store Item deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting store item", error: error.message });
    }
};

exports.getstoreitemdsbyid = async (req, res) => {
    try {
        const { id } = req.query;
        const item = await storeitemds.findById(id);
        if (!item) return res.status(404).json({ success: false, message: "Store Item not found" });
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching store item", error: error.message });
    }
};

// Allotment logic (updated to use new fields)
exports.allotItem = async (req, res) => {
    try {
        const { requestId, storeItemId, quantity, storeId, itemId, userId, colid } = req.body;

        // 1. Update Store Item Quantity
        const storeItem = await storeitemds.findById(storeItemId);
        if (!storeItem) return res.status(404).json({ message: "Store Item not found" });

        storeItem.quantity -= Number(quantity);
        await storeItem.save();

        // 2. Update Requisition Status & Quantity (Partial Allotment Logic)
        const requisationds = require("../Models/requisationds");
        const reqDoc = await requisationds.findById(requestId);

        if (!reqDoc) return res.status(404).json({ message: "Requisition not found" });

        const allotmentQty = Number(quantity);
        const remainingQty = reqDoc.quantity - allotmentQty;

        if (remainingQty > 0) {
            // Partial Allotment: Decrease requested quantity, keep status Pending
            reqDoc.quantity = remainingQty;
            reqDoc.reqstatus = 'Pending';
            reqDoc.allotted = (reqDoc.allotted || 0) + allotmentQty;
            await reqDoc.save();
        } else {
            // Full Allotment
            reqDoc.reqstatus = "Allotted";
            reqDoc.allotted = (reqDoc.allotted || 0) + allotmentQty; // Ensure cumulative if multiple partials happen (though logic suggests otherwise if quantity reduced)
            // If quantity is reduced, then original total is lost. 
            // If we reduce quantity, then 'allotted' tracking becomes tricky relative to 'original'.
            // But if we just want to track 'total given against this ID', this works.
            reqDoc.allotdate = new Date();
            await reqDoc.save();
        }

        // 3. Add to Stock Register (Outgoing)
        await stockregisterds.create({
            name: "Item Allotment",
            user: userId,
            colid: colid,
            storeid: storeId,
            itemid: storeItem.itemcode, // Using code as ID
            quantityreturn: allotmentQty, // Outgoing
            netquantity: storeItem.quantity,
            tdate: new Date(),
            status: remainingQty > 0 ? "Partial Allotment" : "Allotted"
        });

        res.status(200).json({
            success: true,
            message: remainingQty > 0 ? `Partial Allotted. Remaining Request: ${remainingQty}` : "Item Allotted Successfully"
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error allotting item", error: error.message });
    }
};
