const CategoryOfficer = require('./../Models/pcategoryofficer');
const FinalPrice = require('./../Models/pfinalprice');
const Vendor = require('./../Models/prfpvendor');
const RFP = require('./../Models/prfp');
const PO = require('./../Models/ppo');
const { approvePOByRole, getInitialPOStatus } = require('./poapprovalworkflow');

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
    items,
    status: await getInitialPOStatus(req.body.colid)
  });

  res.json(po);
};

/* ================= PO APPROVAL ================= */
exports.poApprove = async (req, res) => {
  try {
    const po = await PO.findById(req.params.id);
    if (!po) return res.status(404).json({ msg: 'PO not found' });

    const data = await approvePOByRole(po, req.body.role);
    res.json(data);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/* ================= GET PO ================= */
exports.poGet = async (req, res) => {
  const filter = { colid: req.query.colid };
  if (req.query.role) filter.status = `${String(req.query.role || '').trim()}_PENDING`;

  const data = await PO.find(filter)
    .populate('rfpid vendorid categoryid');

  res.json(data);
};
