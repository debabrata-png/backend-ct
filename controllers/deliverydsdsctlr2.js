const deliverydsds2 = require('../Models/deliverydsds2');
const storepoorderds2 = require('../Models/storepoorderds2');
const storeitemds2 = require('../Models/storeitemds2');
const stockregisterds2 = require('../Models/stockregisterds2');

exports.adddeliverydsds2 = async (req, res) => {
    try {
        const newDelivery = await deliverydsds2.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                delivery: newDelivery
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updatedeliverydsds2 = async (req, res) => {
    try {
        const delivery = await deliverydsds2.findByIdAndUpdate(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                delivery
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deletedeliverydsds2 = async (req, res) => {
    try {
        await deliverydsds2.findByIdAndDelete(req.query.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getalldeliverydsds2 = async (req, res) => {
    try {
        const deliveries = await deliverydsds2.find();
        res.status(200).json({
            status: 'success',
            results: deliveries.length,
            data: {
                deliveries
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getdeliverydsdsbyid2 = async (req, res) => {
    try {
        const delivery = await deliverydsds2.findById(req.query.id);
        res.status(200).json({
            status: 'success',
            data: {
                delivery
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

// Workflow: Mark Delivered (Full PO with Partial Returns)
exports.markDelivered2 = async (req, res) => {
    try {
        const { poid_str, po_db_id, receivedby, note, doclink, user, colid, name, deliveryDetails } = req.body;
        // deliveryDetails: Array of { itemid (PO Item ID), itemcode, receivedQty, returnedQty, price, discount, itemtype, itemname }

        if (!deliveryDetails || !Array.isArray(deliveryDetails) || deliveryDetails.length === 0) {
            return res.status(400).json({ status: 'fail', message: 'No delivery details provided' });
        }

        const storeitemds2 = require('../Models/storeitemds2');
        const stockregisterds2 = require('../Models/stockregisterds2');
        const storepoorderds2 = require('../Models/storepoorderds2');
        const storeMaster = require('../Models/storemasterds2');

        let totalAcceptedValue = 0;
        let totalReturnedValue = 0;
        let totalNetValue = 0; // Should match original PO total if all items accounted for

        // Fetch Default Store for this college (if needed)
        const anyStore = await storeMaster.findOne({ colid: colid });
        const defaultStoreId = anyStore?._id;

        for (const detail of deliveryDetails) {
            const qtyReceived = Number(detail.receivedQty) || 0;
            const qtyReturned = Number(detail.returnedQty) || 0;
            const price = Number(detail.price) || 0;
            // Assuming simplified calc (price * qty), ignoring discount for return value specific logic unless requested
            // If price is unit price:

            const itemTotal = (qtyReceived + qtyReturned) * price;
            const acceptedVal = qtyReceived * price;
            const returnedVal = qtyReturned * price;

            totalNetValue += itemTotal;
            totalAcceptedValue += acceptedVal;
            totalReturnedValue += returnedVal;

            if (qtyReceived > 0) {
                // Fetch Item Master to ensure correct Code/Name
                const itemMaster = require('../Models/itemmasterds2');
                const masterItem = await itemMaster.findById(detail.itemid);

                const finalItemCode = masterItem ? masterItem.itemcode : detail.itemcode;
                const finalItemName = masterItem ? masterItem.itemname : detail.itemname;
                const finalItemType = masterItem ? masterItem.itemtype : (detail.itemtype || 'N/A');

                // Update/Create Store Inventory
                const existingStoreItem = await storeitemds2.findOne({ itemcode: finalItemCode, colid: colid });
                let targetStoreId;

                if (existingStoreItem) {
                    targetStoreId = existingStoreItem.storeid;
                    await storeitemds2.findByIdAndUpdate(existingStoreItem._id, { $inc: { quantity: qtyReceived } });
                } else if (defaultStoreId) {
                    targetStoreId = defaultStoreId;
                    await storeitemds2.create({
                        storeid: targetStoreId,
                        storename: anyStore.storename,
                        itemcode: finalItemCode,
                        itemname: finalItemName,
                        quantity: qtyReceived,
                        type: finalItemType,
                        user: user,
                        colid: colid,
                        status: 'Available',
                        name: 'Auto Created'
                    });
                }


                // Stock Register
                if (targetStoreId) {
                    await stockregisterds2.create({
                        storeid: targetStoreId,
                        store: targetStoreId,
                        item: detail.itemname,
                        itemid: detail.itemcode,
                        itemtype: detail.itemtype || 'N/A',
                        quantityadded: qtyReceived,
                        quantityreturn: qtyReturned, // Log returned amt contextually if needed, but registry is mainly strictly stock movement. 
                        // However, user2 wants "quantityreturn" field usage maybe? 
                        // Usually "quantityreturn" in stock register means "returned TO stock". 
                        // Here we are just NOT adding it. 
                        // Let's stick to adding what we received. 
                        // But we can log a record for the return if the user meant "Log that we returned it to vendor"
                        // current model "quantityreturn" might be for that. Let's assume 0 for "added" line.
                        netquantity: qtyReceived,
                        user: user,
                        colid: colid,
                        stockdate: new Date(),
                        name: name
                    });
                }
            }
        }

        // 3. Update PO Status & Financials
        await storepoorderds2.findByIdAndUpdate(po_db_id, {
            postatus: 'Delivered',
            netprice: totalNetValue,
            netprice: totalNetValue,
            price: totalAcceptedValue,
            returnamount: totalReturnedValue,
            doclink: doclink
        });

        // 4. Update PO Items Status
        const storepoitemsds2 = require('../Models/storepoitemsds2');
        // We really should iterate and update each item, but typically for a full delivery we update all.
        // However, we have specific details. Let's update each item's status.
        for (const detail of deliveryDetails) {
            // detail.itemid should be the PO Item ID if passed correctly from frontend. 
            // If not, we might need to query by poid + itemcode.
            // Given the frontend sends itemid = item.itemid (which is usually the DB ID of the PO Item row from getallstorepoitemsds), we can try updating by ID.
            if (detail.itemid) {
                const updatedItem = await storepoitemsds2.findByIdAndUpdate(detail.itemid, {
                    postatus: 'Delivered'
                }, { new: true });

                // Update original Store Requisition if linked
                if (updatedItem && updatedItem.storereqid) {
                    const storerequisationds2 = require('../Models/storerequisationds2');
                    await storerequisationds2.findByIdAndUpdate(updatedItem.storereqid, { reqstatus: 'Delivered' });
                }
            }
        }

        // 4. Create Delivery Record
        const newDelivery = await deliverydsds2.create({
            poid: poid_str,
            deliveredDate: new Date(),
            receivedBy: receivedby,
            note: note,
            colid: colid,
            user: user,
            name: name,
            doclink: doclink
            // Could store JSON of detailed breakdown if schema supports it, strictly not demanded but good practice.
        });

        res.status(200).json({
            status: 'success',
            message: 'Delivery Processed Successfully with Returns',
            data: newDelivery
        });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
