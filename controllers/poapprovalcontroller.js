const PO = require('./../Models/ppo');

/* ================= GET PO ================= */
exports.poGet = async (req, res) => {
  const data = await PO.find({ colid: req.query.colid })
    .populate('rfpid vendorid categoryid');

  res.json(data);
};

/* ================= APPROVE PO ================= */
exports.poApprove = async (req, res) => {
  const { role } = req.body;

  const po = await PO.findById(req.params.id);

  if (!po) return res.status(404).json({ msg: 'PO not found' });

  if (role === 'REGISTRAR' && po.status === 'REGISTRAR_PENDING') {
    po.status = 'ACCOUNTS_PENDING';
  }
  else if (role === 'ACCOUNTS' && po.status === 'ACCOUNTS_PENDING') {
    po.status = 'MANAGEMENT_PENDING';
  }
  else if (role === 'MANAGEMENT' && po.status === 'MANAGEMENT_PENDING') {
    po.status = 'APPROVED';
  } else {
    return res.status(400).json({ msg: 'Not allowed' });
  }

  await po.save();
  res.json(po);
};