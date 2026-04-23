const VendorSubmission = require('./../Models/prfpvendor');

/* ================= GET COMPARISON ================= */
exports.vcomparisonGetByRFP = async (req, res) => {

  try {

    const { rfpid } = req.query;

    const data = await VendorSubmission.find({ rfpid });

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading comparison' });
  }
};