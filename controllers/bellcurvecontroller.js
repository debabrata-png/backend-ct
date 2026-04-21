const BellExam = require('./../Models/bellexammodel');
const BellConfig = require('./../Models/bellconfigmodel');



exports.bellApplyCurve = async (req, res) => {
    const { colid } = req.body;

    const students = await BellExam.find({ colid });
    const config = await BellConfig.findOne({ colid });

    const marks = students.map(s => s.totalmarks);

    const mean = marks.reduce((a, b) => a + b, 0) / marks.length;

    const variance = marks.reduce((sum, m) =>
        sum + Math.pow(m - mean, 2), 0) / marks.length;

    const stdDev = Math.sqrt(variance);

    for (let s of students) {

        let z = stdDev === 0 ? 0 : (s.totalmarks - mean) / stdDev;

        // Optional normalization
        if (config.useNormalization) {
            s.normalized =
                config.targetMean + z * config.targetStdDev;
        }

        const gradeObj = config.grades.find(g =>
            z >= g.minZ && z < g.maxZ
        ) || { grade: 'F', gradepoint: 0 };

        s.zscore = z;
        s.grade = gradeObj.grade;
        s.gradepoint = gradeObj.gradepoint;

        await s.save();
    }

    res.json({ mean, stdDev });
};



// exports.bellApplyCurve = async (req, res) => {
//     try {
//         const { colid } = req.body;

//         const students = await BellExam.find({ colid });

//         if (students.length === 0)
//             return res.json({ message: 'No data' });

//         // Mean
//         const mean =
//             students.reduce((sum, s) => sum + s.totalmarks, 0) /
//             students.length;

//         // Std Dev
//         const variance =
//             students.reduce((sum, s) =>
//                 sum + Math.pow(s.totalmarks - mean, 2), 0
//             ) / students.length;

//         const stdDev = Math.sqrt(variance);

//         const config = await BellConfig.findOne({ colid });

//         for (let s of students) {

//             const z = stdDev === 0 ? 0 : (s.totalmarks - mean) / stdDev;

//             let gradeObj = config.grades.find(g =>
//                 z >= g.minZ && z < g.maxZ
//             );

//             if (!gradeObj) gradeObj = { grade: 'F', gradepoint: 0 };

//             s.zscore = z;
//             s.grade = gradeObj.grade;
//             s.gradepoint = gradeObj.gradepoint;

//             await s.save();
//         }

//         res.json({ message: 'Bell curve applied', mean, stdDev });

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// };