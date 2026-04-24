const PO = require('./../Models/ppo');
const Vendor = require('./../Models/pvendor');

exports.vpoGet = async (req, res) => {

  const data = await PO.find({ rfpid: req.query.rfpid });

  res.json(data);
};



exports.vpoGetFull = async (req, res) => {

  try {

    const { poid } = req.query;

    const po = await PO.findById(poid);

    const vendor = await Vendor.findOne({
    //   vendorid: po.vendorid
    _id: po.vendorid
    });

    res.json({ po, vendor });

  } catch (e) {
    res.status(500).json({ msg: 'Error' });
  }
};

// const PO = require('./ppo');
// const Vendor = require('./pvendor');

exports.vpoGetFull1 = async (req, res) => {

  try {

    const { poid } = req.query;

    const po = await PO.findById(poid);

    if (!po) {
      return res.status(404).json({ msg: 'PO not found' });
    }

    /* 🔥 FIX: FORCE STRING MATCH */
    const vendor = await Vendor.findOne({
      vendorid: String(po.vendorid)
    });

    /* 🔥 FALLBACK (VERY IMPORTANT) */
    if (!vendor) {
      console.log('Vendor not found for vendorid:', po.vendorid);
    }

    res.json({ po, vendor });

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading PO details' });
  }
};