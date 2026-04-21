const RFPVendorMap = require('./../Models/prfpvendormap');
const RFP = require('./../Models/prfp');

/* ================= GET RFPs FOR VENDOR ================= */
exports.vendormappGetRFPByVendor = async (req, res) => {

  try {

    const { vendorid } = req.query;

    /* FIND MAPPINGS */
    const maps = await RFPVendorMap.find({
      'vendors.vendorid': vendorid
    });

    const rfpIds = maps.map(m => m.rfpid);

    /* FETCH RFP DETAILS */
    const rfps = await RFP.find({
      _id: { $in: rfpIds }
    })
    .populate('storeid')
    .populate('categoryid');

    res.json(rfps);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading vendor RFPs' });
  }
};