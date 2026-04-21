const GRN = require('./../Models/pgrn');
const Quality = require('./../Models/pquality');

/* ================= GET DELIVERY HISTORY ================= */
exports.qualityByPO = async (req, res) => {
  const data = await Quality.find({ poid: req.query.poid });
  res.json(data);
};

/* ================= CREATE GRN ================= */
exports.grnCreate = async (req, res) => {
  const data = await GRN.create(req.body);
  res.json(data);
};

/* ================= GET GRN ================= */
exports.grnByPO = async (req, res) => {
  const data = await GRN.find({ poid: req.query.poid });
  res.json(data);
};

exports.grnByPO1 = async (req, res) => {
    const data = await GRN.find({ poid: req.query.poid })
      .populate('poid');
  
    res.json(data);
  };