const Budget = require('./../Models/pbudget');

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
    const { colid, search } = req.query;

    let filter = { colid: Number(colid) };

    // optional search (itemname / department)
    if (search) {
      filter.$or = [
        { itemname: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    const data = await Budget.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 DEPARTMENT SUMMARY (FOR GRID + BAR CHART)
exports.prepDepartmentSummary = async (req, res) => {
  try {
    const { colid } = req.query;

    const data = await Budget.aggregate([
      { $match: { colid: Number(colid) } },
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
    const { department, colid } = req.query;

    const data = await Budget.find({
      department,
      colid: Number(colid)
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 CATEGORY SUMMARY (PIE / BAR)
exports.prepCategorySummary = async (req, res) => {
  try {
    const { department, colid } = req.query;

    const data = await Budget.aggregate([
      {
        $match: {
          department,
          colid: Number(colid)
        }
      },
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