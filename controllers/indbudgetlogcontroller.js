const BudgetLog = require('../Models/indbudgetlog');

const filterFields = ['academicyear', 'category', 'store', 'useremail', 'username', 'item', 'action', 'department'];

const buildFilter = (query = {}) => {
  const filter = {};
  if (query.colid) filter.colid = Number(query.colid);

  filterFields.forEach((field) => {
    if (query[field]) filter[field] = query[field];
  });

  return filter;
};

exports.createBudgetLog = async (payload = {}) => {
  return BudgetLog.create({
    ...payload,
    timeofactivity: payload.timeofactivity || new Date()
  });
};

exports.getBudgetLogs = async (req, res) => {
  try {
    const data = await BudgetLog.find(buildFilter(req.query)).sort({ timeofactivity: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

exports.getBudgetLogOptions = async (req, res) => {
  try {
    const baseFilter = {};
    if (req.query.colid) baseFilter.colid = Number(req.query.colid);

    const options = {};
    await Promise.all(filterFields.map(async (field) => {
      options[field] = (await BudgetLog.distinct(field, baseFilter)).filter(Boolean).sort();
    }));

    res.json(options);
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};
