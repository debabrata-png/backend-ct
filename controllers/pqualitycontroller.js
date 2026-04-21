const Quality = require('./../Models/pquality');
const PO = require('./../Models/ppo');

/* ================= CREATE QUALITY ================= */
exports.qualityCreate = async (req, res) => {
  const data = await Quality.create(req.body);
  res.json(data);
};

/* ================= GET QUALITY BY PO ================= */
exports.qualityByPO = async (req, res) => {
  const data = await Quality.find({
    poid: req.query.poid
  });

  res.json(data);
};

/* ================= GET PO ITEMS ================= */
exports.poItems = async (req, res) => {
  const po = await PO.findById(req.query.poid);

  if (!po) return res.json([]);

  res.json(po.items);
};