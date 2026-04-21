const RFP = require('./../Models/prfp');
const Vendor = require('./../Models/prfpvendor');
const Indent = require('./../Models/pindent');

/* ================= APPROVED INDENTS ================= */
exports.indentApproved = async (req, res) => {
  const { colid, storeid } = req.query;

  const data = await Indent.find({
    colid,
    storeid,
    status: 'APPROVED'
  });

  res.json(data);
};

/* ================= RFP ================= */
exports.rfpCreate = async (req, res) => {
  const r = await RFP.create(req.body);
  res.json(r);
};

exports.rfpGet = async (req, res) => {
  const data = await RFP.find({ colid: req.query.colid })
    .populate('storeid categoryid');

  res.json(data);
};

/* ================= VENDOR ================= */
exports.vendorSubmit = async (req, res) => {
  const v = await Vendor.create(req.body);
  res.json(v);
};

exports.vendorGet = async (req, res) => {
  const data = await Vendor.find({ rfpid: req.query.rfpid });
  res.json(data);
};