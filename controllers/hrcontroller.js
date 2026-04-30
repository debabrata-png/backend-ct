const HrSalStructure = require('./../Models/hrsalary');

exports.hrGetSalaryPivot = async (req, res) => {
  try {
    const { colid, month, year } = req.query;

    const matchStage = {
      colid: Number(colid)
    };

    if (month) matchStage.month = month;
    if (year) matchStage.year = year;

    const data = await HrSalStructure.aggregate([
      {
        $match: matchStage
      },

      {
        $group: {
          _id: {
            empid: "$empid",
            employee: "$employee",
            component: "$component"
          },
          amount: { $sum: "$amount" }
        }
      },

      {
        $group: {
          _id: {
            empid: "$_id.empid",
            employee: "$_id.employee"
          },
          components: {
            $push: {
              k: "$_id.component",
              v: "$amount"
            }
          },
          total: { $sum: "$amount" }
        }
      },

      {
        $addFields: {
          componentObj: { $arrayToObject: "$components" }
        }
      },

      {
        $project: {
          _id: 0,
          empid: "$_id.empid",
          employee: "$_id.employee",
          componentObj: 1,
          total: 1
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.hrGetSalaryBreakup = async (req, res) => {
  try {
    const { empid, colid, month, year } = req.query;

    const matchStage = {
      empid,
      colid: Number(colid)
    };

    if (month) matchStage.month = month;
    if (year) matchStage.year = year;

    const data = await HrSalStructure.aggregate([
      { $match: matchStage },

      {
        $group: {
          _id: "$component",
          total: { $sum: "$amount" }
        }
      },

      {
        $project: {
          _id: 0,
          component: "$_id",
          amount: "$total"
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.hrGetSalaryComponentOptions = async (req, res) => {
  try {
    const { colid } = req.query;
    const matchStage = {};

    if (colid) {
      matchStage.colid = Number(colid);
    }

    const [years, months, components] = await Promise.all([
      HrSalStructure.distinct("year", matchStage),
      HrSalStructure.distinct("month", matchStage),
      HrSalStructure.distinct("component", matchStage)
    ]);

    res.json({
      years: years.filter(Boolean).sort(),
      months: months.filter(Boolean).sort(),
      components: components.filter(Boolean).sort()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.hrGetSalaryByComponent = async (req, res) => {
  try {
    const { colid, month, year, component } = req.query;

    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    const matchStage = {
      colid: Number(colid)
    };

    if (month) matchStage.month = month;
    if (year) matchStage.year = year;
    if (component) matchStage.component = component;

    const data = await HrSalStructure.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            empid: "$empid",
            employee: "$employee",
            year: "$year",
            month: "$month",
            component: "$component"
          },
          amount: { $sum: "$amount" },
          structure: { $first: "$structure" },
          type: { $first: "$type" },
          level: { $first: "$level" },
          paystatus: { $first: "$paystatus" }
        }
      },
      {
        $project: {
          _id: 0,
          id: {
            $concat: [
              { $ifNull: ["$_id.empid", ""] },
              "-",
              { $ifNull: ["$_id.year", ""] },
              "-",
              { $ifNull: ["$_id.month", ""] },
              "-",
              { $ifNull: ["$_id.component", ""] }
            ]
          },
          empid: "$_id.empid",
          employee: "$_id.employee",
          year: "$_id.year",
          month: "$_id.month",
          component: "$_id.component",
          amount: 1,
          structure: 1,
          type: 1,
          level: 1,
          paystatus: 1
        }
      },
      { $sort: { employee: 1, empid: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
