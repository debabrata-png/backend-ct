const Fees = require('./../Models/fees');

////////////////////////////////////
// 1. Get Academic Years
////////////////////////////////////
exports.getYears = async (req, res) => {
    try {
        const { colid } = req.query;

        const years = await Fees.distinct('academicyear', {
            colid: Number(colid)
        });

        res.json(years);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

////////////////////////////////////
// 2. Get Programs by Year
////////////////////////////////////
exports.getPrograms = async (req, res) => {
    try {
        const { colid, year } = req.query;

        const programs = await Fees.distinct('programcode', {
            academicyear: year,
            colid: Number(colid)
        });

        res.json(programs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

////////////////////////////////////
// 3. Semester Wise Summary
////////////////////////////////////
exports.getSemesterSummary = async (req, res) => {
    try {
        const { colid, year, program } = req.query;

        const data = await Fees.aggregate([
            {
                $match: {
                    colid: Number(colid),
                    academicyear: year,
                    programcode: program
                }
            },
            {
                $group: {
                    _id: "$semester",
                    totalAmount: { $sum: "$amount" },
                    totalRecords: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

////////////////////////////////////
// 4. Semester Details
////////////////////////////////////
exports.getSemesterDetails = async (req, res) => {
    try {
        const { colid, year, program, semester } = req.query;

        const data = await Fees.find({
            colid: Number(colid),
            academicyear: year,
            programcode: program,
            semester
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

////////////////////////////////////
// 5. Program Wise Summary
////////////////////////////////////
exports.getProgramSummary = async (req, res) => {
    try {
        const { colid, year } = req.query;

        const data = await Fees.aggregate([
            {
                $match: {
                    colid: Number(colid),
                    academicyear: year
                }
            },
            {
                $group: {
                    _id: "$programcode",
                    totalAmount: { $sum: "$amount" },
                    totalRecords: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

////////////////////////////////////
// 6. Program Details
////////////////////////////////////
exports.getProgramDetails = async (req, res) => {
    try {
        const { colid, year, program } = req.query;

        const data = await Fees.find({
            colid: Number(colid),
            academicyear: year,
            programcode: program
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};