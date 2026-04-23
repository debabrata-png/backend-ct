const PO = require('./../Models/ppo');

exports.vcomparisonCreatePO = async (req, res) => {

  try {

    const { rfpid, vendor } = req.body;

    const po = await PO.create({
      colid: 1,
      rfpid,
      vendorid: vendor.vendorid,
      vendorname: vendor.vendorname,
      items: vendor.items,
      total: vendor.total,
      status: 'REGISTRAR_PENDING'
    });

    res.json(po);

  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating PO' });
  }
};