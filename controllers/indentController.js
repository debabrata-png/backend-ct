const Indent = require('./../Models/pindent');
const Budget = require('./../Models/pbudget');

// CREATE INDENT
exports.indentCreate = async (req, res) => {
  try {
    const data = req.body;

    const indent = new Indent(data);
    await indent.save();

    res.json(indent);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET (FILTER BY COLID)
exports.indentGet = async (req, res) => {
  const { colid } = req.query;

  const data = await Indent.find({ colid })
    .populate('storeid categoryid budgetid');

  res.json(data);
};

// UPDATE
exports.indentUpdate = async (req, res) => {
  const { id } = req.params;

  const data = await Indent.findByIdAndUpdate(id, req.body, { new: true });

  res.json(data);
};

// DELETE
exports.indentDelete = async (req, res) => {
  const { id } = req.params;

  await Indent.findByIdAndDelete(id);

  res.json({ msg: 'Deleted' });
};

// APPROVAL FLOW
exports.indentApprove = async (req, res) => {
  const { id } = req.params;
  const { role, remarks } = req.body;

  const indent = await Indent.findById(id);

  if (!indent) return res.status(404).json({ msg: 'Not found' });

  if (role === 'HOD' && indent.status === 'HOD_PENDING') {
    indent.status = 'REGISTRAR_PENDING';
  } else if (role === 'REGISTRAR' && indent.status === 'REGISTRAR_PENDING') {
    indent.status = 'ACCOUNTS_PENDING';
  } else if (role === 'ACCOUNTS' && indent.status === 'ACCOUNTS_PENDING') {
    indent.status = 'MANAGEMENT_PENDING';
  } else if (role === 'MANAGEMENT' && indent.status === 'MANAGEMENT_PENDING') {
    indent.status = 'APPROVED';

    // 🔥 Reduce budget quantityremaining
    const budget = await Budget.findById(indent.budgetid);
    if (budget) {
      budget.quantityremaining -= indent.quantity;
      await budget.save();
    }
  }

  indent.remarks = remarks;
  await indent.save();

  res.json(indent);
};


// GET (FILTER BY COLID)
exports.budgetavailable = async (req, res) => {
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