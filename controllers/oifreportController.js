const Ledgerstud = require("./../Models/ledgerstud");

exports.getFeeSummary = async (req, res) => {
  try {

    const { colid, fromDate, toDate, academicyear, programcode, cashbook, paymode } = req.body;

    const match = {
      colid: Number(colid),
      academicyear,
      programcode,
      classdate: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      }
    };

    if (cashbook && cashbook !== "All") match.cashbook = cashbook;
    if (paymode && paymode !== "All") match.paymode = paymode;

    const summary = await Ledgerstud.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            program: "$programcode",
            cashbook: "$cashbook",
            paymode: "$paymode"
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.program": 1 } }
    ]);

    res.json(summary);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getFeeDetails = async (req, res) => {
  try {

    const { colid, fromDate, toDate, academicyear, programcode, cashbook, paymode } = req.body;

    const query = {
      colid: Number(colid),
      academicyear,
      programcode,
      classdate: {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      }
    };

    if (cashbook && cashbook !== "All") query.cashbook = cashbook;
    if (paymode && paymode !== "All") query.paymode = paymode;

    const data = await Ledgerstud.find(query)
      .sort({ classdate: -1 })
      .lean();

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ACADEMIC YEARS

exports.getAcademicYears = async (req, res) => {

  try {

    const colid = Number(req.query.colid);

    const years = await Ledgerstud.aggregate([
      { $match: { colid: colid } },
      { $group: { _id: "$academicyear" } },
      { $sort: { _id: -1 } }
    ]);

    res.json(years.map(y => y._id));

  } catch (err) {
    res.status(500).json(err);
  }

};


// GET PROGRAMS

exports.getPrograms = async (req, res) => {

  try {

    const colid = Number(req.query.colid);
    const academicyear = req.query.academicyear;

    const programs = await Ledgerstud.aggregate([
      { $match: { colid: colid, academicyear: academicyear } },
      { $group: { _id: "$programcode" } },
      { $sort: { _id: 1 } }
    ]);

    res.json(programs.map(p => p._id));

  } catch (err) {
    res.status(500).json(err);
  }

};