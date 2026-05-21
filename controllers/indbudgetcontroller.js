const Budget = require('./../Models/pbudget');
const IndBudgetApprovalRole = require('./../Models/indbudgetapprovalrole');
const { createBudgetLog } = require('./indbudgetlogcontroller');

const fallbackApprovalRoles = ['HOD', 'REGISTRAR', 'ACCOUNTS', 'MANAGEMENT'];

const normalizeRole = (value) => String(value || '').trim();
const normalizeMatchText = (value) => String(value || '').trim().toLowerCase();
const isWildcardValue = (value) => {
  const text = normalizeMatchText(value);
  return !text || text === 'all';
};

const roleMatchesBudget = (roleConfig, budget) => {
  const roleDepartment = normalizeMatchText(roleConfig.department);
  const budgetDepartment = normalizeMatchText(budget.department || budget.userdepartment);
  const roleAcademicYear = normalizeMatchText(roleConfig.academicyear);
  const budgetAcademicYear = normalizeMatchText(budget.academicyear);

  const departmentMatches = isWildcardValue(roleConfig.department) || roleDepartment === budgetDepartment;
  const academicYearMatches = isWildcardValue(roleConfig.academicyear) || roleAcademicYear === budgetAcademicYear;

  return departmentMatches && academicYearMatches;
};

