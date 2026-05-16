const Budget = require('./../Models/pbudget');
const IndBudgetApprovalRole = require('./../Models/indbudgetapprovalrole');
const { createBudgetLog } = require('./indbudgetlogcontroller');

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

const actorFromBody = (body = {}) => ({
  username: body.username || body.name || '',
  useremail: body.useremail || body.user || '',
  department: body.userdepartment || body.department || ''
});

const writeBudgetLog = async ({ budget, action, oldstatus = '', newstatus = '', actor = {}, remarks = '' }) => {
  try {
    const populated = await Budget.findById(budget._id)
      .populate('storeid')
      .populate('categoryid');

    if (!populated) return;

    await createBudgetLog({
      colid: populated.colid,
      budgetid: populated._id,
      academicyear: populated.academicyear,
      username: actor.username || '',
      useremail: actor.useremail || '',
      department: actor.department || populated.department || '',
      category: populated.categoryid?.categoryname || '',
      categoryid: populated.categoryid?._id?.toString() || populated.categoryid?.toString() || '',
      store: populated.storeid?.storename || '',
      storeid: populated.storeid?._id?.toString() || populated.storeid?.toString() || '',
      item: populated.itemname,
      quantity: populated.quantity,
      amount: populated.price,
      action,
      oldstatus,
      newstatus,
      remarks
    });
  } catch (err) {
    console.error('Budget log error:', err.message);
  }
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
    await writeBudgetLog({
      budget: data,
      action: 'Apply',
      newstatus: data.status,
      actor: actorFromBody(req.body),
      remarks: req.body.remarks || ''
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
    const { colid, status, role, storeid, academicyear } = req.query;
  
    let filter = { colid };
    if (status) filter.status = status;
    if (role) filter.status = `${normalizeRole(role)}_PENDING`;
    if (storeid) filter.storeid = storeid;
    if (academicyear) filter.academicyear = academicyear;
  
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

    await writeBudgetLog({
      budget: data,
      action: 'Approve',
      oldstatus: budget.status,
      newstatus: nextStatus,
      actor: actorFromBody(req.body),
      remarks: req.body.remarks || ''
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// REJECT
exports.indRejectBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    const data = await Budget.findByIdAndUpdate(
      req.params.id,
      { status: 'REJECTED' },
      { new: true }
    );

    await writeBudgetLog({
      budget: data,
      action: 'Reject',
      oldstatus: budget?.status || '',
      newstatus: 'REJECTED',
      actor: actorFromBody(req.body),
      remarks: req.body.remarks || ''
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
