const BellExam = require('./../Models/rexammodel');
const BellConfig = require('./../Models/rconfigmodel');

exports.bellApplyCurve = async (req, res) => {

    const { colid } = req.body;

    const students = await BellExam.find({ colid });
    const config = await BellConfig.findOne({ colid });

    if (!config) return res.json({ message: "No config" });

    // ✅ PERCENTILE MODE (WITH TIE HANDLING)
    if (config.gradingType === 'percentile') {

        const sorted = students.sort((a,b)=>b.totalmarks-a.totalmarks);

        let rank = 1;
        let prevMarks = null;

        for (let i=0;i<sorted.length;i++) {

            if (prevMarks !== null && sorted[i].totalmarks < prevMarks) {
                rank = i + 1;
            }

            const percentile = (1 - (rank-1)/sorted.length) * 100;

            const band = config.percentileBands.find(b =>
                percentile >= b.min && percentile <= b.max
            ) || { grade:'F', gradepoint:0 };

            sorted[i].percentile = percentile;
            sorted[i].grade = band.grade;
            sorted[i].gradepoint = band.gradepoint;

            prevMarks = sorted[i].totalmarks;

            await sorted[i].save();
        }

        return res.json({ message:"Percentile applied" });
    }

    // ✅ Z-SCORE MODE
    const marks = students.map(s=>s.totalmarks);
    const mean = marks.reduce((a,b)=>a+b,0)/marks.length;

    const variance = marks.reduce((s,m)=>
        s + Math.pow(m-mean,2),0)/marks.length;

    const stdDev = Math.sqrt(variance);

    for (let s of students) {

        let z = stdDev===0 ? 0 : (s.totalmarks-mean)/stdDev;
        let adjustedZ = z;

        if (config.useNormalization) {
            const scaled = config.targetMean + z*config.targetStdDev;
            adjustedZ = (scaled-config.targetMean)/config.targetStdDev;
            s.normalized = scaled;
        }

        const band = config.grades.find(g =>
            adjustedZ >= g.minZ && adjustedZ <= g.maxZ
        ) || { grade:'F', gradepoint:0 };

        s.zscore = adjustedZ;
        s.grade = band.grade;
        s.gradepoint = band.gradepoint;

        await s.save();
    }

    res.json({ message:"Z-score applied" });
};