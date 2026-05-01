const POApprovalRole = require('../Models/poapprovalrole');

const fallbackApprovalRoles = ['REGISTRAR', 'ACCOUNTS', 'MANAGEMENT'];

const normalizeRole = (value) => String(value || '').trim();

const getPOApprovalRoles = async (colid) => {
  const roles = await POApprovalRole.find({
    colid: Number(colid),
    isactive: { $ne: 'No' }
  }).sort({ level: 1, role: 1 });

  if (roles.length) {
    return roles.map((item) => normalizeRole(item.role)).filter(Boolean);
  }

  return fallbackApprovalRoles;
};

const getInitialPOStatus = async (colid) => {
  const roles = await getPOApprovalRoles(colid);
  return `${roles[0] || fallbackApprovalRoles[0]}_PENDING`;
};

const approvePOByRole = async (po, role) => {
  const currentRole = normalizeRole(role);
  const roles = await getPOApprovalRoles(po.colid);
  const currentIndex = roles.findIndex((item) => item.toLowerCase() === currentRole.toLowerCase());

  if (currentIndex === -1) {
    throw new Error('Role is not configured for PO approval');
  }

  const expectedStatus = `${roles[currentIndex]}_PENDING`;
  if (po.status !== expectedStatus) {
    throw new Error(`PO is pending at ${po.status}`);
  }

  const nextRole = roles[currentIndex + 1];
  po.status = nextRole ? `${nextRole}_PENDING` : 'APPROVED';
  await po.save();
  return po;
};

module.exports = {
  fallbackApprovalRoles,
  getInitialPOStatus,
  getPOApprovalRoles,
  normalizeRole,
  approvePOByRole
};
