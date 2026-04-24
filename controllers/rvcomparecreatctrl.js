const PO = require('./../Models/ppo');
const VendorSubmission = require('./../Models/prfpvendor');
const RFP = require('./../Models/prfp');

exports.vcomparisonCreatePO = async (req, res) => {

  try {

    const { rfpid, vendor, colid } = req.body;

    const po = await PO.create({
      colid: colid,
      rfpid,
      vendorid: vendor.vendorid,
      vendorname: vendor.vendorname,
      items: vendor.items,
      total: vendor.total,
      status: 'REGISTRAR_PENDING'
    });

    console.log(po);

    res.json(po);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating PO' });
  }
};


exports.vcomparisonGetFull = async (req, res) => {

  try {

    const { rfpid } = req.query;

    const submissions = await VendorSubmission.find({ rfpid });

    const rfp = await RFP.findById(rfpid);

    res.json({
      submissions,
      rfp
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading comparison' });
  }
};

exports.vcomparisonCreatePOPerItem = async (req, res) => {

  try {

    const { rfpid, item, vendor, colid } = req.body;

    if (!rfpid || !item || !vendor) {
      return res.status(400).json({ msg: 'Missing data' });
    }

    /* 🔥 CREATE ONE PO PER ITEM */
    const po = await PO.create({

      colid: colid,

      rfpid,

      vendorid: vendor.vendorid,
      vendorname: vendor.vendorname,

      items: [
        {
          itemname: item.itemname,
          quantity: item.quantity,
          price: item.price,
          description: item.description
        }
      ],

      transport: vendor.transport,
      loadingfees: vendor.loadingfees,
      pandffees: vendor.pandffees,
      gst: vendor.gst,
      total: vendor.total,
      remark: vendor.remark,

      status: 'REGISTRAR_PENDING'
    });

    res.json(po);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating PO' });
  }
};

/* ================= GET CREATED PO ================= */
exports.vpoGet = async (req, res) => {

  const data = await PO.find({ rfpid: req.query.rfpid });

  res.json(data);
};


/* ================= RFP LIST ================= */
exports.vrfpGet = async (req, res) => {

  const data = await RFP.find({ colid: req.query.colid });

  res.json(data);
};


exports.vcomparisonCreateAllL1PO = async (req, res) => {

  try {

    const { rfpid, items, colid } = req.body;

    let created = [];

    for (let row of items) {

      const vendor = row.vendorPrices[row.selectedVendor];

      const po = await PO.create({

        colid: colid,

        rfpid,

        vendorid: vendor.vendorid,
        vendorname: vendor.vendorname,

        items: [
          {
            itemname: row.itemname,
            quantity: row.quantity,
            price: vendor.price,
            description: row.description
          }
        ],

        transport: vendor.transport,
        loadingfees: vendor.loadingfees,
        pandffees: vendor.pandffees,
        gst: vendor.gst,
        total: vendor.total,
        remark: vendor.remark,

        status: 'REGISTRAR_PENDING'
      });

      created.push(po);
    }

    res.json({ msg: 'All L1 POs created', created });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating L1 POs' });
  }
};

exports.vcomparisonCreateVendorGroupedPO = async (req, res) => {

  try {

    const { rfpid, items, colid } = req.body;

    let vendorMap = {};

    /* GROUP ITEMS BY SELECTED VENDOR */
    items.forEach(row => {

      const v = row.vendorPrices[row.selectedVendor];

      if (!vendorMap[v.vendorid]) {

        vendorMap[v.vendorid] = {
          vendorid: v.vendorid,
          vendorname: v.vendorname,
          transport: v.transport,
          loadingfees: v.loadingfees,
          pandffees: v.pandffees,
          gst: v.gst,
          total: v.total,
          remark: v.remark,
          items: []
        };
      }

      vendorMap[v.vendorid].items.push({
        itemname: row.itemname,
        quantity: row.quantity,
        price: v.price,
        description: row.description
      });

    });

    let created = [];

    /* CREATE ONE PO PER VENDOR */
    for (let key in vendorMap) {

      const v = vendorMap[key];

      const po = await PO.create({
        colid: colid,
        rfpid,
        vendorid: v.vendorid,
        vendorname: v.vendorname,
        items: v.items,
        transport: v.transport,
        loadingfees: v.loadingfees,
        pandffees: v.pandffees,
        gst: v.gst,
        total: v.total,
        remark: v.remark,
        status: 'REGISTRAR_PENDING'
      });

      created.push(po);
    }

    res.json({ msg: 'Vendor grouped PO created', created });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating grouped PO' });
  }
};