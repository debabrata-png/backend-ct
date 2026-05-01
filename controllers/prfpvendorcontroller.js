const Vendor = require('./../Models/pvendor');
const RFP = require('./../Models/prfp');
const RFPVendorMap = require('./../Models/prfpvendormap');
const PO = require('./../Models/ppo');

/* ================= GET RFP LIST ================= */
exports.vendormappGetRFPList = async (req, res) => {

  const data = await RFP.find({ colid: req.query.colid })
    .populate('categoryid')
    .sort({ createdAt: -1 });

  res.json(data);
};


/* ================= GET RFP BY ID ================= */
exports.vendormappGetRFPById = async (req, res) => {

  const data = await RFP.findById(req.query.id)
    .populate('categoryid')
    .populate('storeid');

  res.json(data);
};


/* ================= GET VENDORS BY CATEGORY ================= */
exports.vendormappGetVendors = async (req, res) => {

  const data = await Vendor.find({
    colid: req.query.colid,
    categoryid: req.query.categoryid
  });

  res.json(data);
};


/* ================= SAVE VENDOR MAP ================= */
exports.vendormappSave = async (req, res) => {

  const { colid, rfpid, categoryid, vendors } = req.body;

  await RFPVendorMap.deleteMany({ rfpid });

  const data = await RFPVendorMap.create({
    colid,
    rfpid,
    categoryid,
    vendors
  });

  res.json(data);
};


/* ================= GET SAVED MAP ================= */
exports.vendormappGetByRFP = async (req, res) => {

  const data = await RFPVendorMap.findOne({
    rfpid: req.query.rfpid
  });

  res.json(data || { vendors: [] });
};

/* ================= GET PAST PO BY VENDOR ================= */
exports.vendormappGetPastPOByVendor = async (req, res) => {
  try {
    const { colid, vendorid } = req.query;

    if (!colid || !vendorid) {
      return res.status(400).json({ msg: 'colid and vendorid are required' });
    }

    const data = await PO.find({
      colid,
      vendorid
    })
      .populate('rfpid vendorid categoryid')
      .sort({ createdAt: -1 });

    res.json(data.map((po) => {
      const rfpid = po.rfpid?._id ? po.rfpid._id.toString() : String(po.rfpid || '');

      return {
        _id: po._id,
        poid: po._id,
        title: po.title || '',
        rfpid,
        rfp: po.rfpid?.title || rfpid,
        rfptitle: po.rfpid?.title || '',
        category: po.categoryid?.categoryname || '',
        vendorname: po.vendorname || po.vendorid?.vendorname || '',
        vendoremail: po.vendorid?.email || '',
        vendorphone: po.vendorid?.phone || '',
        transport: po.transport,
        loadingfees: po.loadingfees,
        pandffees: po.pandffees,
        gst: po.gst,
        total: po.total,
        remark: po.remark,
        items: po.items || [],
        status: po.status,
        createdAt: po.createdAt
      };
    }));
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading past POs' });
  }
};
