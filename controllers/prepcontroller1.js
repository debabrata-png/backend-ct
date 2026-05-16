const Budget = require('./../Models/pbudget');

const buildPrepFilter = (query = {}) => {
  const { colid, academicyear, status, search, department } = query;
  const filter = {};

  if (colid) filter.colid = Number(colid);
  if (academicyear) filter.academicyear = academicyear;
  if (status) filter.status = status;
  if (department) filter.department = department;

  if (search) {
    filter.$or = [
      { itemname: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } }
    ];
  }

  return filter;
};

// 🔹 CREATE
exports.prepCreateBudget = async (req, res) => {
  try {
    const data = await Budget.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 LIST WITH FILTER (colid)
exports.prepGetBudgets = async (req, res) => {
  try {
    const data = await Budget.find(buildPrepFilter(req.query));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.prepStatusOptions = async (req, res) => {
  try {
    const { colid, academicyear } = req.query;
    const filter = {};
    if (colid) filter.colid = Number(colid);
    if (academicyear) filter.academicyear = academicyear;

    const statuses = await Budget.distinct('status', filter);
    res.json(statuses.filter(Boolean).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DEPARTMENT SUMMARY (FOR GRID + BAR CHART)
exports.prepDepartmentSummary = async (req, res) => {
  try {
    const filter = buildPrepFilter(req.query);

    const data = await Budget.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$department",
          totalBudget: { $sum: "$price" },
          totalQty: { $sum: "$quantity" }
        }
      },
      { $sort: { totalBudget: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 ITEMS BY DEPARTMENT (DRILLDOWN)
exports.prepItemsByDepartment = async (req, res) => {
  try {
    const data = await Budget.find(buildPrepFilter(req.query))
      .populate('categoryid')
      .populate('storeid');

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 CATEGORY SUMMARY (PIE / BAR)
exports.prepCategorySummary = async (req, res) => {
  try {
    const filter = buildPrepFilter(req.query);

    const data = await Budget.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$categoryid",
          total: { $sum: "$price" }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 UPDATE STATUS (approval use)
exports.prepUpdateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const data = await Budget.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
