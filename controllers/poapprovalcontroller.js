const PO = require('./../Models/ppo');
const { approvePOByRole } = require('./poapprovalworkflow');

/* ================= GET PO ================= */
exports.poGet = async (req, res) => {
  const filter = { colid: req.query.colid };
  if (req.query.role) filter.status = `${String(req.query.role || '').trim()}_PENDING`;

  const data = await PO.find(filter)
    .populate('rfpid vendorid categoryid');

  res.json(data);
};

/* ================= APPROVE PO ================= */
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
