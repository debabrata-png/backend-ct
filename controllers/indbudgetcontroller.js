const Budget = require('./../Models/pbudget');
const IndBudgetApprovalRole = require('./../Models/indbudgetapprovalrole');

const fallbackApprovalRoles = ['HOD', 'REGISTRAR', 'ACCOUNTS', 'MANAGEMENT'];

const normalizeRole = (value) => String(value || '').trim();

const getApprovalRoles = async (colid) => {
  const roles = await IndBudgetApprovalRole.find({
    colid: Number(colid),
    isactive: { $ne: 'No' }
  }).sort({ level: 1, role: 1 });

  if (roles.length) {
    return roles.map((item) => normalizeRole(item.role)).filter(Boolean);
  }

  return fallbackApprovalRoles;
};

// CREATE
exports.indCreateBudget = async (req, res) => {
  try {
    const roles = await getApprovalRoles(req.body.colid);
    const firstRole = roles[0] || fallbackApprovalRoles[0];
    const data = await Budget.create({
      ...req.body,
      status: `${firstRole}_PENDING`
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// GET (FILTER BY colid + status optional)
// exports.indGetBudget = async (req, res) => {
//   const { colid, status } = req.query;

//   let filter = { colid };
//   if (status) filter.status = status;

//   const data = await Budget.find(filter)
//     .populate('storeid')
//     .populate('categoryid');

//   res.json(data);
// };

exports.indGetBudget = async (req, res) => {
    const { colid, status, role, storeid } = req.query;
  
    let filter = { colid };
    if (status) filter.status = status;
    if (role) filter.status = `${normalizeRole(role)}_PENDING`;
    if (storeid) filter.storeid = storeid;
  
    const data = await Budget.find(filter)
      .populate('storeid')
      .populate('categoryid');
  
    res.json(data);
  };

// APPROVAL FLOW
exports.indApproveBudget = async (req, res) => {
  try {
    const currentRole = normalizeRole(req.body.level || req.body.role);
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ status: 'fail', message: 'Budget not found' });

    const roles = await getApprovalRoles(budget.colid);
    const currentIndex = roles.findIndex((role) => role.toLowerCase() === currentRole.toLowerCase());

    if (currentIndex === -1) {
      return res.status(400).json({ status: 'fail', message: 'Role is not configured for budget approval' });
    }

    const expectedStatus = `${roles[currentIndex]}_PENDING`;
    if (budget.status !== expectedStatus) {
      return res.status(400).json({ status: 'fail', message: `Budget is pending at ${budget.status}` });
    }

    const nextRole = roles[currentIndex + 1];
    const nextStatus = nextRole ? `${nextRole}_PENDING` : 'APPROVED';

    const data = await Budget.findByIdAndUpdate(
      req.params.id,
      { status: nextStatus },
      { new: true }
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// REJECT
exports.indRejectBudget = async (req, res) => {
  const data = await Budget.findByIdAndUpdate(
    req.params.id,
    { status: 'REJECTED' },
    { new: true }
  );

  res.json(data);
};
