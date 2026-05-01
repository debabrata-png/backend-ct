const IndIndentApprovalRole = require('../Models/indindentapprovalrole');

exports.getIndIndentApprovalRoles = async (req, res) => {
  try {
    const filter = {};
    if (req.query.colid) filter.colid = Number(req.query.colid);
    const items = await IndIndentApprovalRole.find(filter).sort({ level: 1, role: 1 });
    res.json({ status: 'success', data: items });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createIndIndentApprovalRole = async (req, res) => {
  try {
    const item = await IndIndentApprovalRole.create(req.body);
    res.json({ status: 'success', data: item });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateIndIndentApprovalRole = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await IndIndentApprovalRole.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.json({ status: 'success', data: item });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteIndIndentApprovalRole = async (req, res) => {
  try {
    await IndIndentApprovalRole.findByIdAndDelete(req.body.id);
    res.json({ status: 'success', message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
