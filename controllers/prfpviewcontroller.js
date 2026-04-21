const RFP = require('./../Models/prfp');

/* ================= GET ALL RFP ================= */
exports.getRFPList = async (req, res) => {
  try {
    const data = await RFP.find({ colid: req.query.colid })
      .populate('storeid')
      .populate('categoryid')
      .sort({ createdAt: -1 });

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading RFPs' });
  }
};


/* ================= GET SINGLE RFP ================= */
exports.getRFPById = async (req, res) => {
  try {
    const data = await RFP.findById(req.query.id)
      .populate('storeid')
      .populate('categoryid');

    if (!data) {
      return res.status(404).json({ msg: 'RFP not found' });
    }

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading RFP details' });
  }
};