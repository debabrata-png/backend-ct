const CategoryOfficer = require('./../Models/pcategoryofficer');
const FinalPrice = require('./../Models/pfinalprice');
const Vendor = require('./../Models/prfpvendor');
const RFP = require('./../Models/prfp');
const PO = require('./../Models/ppo');

/* ================= CATEGORY BY EMAIL ================= */
exports.categoryByUser = async (req, res) => {
  const data = await CategoryOfficer.find({
    colid: req.query.colid,
    email: req.query.email
  }).populate('categoryid');

  res.json(data);
};

/* ================= FINAL PRICE BY RFP ================= */
exports.finalPriceByRfp = async (req, res) => {
  const data = await FinalPrice.find({
    rfpid: req.query.rfpid
  }).populate('vendorid');

  res.json(data);
};


/* ================= RFP BY CATEGORY ================= */
exports.rfpByCategory = async (req, res) => {
    const { colid, categoryid } = req.query;
  
    const data = await RFP.find({
      colid,
      categoryid
    });
  
    res.json(data);
  };

/* ================= CREATE PO ================= */
exports.poCreate = async (req, res) => {
  const { rfpid, vendorid } = req.body;

  const rfp = await RFP.findById(rfpid);

  const final = await FinalPrice.findOne({
    rfpid,
    vendorid
  });

  const items = rfp.items.map(i => {
    const f = final.items.find(x => x.itemname === i.itemname);

    return {
      itemname: i.itemname,
      quantity: i.quantity,
      price: f?.finalprice || 0
    };
  });

  const po = await PO.create({
    ...req.body,
    items
  });

  res.json(po);
};

/* ================= PO APPROVAL ================= */
exports.poApprove = async (req, res) => {
  const { role } = req.body;

  const po = await PO.findById(req.params.id);

  if (role === 'REGISTRAR' && po.status === 'REGISTRAR_PENDING')
    po.status = 'ACCOUNTS_PENDING';

  else if (role === 'ACCOUNTS' && po.status === 'ACCOUNTS_PENDING')
    po.status = 'MANAGEMENT_PENDING';

  else if (role === 'MANAGEMENT' && po.status === 'MANAGEMENT_PENDING')
    po.status = 'APPROVED';

  await po.save();
  res.json(po);
};

/* ================= GET PO ================= */
exports.poGet = async (req, res) => {
  const data = await PO.find({ colid: req.query.colid })
    .populate('rfpid vendorid categoryid');

  res.json(data);
};