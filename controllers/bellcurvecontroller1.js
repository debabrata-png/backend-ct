const BellExam = require('./../Models/bellexammodel1');
const BellConfig = require('./../Models/bellconfigmodel1');

exports.bellApplyCurve = async (req, res) => {

    const { colid } = req.body;

    const students = await BellExam.find({ colid });
    const config = await BellConfig.findOne({ colid });

    if (!config) return res.status(400).json({ message: "No config" });

    const marks = students.map(s => s.totalmarks);

    const mean = marks.reduce((a, b) => a + b, 0) / marks.length;

    const variance = marks.reduce((sum, m) =>
        sum + Math.pow(m - mean, 2), 0) / marks.length;

    const stdDev = Math.sqrt(variance);

    for (let s of students) {

        let z = stdDev === 0 ? 0 : (s.totalmarks - mean) / stdDev;

        let adjustedZ = z;

        if (config.useNormalization) {
            const scaled = config.targetMean + z * config.targetStdDev;
            adjustedZ = (scaled - config.targetMean) / config.targetStdDev;
            s.normalized = scaled;
        }

        const gradeObj = config.grades.find(g =>
            adjustedZ >= g.minZ && adjustedZ <= g.maxZ
        ) || { grade: 'F', gradepoint: 0 };

        s.zscore = adjustedZ;
        s.grade = gradeObj.grade;
        s.gradepoint = gradeObj.gradepoint;

        await s.save();
    }

    res.json({ message: "Applied" });
};