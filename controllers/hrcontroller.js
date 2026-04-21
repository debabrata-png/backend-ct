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