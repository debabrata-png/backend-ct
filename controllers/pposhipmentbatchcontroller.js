const mongoose = require('mongoose');
const PO = require('./../Models/ppo');
const Stock = require('./../Models/pstock');
const POShipmentBatch = require('./../Models/pposhipmentbatch');

const approvedPOFilter = (colid) => ({
  colid,
  status: 'APPROVED'
});

const getVendorName = (po) => (
  po?.vendorname || po?.vendorid?.vendorname || po?.vendorid?.name || ''
);

const getPOItem = (po, itemname) => (
  (po.items || []).find((item) => item.itemname === itemname)
);

const getScheduledQuantity = async (poid, itemname, excludeId) => {
  const match = {
    poid: new mongoose.Types.ObjectId(poid),
    itemname,
    status: { $ne: 'Cancelled' }
  };

  if (excludeId) {
    match._id = { $ne: new mongoose.Types.ObjectId(excludeId) };
  }

  const totals = await POShipmentBatch.aggregate([
    { $match: match },
    { $group: { _id: null, total: { $sum: '$expectedqty' } } }
  ]);

  return totals[0]?.total || 0;
};

exports.approvedPOs = async (req, res) => {
  try {
    const data = await PO.find(approvedPOFilter(Number(req.query.colid)))
      .populate('vendorid')
      .sort({ createdAt: -1 });

    res.json(data.map((po) => ({
      _id: po._id,
      title: po.title,
      vendorname: getVendorName(po),
      status: po.status,
      items: po.items || []
    })));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getByPO = async (req, res) => {
  try {
    const data = await POShipmentBatch.find({
      colid: Number(req.query.colid),
      poid: req.query.poid
    }).sort({ expecteddate: 1, createdAt: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createBatch = async (req, res) => {
  try {
    const { poid, itemname, expectedqty } = req.body;
    const qty = Number(expectedqty);

    if (!poid || !itemname || !qty || qty <= 0) {
      return res.status(400).json({ msg: 'PO, item and expected quantity are required' });
    }

    const po = await PO.findOne({
      _id: poid,
      ...approvedPOFilter(Number(req.body.colid))
    });

    if (!po) return res.status(400).json({ msg: 'Only approved PO can be scheduled' });

    const item = getPOItem(po, itemname);
    if (!item) return res.status(400).json({ msg: 'Item not found in PO' });

    const alreadyScheduled = await getScheduledQuantity(poid, itemname);
    const poQuantity = Number(item.quantity || 0);

    if (alreadyScheduled + qty > poQuantity) {
      return res.status(400).json({
        msg: `Scheduled quantity cannot exceed PO quantity. Remaining quantity is ${Math.max(poQuantity - alreadyScheduled, 0)}`
      });
    }

    const data = await POShipmentBatch.create({
      colid: Number(req.body.colid),
      poid,
      itemname,
      description: item.description || req.body.description || '',
      poquantity: poQuantity,
      expecteddate: req.body.expecteddate,
      expectedqty: qty,
      status: 'Expected',
      checked: 'Not checked',
      remarks: req.body.remarks || '',
      user: req.body.user || ''
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.receiveBatch = async (req, res) => {
  try {
    const batch = await POShipmentBatch.findOne({
      _id: req.body.id,
      colid: Number(req.body.colid)
    });

    if (!batch) return res.status(404).json({ msg: 'Shipment batch not found' });

    const receivedQty = Number(req.body.receivedqty);
    if (!receivedQty || receivedQty <= 0) {
      return res.status(400).json({ msg: 'Received quantity is required' });
    }

    if (receivedQty > Number(batch.expectedqty || 0)) {
      return res.status(400).json({ msg: 'Received quantity cannot be more than expected quantity' });
    }

    batch.receivedqty = receivedQty;
    batch.checked = req.body.checked || 'Not checked';
    batch.remarks = req.body.remarks || batch.remarks;
    batch.vehicleno = req.body.vehicleno || batch.vehicleno;
    batch.drivername = req.body.drivername || batch.drivername;
    batch.transporter = req.body.transporter || batch.transporter;
    batch.status = 'Received';
    batch.receivedby = req.body.receivedby || '';
    batch.receiveddate = new Date();

    await batch.save();
    res.json(batch);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createGatePass = async (req, res) => {
  try {
    const batch = await POShipmentBatch.findOne({
      _id: req.body.id,
      colid: Number(req.body.colid)
    }).populate({
      path: 'poid',
      populate: { path: 'vendorid' }
    });

    if (!batch) return res.status(404).json({ msg: 'Shipment batch not found' });
    if (batch.status !== 'Received') {
      return res.status(400).json({ msg: 'Gate pass can be created only after receiving the shipment' });
    }

    if (!req.body.vehicleno || !req.body.drivername) {
      return res.status(400).json({ msg: 'Vehicle no and driver name are required' });
    }

    batch.vehicleno = req.body.vehicleno;
    batch.drivername = req.body.drivername;
    batch.transporter = req.body.transporter || '';
    batch.gatepassremarks = req.body.gatepassremarks || '';
    await batch.save();

    await batch.populate({
      path: 'poid',
      populate: { path: 'vendorid' }
    });

    res.json(batch);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateInspection = async (req, res) => {
  try {
    const batch = await POShipmentBatch.findOne({
      _id: req.body.id,
      colid: Number(req.body.colid)
    }).populate('poid');

    if (!batch) return res.status(404).json({ msg: 'Shipment batch not found' });
    if (batch.status !== 'Received') {
      return res.status(400).json({ msg: 'Only received shipments can be inspected' });
    }

    const acceptedqty = Number(req.body.acceptedqty || 0);
    const returnedqty = Number(req.body.returnedqty || 0);
    const receivedqty = Number(batch.receivedqty || 0);

    if (acceptedqty < 0 || returnedqty < 0) {
      return res.status(400).json({ msg: 'Accepted and returned quantities cannot be negative' });
    }

    if (acceptedqty + returnedqty > receivedqty) {
      return res.status(400).json({ msg: 'Accepted plus returned quantity cannot exceed received quantity' });
    }

    if (acceptedqty > 0 && !req.body.storeid) {
      return res.status(400).json({ msg: 'Store is required for accepted stock' });
    }

    const po = batch.poid;
    if (!po) return res.status(404).json({ msg: 'PO not found' });

    const previousPostedQty = Number(batch.stockpostedqty || 0);
    const delta = acceptedqty - previousPostedQty;

    if (delta !== 0) {
      const filter = {
        colid: Number(req.body.colid),
        storeid: req.body.storeid,
        categoryid: po.categoryid,
        itemname: batch.itemname
      };

      const stock = await Stock.findOne(filter);
      if (stock) {
        stock.quantity = Number(stock.quantity || 0) + delta;
        if (stock.quantity < 0) {
          return res.status(400).json({ msg: 'Stock cannot be reduced below zero' });
        }
        await stock.save();
      } else {
        if (delta < 0) {
          return res.status(400).json({ msg: 'Stock record not found for adjustment' });
        }
        await Stock.create({
          ...filter,
          quantity: delta
        });
      }
    }

    batch.acceptedqty = acceptedqty;
    batch.returnedqty = returnedqty;
    batch.stockpostedqty = acceptedqty;
    batch.storeid = req.body.storeid || batch.storeid;
    batch.inspectionremarks = req.body.inspectionremarks || '';

    if (returnedqty > 0) {
      batch.goodsreturnno = batch.goodsreturnno || `GRN-${Date.now()}`;
      batch.outwardgatepassno = batch.outwardgatepassno || `OGP-${Date.now()}`;
      batch.returndate = batch.returndate || new Date();
    }

    await batch.save();

    await batch.populate([
      { path: 'poid', populate: { path: 'vendorid categoryid' } },
      { path: 'storeid' }
    ]);

    res.json(batch);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
