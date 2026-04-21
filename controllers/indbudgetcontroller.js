const Budget = require('./../Models/pbudget');

// CREATE
exports.indCreateBudget = async (req, res) => {
  console.log(req.body);
  const data = await Budget.create(req.body);
  res.json(data);
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
    const { colid, status } = req.query;
  
    let filter = { colid };
    if (status) filter.status = status;
  
    const data = await Budget.find(filter)
      .populate('storeid')
      .populate('categoryid');
  
    res.json(data);
  };

// APPROVAL FLOW
exports.indApproveBudget = async (req, res) => {
  const { level } = req.body;

  let nextStatus = '';

  if (level === 'HOD') nextStatus = 'REGISTRAR_PENDING';
  else if (level === 'REGISTRAR') nextStatus = 'ACCOUNTS_PENDING';
  else if (level === 'ACCOUNTS') nextStatus = 'MANAGEMENT_PENDING';
  else if (level === 'MANAGEMENT') nextStatus = 'APPROVED';

  const data = await Budget.findByIdAndUpdate(
    req.params.id,
    { status: nextStatus },
    { new: true }
  );

  res.json(data);
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