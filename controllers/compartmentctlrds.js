const StudentMarks9ds = require('../Models/studentmarks9ds');
const StudentMarks11ds = require('../Models/studentmarks11ds');
const SubjectComponentConfig9ds = require('../Models/subjectcomponentconfig9ds');
const SubjectComponentConfig11ds = require('../Models/subjectcomponentconfig11ds');
const User = require('../Models/user');

// ─── CLASS 6–10 (9ds) ──────────────────────────────────────────────────────────

/**
 * GET /api/v2/getcompartmentstudents9ds
 * Returns all students who have at least one failed subject (weighted < 33)
 * along with their failed subject list and existing compartmentobtained marks.
 */
exports.getcompartmentstudents9ds = async (req, res) => {
    try {
        const { colid, semester, academicyear, section } = req.query;

        const matchQuery = { colid: Number(colid), semester, academicyear, subjectcode: { $ne: 'ATTENDANCE' } };
        if (section) matchQuery.section = section;

        const componentConfigs = await SubjectComponentConfig9ds.find({
            colid: Number(colid), semester, academicyear, isactive: true
        }).sort({ createdAt: 1 }).lean();

        const configMap = {};
        componentConfigs.forEach(c => { configMap[c.subjectcode] = c; });

        const allMarks = await StudentMarks9ds.find(matchQuery).lean();

        // Get student names
        const studentQuery = { colid: Number(colid), semester };
        if (section) studentQuery.section = section;
        const allStudents = await User.find(studentQuery).lean();
        const studentMap = {};
        allStudents.forEach(s => { studentMap[s.regno] = s; });

        // Group marks by regno
        const byRegno = {};
        allMarks.forEach(m => {
            if (!byRegno[m.regno]) byRegno[m.regno] = [];
            byRegno[m.regno].push(m);
        });

        const result = [];
        Object.keys(byRegno).forEach(regno => {
            const studentMarks = byRegno[regno];
            const failedSubjects = [];

            studentMarks.forEach(m => {
                const conf = configMap[m.subjectcode] || {};
                if (conf.isadditional) return; // additional subjects don't go to compartment

                const t1PTMax = conf.term1periodictestmax || 40;
                const t1PTScaled = t1PTMax > 0 ? ((m.term1periodictestobtained || 0) / t1PTMax) * 10 : 0;
                const t1Raw = t1PTScaled + (m.term1notebookobtained || 0) + (m.term1enrichmentobtained || 0) + (m.term1midexamobtained || 0);

                const t2PTMax = conf.term2periodictestmax || 40;
                const t2PTScaled = t2PTMax > 0 ? ((m.term2periodictestobtained || 0) / t2PTMax) * 10 : 0;
                const t2Raw = t2PTScaled + (m.term2notebookobtained || 0) + (m.term2enrichmentobtained || 0) + (m.term2annualexamobtained || 0);

                const weighted = (t1Raw * 0.5) + (t2Raw * 0.5);
                if (weighted < 33) {
                    failedSubjects.push({
                        subjectcode: m.subjectcode,
                        subjectname: m.subjectname || conf.subjectname || m.subjectcode,
                        originalScore: parseFloat(weighted.toFixed(1)),
                        compartmentobtained: (m.compartmentobtained !== undefined && m.compartmentobtained !== null)
                            ? m.compartmentobtained : ''
                    });
                }
            });

            if (failedSubjects.length > 0) {
                const student = studentMap[regno] || {};
                result.push({
                    regno,
                    studentname: student.name || regno,
                    failedSubjects
                });
            }
        });

        // Sort by student name
        result.sort((a, b) => a.studentname.localeCompare(b.studentname));
        res.json({ success: true, students: result });
    } catch (error) {
        console.error('Error in getcompartmentstudents9ds:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * POST /api/v2/savecompartmentmarks9ds
 * Saves supplementary exam marks without touching original term marks.
 * Body: { colid, semester, academicyear, marks: [{ regno, subjectcode, compartmentobtained }] }
 */
exports.savecompartmentmarks9ds = async (req, res) => {
    try {
        const { colid, semester, academicyear, marks } = req.body;
        if (!marks || marks.length === 0) {
            return res.status(400).json({ success: false, message: 'No marks provided' });
        }

        const bulkOps = marks.map(m => ({
            updateOne: {
                filter: {
                    colid: Number(colid),
                    regno: m.regno,
                    subjectcode: m.subjectcode,
                    semester,
                    academicyear
                },
                update: {
                    $set: {
                        compartmentobtained: (m.compartmentobtained !== '' && m.compartmentobtained !== null && m.compartmentobtained !== undefined)
                            ? Number(m.compartmentobtained) : null,
                        updatedat: new Date()
                    }
                }
            }
        }));

        await StudentMarks9ds.bulkWrite(bulkOps);
        res.json({ success: true, message: `Saved compartment marks for ${marks.length} entries` });
    } catch (error) {
        console.error('Error in savecompartmentmarks9ds:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─── CLASS 11–12 (11ds) ────────────────────────────────────────────────────────

/**
 * GET /api/v2/getcompartmentstudents11ds
 * Returns all students who have total < 33 in any subject (11ds).
 */
exports.getcompartmentstudents11ds = async (req, res) => {
    try {
        const { colid, semester, academicyear, section } = req.query;

        const matchQuery = {
            colid: Number(colid),
            semester,
            academicyear,
            subjectcode: { $ne: 'ATTENDANCE' }
        };
        if (section) matchQuery.section = section;

        const allMarks = await StudentMarks11ds.find(matchQuery).lean();

        const studentQuery = { colid: Number(colid), semester };
        if (section) studentQuery.section = section;
        const allStudents = await User.find(studentQuery).lean();
        const studentMap = {};
        allStudents.forEach(s => { studentMap[s.regno] = s; });

        // Get subject configs for name lookup
        const configs = await SubjectComponentConfig11ds.find({
            colid: Number(colid), semester, academicyear
        }).lean();
        const configMap = {};
        configs.forEach(c => { configMap[c.subjectcode] = c; });

        // Group by regno
        const byRegno = {};
        allMarks.forEach(m => {
            if (!byRegno[m.regno]) byRegno[m.regno] = [];
            byRegno[m.regno].push(m);
        });

        const result = [];
        Object.keys(byRegno).forEach(regno => {
            const studentMarks = byRegno[regno];
            const failedSubjects = [];

            studentMarks.forEach(m => {
                const conf = configMap[m.subjectcode] || {};
                if (conf.isadditional) return;
                const total = m.total || 0;
                if (total < 33) {
                    failedSubjects.push({
                        subjectcode: m.subjectcode,
                        subjectname: m.subjectname || conf.subjectname || m.subjectcode,
                        originalScore: total,
                        compartmentobtained: (m.compartmentobtained !== undefined && m.compartmentobtained !== null)
                            ? m.compartmentobtained : ''
                    });
                }
            });

            if (failedSubjects.length > 0) {
                const student = studentMap[regno] || {};
                result.push({
                    regno,
                    studentname: student.name || regno,
                    failedSubjects
                });
            }
        });

        result.sort((a, b) => a.studentname.localeCompare(b.studentname));
        res.json({ success: true, students: result });
    } catch (error) {
        console.error('Error in getcompartmentstudents11ds:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * POST /api/v2/savecompartmentmarks11ds
 * Saves supplementary exam marks for Class 11-12 without touching original marks.
 */
exports.savecompartmentmarks11ds = async (req, res) => {
    try {
        const { colid, semester, academicyear, marks } = req.body;
        if (!marks || marks.length === 0) {
            return res.status(400).json({ success: false, message: 'No marks provided' });
        }

        const bulkOps = marks.map(m => ({
            updateOne: {
                filter: {
                    colid: Number(colid),
                    regno: m.regno,
                    subjectcode: m.subjectcode,
                    semester,
                    academicyear
                },
                update: {
                    $set: {
                        compartmentobtained: (m.compartmentobtained !== '' && m.compartmentobtained !== null && m.compartmentobtained !== undefined)
                            ? Number(m.compartmentobtained) : null,
                        updatedat: new Date()
                    }
                }
            }
        }));

        await StudentMarks11ds.bulkWrite(bulkOps);
        res.json({ success: true, message: `Saved compartment marks for ${marks.length} entries` });
    } catch (error) {
        console.error('Error in savecompartmentmarks11ds:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
