const IndBudgetApprovalRole = require('../Models/indbudgetapprovalrole');

exports.getIndBudgetApprovalRoles = async (req, res) => {
  try {
    const { colid } = req.query;
    const filter = {};
    if (colid) filter.colid = Number(colid);

    const items = await IndBudgetApprovalRole.find(filter).sort({ academicyear: 1, department: 1, level: 1, role: 1 });
    res.json({ status: 'success', data: items });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createIndBudgetApprovalRole = async (req, res) => {
  try {
    const item = await IndBudgetApprovalRole.create(req.body);
    res.json({ status: 'success', data: item });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateIndBudgetApprovalRole = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await IndBudgetApprovalRole.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.json({ status: 'success', data: item });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteIndBudgetApprovalRole = async (req, res) => {
  try {
    const { id } = req.body;
    await IndBudgetApprovalRole.findByIdAndDelete(id);
    res.json({ status: 'success', message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
