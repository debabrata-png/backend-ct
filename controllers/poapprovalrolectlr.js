const POApprovalRole = require('../Models/poapprovalrole');

exports.getPOApprovalRoles = async (req, res) => {
  try {
    const { colid } = req.query;
    const filter = {};
    if (colid) filter.colid = Number(colid);

    const items = await POApprovalRole.find(filter).sort({ level: 1, role: 1 });
    res.json({ status: 'success', data: items });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createPOApprovalRole = async (req, res) => {
  try {
    const item = await POApprovalRole.create(req.body);
    res.json({ status: 'success', data: item });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updatePOApprovalRole = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await POApprovalRole.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.json({ status: 'success', data: item });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deletePOApprovalRole = async (req, res) => {
  try {
    const { id } = req.body;
    await POApprovalRole.findByIdAndDelete(id);
    res.json({ status: 'success', message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
