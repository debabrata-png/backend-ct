const Inward = require('./../Models/pinward');
const Quality = require('./../Models/pquality');
const PO = require('./../Models/ppo');

/* ================= GET DELIVERY (QUALITY) ================= */
exports.qualityByPO = async (req, res) => {
  const data = await Quality.find({ poid: req.query.poid });
  res.json(data);
};

/* ================= CREATE INWARD ================= */
exports.inwardCreate = async (req, res) => {

  // 🚫 Prevent duplicate IGP for same delivery
  const existing = await Inward.findOne({
    qualityid: req.body.qualityid
  });

  if (existing) {
    return res.status(400).json({ msg: 'Inward already created for this delivery' });
  }

  const po = await PO.findById(req.body.poid).populate('vendorid');

  const data = await Inward.create({
    ...req.body,
    vendorname: po.vendorid?.vendorname
  });

  res.json(data);
};

/* ================= GET INWARD ================= */
exports.inwardByPO = async (req, res) => {
  const data = await Inward.find({ poid: req.query.poid });
  res.json(data);
};