const crmh1 = require('../Models/crmh1');
const programmasterds = require('../Models/programmasterds');

exports.getAdmissionInstitutionWiseReport = async (req, res) => {
    try {
        const colid = req.query.colid;
        if (!colid) {
            return res.status(400).json({ status: 'Error', message: 'colid is mandatory' });
        }

        // 1. Fetch Master Data from DB (including total_seats)
        const programs = await programmasterds.find({ colid: colid }, 'institution course_name total_seats').lean();

        // 2. Fetch Live Admission Counts from DB
        const admissionCounts = await crmh1.aggregate([
            {
                $match: {
                    pipeline_stage: { $in: ['Admitted', 'Admission Done', 'Fee Paid'] },
                    colid: parseInt(colid)
                }
            },
            {
                $group: {
                    _id: {
                        institution: "$institution",
                        program: "$program"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Create lookup map: "Institution|Course" -> count
        const countMap = {};
        admissionCounts.forEach(item => {
            if (item._id.institution && item._id.program) {
                const key = `${item._id.institution.trim().toLowerCase()}|${item._id.program.trim().toLowerCase()}`;
                countMap[key] = item.count;
            }
        });

        const reportData = [];

        // 3. Merge Data
        programs.forEach((prog, index) => {
            const inst = prog.institution || 'Unknown';
            const course = prog.course_name || 'Unknown';

            const key = `${inst.trim().toLowerCase()}|${course.trim().toLowerCase()}`;
            const crmCount = countMap[key] || 0;
            const sanctioned = prog.total_seats || 0;
            const vacant = Math.max(0, sanctioned - crmCount);

            reportData.push({
                university: "People's University",
                institution: inst,
                s_no: index + 1,
                course_name: course,
                sanctioned: sanctioned,
                admitted: crmCount, // Total admissions (Live)
                vacant: vacant      // Sanctioned - Admitted
            });
        });

        // 4. Group by Institution
        const groupedData = reportData.reduce((acc, item) => {
            const inst = item.institution || 'Unknown';
            if (!acc[inst]) {
                acc[inst] = [];
            }
            acc[inst].push(item);
            return acc;
        }, {});

        res.json({ status: 'Success', data: groupedData });

    } catch (err) {
        console.error('Admission Report DB Error:', err);
        res.status(500).json({ status: 'Error', message: err.message });
    }
};
