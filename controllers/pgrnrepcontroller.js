const PO = require('./../Models/ppo');
const Quality = require('./../Models/pquality');
const GRN = require('./../Models/pgrn');

/* ================= PO VS RECEIVED ================= */
exports.poVsReceived = async (req, res) => {
  const { poid } = req.query;

  const po = await PO.findById(poid);
  if (!po) return res.json([]);

  /* ===== QUALITY TOTAL ===== */
  const quality = await Quality.find({ poid });

  const qualityMap = {};
  quality.forEach(q => {
    q.items.forEach(i => {
      if (!qualityMap[i.itemname]) qualityMap[i.itemname] = 0;
      qualityMap[i.itemname] += Number(i.receivedqty || 0);
    });
  });

  /* ===== GRN TOTAL ===== */
  const grns = await GRN.find({ poid });

  const grnMap = {};
  grns.forEach(g => {
    g.items.forEach(i => {
      if (!grnMap[i.itemname]) grnMap[i.itemname] = 0;
      grnMap[i.itemname] += Number(i.receivedqty || 0);
    });
  });

  /* ===== MERGE ===== */
  const result = po.items.map(i => {
    const ordered = Number(i.quantity || 0);
    const qualityReceived = qualityMap[i.itemname] || 0;
    const grnReceived = grnMap[i.itemname] || 0;

    return {
      itemname: i.itemname,
      ordered,
      qualityReceived,
      grnReceived,
      balance: ordered - grnReceived
    };
  });

  res.json(result);
};