const Store = require('./../Models/pstore');
const Category = require('./../Models/pcategory');
const Budget = require('./../Models/pbudget');
const Indent = require('./../Models/pindent');

/* ================= STORE ================= */
exports.storeCreate = async (req, res) => {
  const data = await Store.create(req.body);
  res.json(data);
};

exports.storeGet = async (req, res) => {
  const data = await Store.find({ colid: req.query.colid });
  res.json(data);
};

/* ================= CATEGORY ================= */
exports.categoryCreate = async (req, res) => {
  const data = await Category.create(req.body);
  res.json(data);
};

exports.categoryGet = async (req, res) => {
  const data = await Category.find({ colid: req.query.colid });
  res.json(data);
};

/* ================= BUDGET ================= */
exports.budgetCreate = async (req, res) => {
  const b = await Budget.create(req.body);
  res.json(b);
};

exports.budgetAvailable = async (req, res) => {
  const { colid, storeid, categoryid } = req.query;

  const data = await Budget.find({
    colid,
    storeid,
    categoryid,
    status: 'APPROVED',
    quantityremaining: { $gt: 0 }
  });

  res.json(data);
};

/* ================= INDENT ================= */
exports.indentCreate = async (req, res) => {
  const i = await Indent.create(req.body);
  res.json(i);
};

exports.indentGet = async (req, res) => {
  const data = await Indent.find({ colid: req.query.colid })
    .populate('storeid categoryid');

  res.json(data);
};

exports.indentApprove = async (req, res) => {
  const { role } = req.body;
  const indent = await Indent.findById(req.params.id);

  if (!indent) return res.status(404).json({ msg: 'Not found' });

  if (role === 'HOD' && indent.status === 'HOD_PENDING')
    indent.status = 'REGISTRAR_PENDING';

  else if (role === 'REGISTRAR' && indent.status === 'REGISTRAR_PENDING')
    indent.status = 'ACCOUNTS_PENDING';

  else if (role === 'ACCOUNTS' && indent.status === 'ACCOUNTS_PENDING')
    indent.status = 'MANAGEMENT_PENDING';

  else if (role === 'MANAGEMENT' && indent.status === 'MANAGEMENT_PENDING') {
    indent.status = 'APPROVED';

    // 🔥 reduce budget
    const b = await Budget.findById(indent.budgetid);
    if (b) {
      b.quantityremaining -= indent.quantity;
      await b.save();
    }
  }

  await indent.save();
  res.json(indent);
};