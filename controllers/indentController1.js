const Store = require('./../Models/pstore');
const Category = require('./../Models/pcategory');
const Budget = require('./../Models/pbudget');
const Indent = require('./../Models/pindent');
const IndIndentApprovalRole = require('./../Models/indindentapprovalrole');

const fallbackApprovalRoles = ['HOD', 'REGISTRAR', 'ACCOUNTS', 'MANAGEMENT'];

const normalizeRole = (value) => String(value || '').trim();

const getApprovalRoles = async (colid) => {
  const roles = await IndIndentApprovalRole.find({
    colid: Number(colid),
    isactive: { $ne: 'No' }
  }).sort({ level: 1, role: 1 });

  if (roles.length) {
    return roles.map((item) => normalizeRole(item.role)).filter(Boolean);
  }

  return fallbackApprovalRoles;
};

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
  try {
    const roles = await getApprovalRoles(req.body.colid);
    const firstRole = roles[0] || fallbackApprovalRoles[0];
    const i = await Indent.create({
      ...req.body,
      status: `${firstRole}_PENDING`
    });
    res.json(i);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.indentGet = async (req, res) => {
  const filter = { colid: req.query.colid };
  if (req.query.status) filter.status = req.query.status;
  if (req.query.role) filter.status = `${normalizeRole(req.query.role)}_PENDING`;
  if (req.query.user) filter.user = req.query.user;

  const data = await Indent.find(filter)
    .populate('storeid categoryid');

  res.json(data);
};

exports.indentApprove = async (req, res) => {
  try {
    const currentRole = normalizeRole(req.body.role);
    const indent = await Indent.findById(req.params.id);

    if (!indent) return res.status(404).json({ msg: 'Not found' });

    const roles = await getApprovalRoles(indent.colid);
    const currentIndex = roles.findIndex((role) => role.toLowerCase() === currentRole.toLowerCase());

    if (currentIndex === -1) {
      return res.status(400).json({ msg: 'Role is not configured for indent approval' });
    }

    const expectedStatus = `${roles[currentIndex]}_PENDING`;
    if (indent.status !== expectedStatus) {
      return res.status(400).json({ msg: `Indent is pending at ${indent.status}` });
    }

    const nextRole = roles[currentIndex + 1];
    indent.status = nextRole ? `${nextRole}_PENDING` : 'APPROVED';

    if (!nextRole) {
      const b = await Budget.findById(indent.budgetid);
      if (b) {
        b.quantityremaining -= indent.quantity;
        await b.save();
      }
    }

    await indent.save();
    res.json(indent);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
