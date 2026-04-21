const Vendor = require('./../Models/pvendor');
const RFP = require('./../Models/prfp');
const RFPVendorMap = require('./../Models/prfpvendormap');

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