const getApprovalRoles = async (colid, department = '', academicyear = '') => {
  const departmentText = normalizeRole(department);
  const academicYearText = normalizeRole(academicyear);
  const baseFilter = {
    colid: Number(colid),
    isactive: { $ne: 'No' }
  };

  let roles = [];
  if (departmentText || academicYearText) {
    roles = await IndBudgetApprovalRole.find({
      ...baseFilter,
      department: { $in: [departmentText, 'All', '', null] },
      academicyear: { $in: [academicYearText, 'All', '', null] }
    }).sort({ level: 1, role: 1 });
  }

  if (!roles.length) {
    roles = await IndBudgetApprovalRole.find(baseFilter).sort({ level: 1, role: 1 });
  }

  if (roles.length) {
    const seen = new Set();
    return roles.map((item) => normalizeRole(item.role)).filter(Boolean).filter((role) => {
      const key = role.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  return fallbackApprovalRoles;
};

const getMatchingRoleConfig = async (budget, roleText) => {
  const roleConfigs = await IndBudgetApprovalRole.find({
    colid: Number(budget.colid),
    isactive: { $ne: 'No' }
  }).lean();

  return roleConfigs.find((roleConfig) => (
    normalizeMatchText(roleConfig.role) === normalizeMatchText(roleText)
    && roleMatchesBudget(roleConfig, budget)
  ));
};

const getNextApprovalStatus = async (budget, currentRole) => {
  const roles = await getApprovalRoles(budget.colid, budget.department || budget.userdepartment, budget.academicyear);
  const currentIndex = roles.findIndex((role) => role.toLowerCase() === normalizeRole(currentRole).toLowerCase());

  if (currentIndex === -1) {
    throw new Error('Role is not configured for budget approval');
  }

  const expectedStatus = `${roles[currentIndex]}_PENDING`;
  if (budget.status !== expectedStatus) {
    throw new Error(`Budget is pending at ${budget.status}`);
  }

  const nextRole = roles[currentIndex + 1];
  return nextRole ? `${nextRole}_PENDING` : 'APPROVED';
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
    const roles = await getApprovalRoles(req.body.colid, req.body.department || req.body.userdepartment, req.body.academicyear);
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
    const { colid, status, role, storeid, academicyear, useremail } = req.query;
  
    let filter = { colid };
    if (status) filter.status = status;
    const roleText = normalizeRole(role);
    if (roleText) filter.status = `${roleText}_PENDING`;
    if (storeid) filter.storeid = storeid;
    if (academicyear) filter.academicyear = academicyear;
    if (useremail) filter.useremail = useremail;
  
    let data = await Budget.find(filter)
      .populate('storeid')
      .populate('categoryid');

    if (roleText) {
      let roleConfigs = await IndBudgetApprovalRole.find({
        colid: Number(colid),
        isactive: { $ne: 'No' }
      }).lean();
      roleConfigs = roleConfigs.filter((roleConfig) => normalizeMatchText(roleConfig.role) === normalizeMatchText(roleText));

      data = data.filter((budget) => {
        const roleConfig = roleConfigs.find((config) => roleMatchesBudget(config, budget));
        if (!roleConfig) return false;
        const accesslevel = normalizeRole(roleConfig.accesslevel || 'Approve Only');
        budget._doc.approverConfig = {
          department: roleConfig.department || 'All',
          academicyear: roleConfig.academicyear || 'All',
          accesslevel,
          canadditems: accesslevel.toLowerCase().includes('add'),
          canedit: true
        };
        return true;
      });
    }
  
    res.json(data);
  };

// APPROVAL FLOW
exports.indApproveBudget = async (req, res) => {
  try {
    const currentRole = normalizeRole(req.body.level || req.body.role);
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ status: 'fail', message: 'Budget not found' });

    const nextStatus = await getNextApprovalStatus(budget, currentRole);

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

exports.indUpdatePendingBudget = async (req, res) => {
  try {
    const currentRole = normalizeRole(req.body.level || req.body.role);
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ status: 'fail', message: 'Budget not found' });

    await getNextApprovalStatus(budget, currentRole);

    const allowed = ['storeid', 'categoryid', 'itemname', 'quantity', 'price', 'quantityremaining', 'priceremaining', 'remarks'];
    const update = {};
    allowed.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) update[field] = req.body[field];
    });

    const data = await Budget.findByIdAndUpdate(req.params.id, update, { new: true });

    await writeBudgetLog({
      budget: data,
      action: 'Edit',
      oldstatus: budget.status,
      newstatus: data.status,
      actor: actorFromBody(req.body),
      remarks: req.body.remarks || 'Budget item edited during approval'
    });

    res.json(data);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.indAddBudgetItemAtApproval = async (req, res) => {
  try {
    const currentRole = normalizeRole(req.body.level || req.body.role);
    const sourceBudget = await Budget.findById(req.body.sourcebudgetid);
    if (!sourceBudget) return res.status(404).json({ status: 'fail', message: 'Source budget not found' });

    const roleConfig = await getMatchingRoleConfig(sourceBudget, currentRole);
    if (!roleConfig) return res.status(403).json({ status: 'fail', message: 'Budget is not pending for this role and department/year' });

    const accesslevel = normalizeRole(roleConfig.accesslevel || 'Approve Only').toLowerCase();
    if (!accesslevel.includes('add')) {
      return res.status(403).json({ status: 'fail', message: 'This approval level cannot add budget items' });
    }

    const nextStatus = await getNextApprovalStatus(sourceBudget, currentRole);
    const data = await Budget.create({
      colid: sourceBudget.colid,
      academicyear: sourceBudget.academicyear,
      storeid: req.body.storeid || sourceBudget.storeid,
      categoryid: req.body.categoryid || sourceBudget.categoryid,
      itemname: req.body.itemname,
      quantity: req.body.quantity,
      price: req.body.price,
      quantityremaining: req.body.quantityremaining || req.body.quantity,
      priceremaining: req.body.priceremaining || req.body.price,
      department: sourceBudget.department,
      institution: sourceBudget.institution,
      username: req.body.username || sourceBudget.username,
      useremail: req.body.useremail || sourceBudget.useremail,
      userdepartment: sourceBudget.userdepartment,
      status: nextStatus,
      remarks: req.body.remarks || ''
    });

    await writeBudgetLog({
      budget: data,
      action: 'Add Item',
      oldstatus: sourceBudget.status,
      newstatus: nextStatus,
      actor: actorFromBody(req.body),
      remarks: req.body.remarks || 'Budget item added during approval'
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
