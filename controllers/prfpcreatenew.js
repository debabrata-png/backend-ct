const RFP = require('./../Models/prfp');
const Indent = require('./../Models/pindent');

const Store = require('./../Models/pstore');

/* =========================================
   GET ALL STORES
========================================= */
exports.vstoreGetAll = async (req, res) => {

  try {

    const data = await Store.find({
      colid: req.query.colid
    });

    res.json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: 'Error loading stores'
    });
  }
};

exports.vrfpGetApprovedIndentsByCategory = async (req, res) => {
  try {
    const data = await Indent.find({
      colid: req.query.colid,
      categoryid: req.query.categoryid,
      status: 'APPROVED'
    })
    .populate('storeid')
    .populate('categoryid');

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error loading approved indents' });
  }
};

exports.vrfpCreate = async (req, res) => {
  try {
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({ msg: 'No approved indents selected' });
    }

    const data = await RFP.create({
      colid: req.body.colid,
      storeid: req.body.storeid,
      categoryid: req.body.categoryid,

      title: req.body.title,
      expirydate: req.body.expirydate,
      prequalification: req.body.prequalification,

      creatorname: req.body.creatorname,
      creatoremail: req.body.creatoremail,

      terms: req.body.terms,
      costterms: req.body.costterms,
      deliveryterms: req.body.deliveryterms,
      paymentterms: req.body.paymentterms,

      items: req.body.items.map(i => ({
        indentid: i.indentid,
        itemname: i.itemname,
        quantity: i.quantity,
        description: i.description
      })),

      status: 'OPEN'
    });

    const indentIds = req.body.items.map(i => i.indentid).filter(Boolean);

    await Indent.updateMany(
      {
        _id: { $in: indentIds },
        colid: req.body.colid,
        status: 'APPROVED'
      },
      { status: 'RFP_CREATED' }
    );

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Error creating RFP' });
  }
};

exports.vrfpGetAll = async (req, res) => {
  try {
    const data = await RFP.find({
      colid: req.query.colid
    })
    .populate('storeid')
    .populate('categoryid');

    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'Error loading RFPs' });
  }
};

exports.vrfpGetByCategory = async (req, res) => {
  try {
    const data = await RFP.find({
      colid: req.query.colid,
      categoryid: req.query.categoryid
    })
    .populate('storeid')
    .populate('categoryid');

    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'Error loading category RFPs' });
  }
};

exports.vrfpGetOne = async (req, res) => {
  try {
    const data = await RFP.findById(req.query.id)
      .populate('storeid')
      .populate('categoryid')
      .populate('items.indentid');

    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'Error loading RFP details' });
  }
};

exports.vrfpClose = async (req, res) => {
  try {
    const data = await RFP.findByIdAndUpdate(
      req.body.id,
      { status: 'CLOSED' },
      { new: true }
    );

    res.json(data);
  } catch (e) {
    res.status(500).json({ msg: 'Error closing RFP' });
  }
};
