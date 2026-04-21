const Negotiation = require('./../Models/pnegotiation');
const FinalPrice = require('./../Models/pfinalprice');
const Vendor = require('./../Models/prfpvendor');

/* ================= GET VENDORS FOR RFP ================= */
exports.vendorByRfp = async (req, res) => {
  const data = await Vendor.find({ rfpid: req.query.rfpid });
  res.json(data);
};

/* ================= NEGOTIATION ================= */
exports.negCreate = async (req, res) => {
  const n = await Negotiation.create(req.body);
  res.json(n);
};

exports.negGet = async (req, res) => {
  const data = await Negotiation.find({
    rfpid: req.query.rfpid,
    vendorid: req.query.vendorid
  }).sort({ date: -1 });

  res.json(data);
};

/* ================= FINAL PRICE ================= */
exports.finalPriceSave = async (req, res) => {
  const { rfpid, vendorid } = req.body;

  let existing = await FinalPrice.findOne({ rfpid, vendorid });

  if (existing) {
    existing.items = req.body.items;
    await existing.save();
    return res.json(existing);
  }

  const f = await FinalPrice.create(req.body);
  res.json(f);
};

exports.finalPriceGet = async (req, res) => {
  const data = await FinalPrice.findOne({
    rfpid: req.query.rfpid,
    vendorid: req.query.vendorid
  });

  res.json(data);
};