const StudentMarks11ds = require('../Models/studentmarks11ds');
const SubjectComponentConfig11ds = require('../Models/subjectcomponentconfig11ds');
const User = require('../Models/user');
const CoScholasticActivity9ds = require('../Models/CoScholasticActivity9ds');
const CoScholasticGrade9ds = require('../Models/CoScholasticGrade9ds');

// Helper to calculate grade (generic)
function calculateGrade(obtained, max) {
    if (!obtained && obtained !== 0) return '';
    if (!max || max === 0) return '';
    const percentage = (obtained / max) * 100;
    if (percentage >= 91) return 'A1';
    if (percentage >= 81) return 'A2';
    if (percentage >= 71) return 'B1';
    if (percentage >= 61) return 'B2';
    if (percentage >= 51) return 'C1';
    if (percentage >= 41) return 'C2';
    if (percentage >= 33) return 'D';
    return 'E';
}

// 1. Get Subjects from Config
exports.getsubjectsfromconfig11ds = async (req, res) => {
    try {
        const { colid, semester, academicyear, section } = req.query;
        const query = {
            colid: Number(colid),
            semester,
            academicyear,
            isactive: true
        };
        // Filter by section if provided — differentiates streams for Class 11/12
        if (section) query.section = section;
        const subjects = await SubjectComponentConfig11ds.find(query).sort({ createdAt: 1 });
        res.json({ success: true, data: subjects });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 1.5 Save Subject Config
exports.saveSubjectConfig11ds = async (req, res) => {
    try {
        const { id, colid, subjectcode, subjectname, semester, academicyear } = req.body;

        let config;
        if (id) {
            config = await SubjectComponentConfig11ds.findByIdAndUpdate(id, req.body, { new: true });
        } else {
            // Check duplicate
            const existing = await SubjectComponentConfig11ds.findOne({ colid, subjectcode, semester, academicyear });
            if (existing) return res.status(400).json({ success: false, message: "Subject Code already exists for this term" });

            config = new SubjectComponentConfig11ds(req.body);
            await config.save();
        }
        res.json({ success: true, message: "Saved successfully", data: config });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Get Students and Subjects for Entry Grid
// 2. Get Students and Subjects for Entry Grid
exports.getstudentsandsubjectsformarks11ds = async (req, res) => {
    try {
        const { colid, semester, academicyear, section, term } = req.query;

        // Fetch Students
        const studentQuery = {
            colid: Number(colid),
            semester: semester
        };
        if (section) studentQuery.section = section;

        const students = await User.find(studentQuery)
            .select('regno name rollno')
            .sort({ rollno: 1, name: 1 });

        let subjects = [];
        let marks = [];

        // Check if it's attendance
        if (term === 'attendance') {
            subjects = [{
                subjectcode: 'ATTENDANCE',
                subjectname: 'Attendance',
                maxmarks: 0 // Not applicable
            }];

            marks = await StudentMarks11ds.find({
                colid: Number(colid),
                semester,
                academicyear,
                subjectcode: 'ATTENDANCE'
            });

        } else {
            // Fetch Configured Subjects — filter by section to get stream-specific subjects
            const subjectQuery = {
                colid: Number(colid),
                semester,
                academicyear,
                isactive: true
            };
            if (section) subjectQuery.section = section;

            subjects = await SubjectComponentConfig11ds.find(subjectQuery).sort({ createdAt: 1 });

            // Fetch Existing Marks to populate the grid
            marks = await StudentMarks11ds.find({
                colid: Number(colid),
                semester,
                academicyear,
                subjectcode: { $ne: 'ATTENDANCE' }
            });
        }

        res.json({ success: true, students, subjects, marks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Save Marks
exports.savemarks11ds = async (req, res) => {
    try {
        const { marksData } = req.body; // Array of marks objects

        if (!marksData || !Array.isArray(marksData)) {
            return res.status(400).json({ success: false, message: "Invalid data format" });
        }

        const bulkOps = marksData.map(mark => {
            // Check if it's attendance
            if (mark.subjectcode === 'ATTENDANCE') {
                const updateFields = {
                    name: mark.name, // marks entry usually has student name/user details
                    user: mark.user,
                    studentname: mark.studentname,
                    subjectname: 'Attendance',
                    updatedat: new Date()
                };

                // Add specific attendance fields if present
                if (mark.term1totalpresentdays !== undefined) updateFields.term1totalpresentdays = mark.term1totalpresentdays;
                if (mark.term1totalworkingdays !== undefined) updateFields.term1totalworkingdays = mark.term1totalworkingdays;
                if (mark.term2totalpresentdays !== undefined) updateFields.term2totalpresentdays = mark.term2totalpresentdays;
                if (mark.term2totalworkingdays !== undefined) updateFields.term2totalworkingdays = mark.term2totalworkingdays;

                return {
                    updateOne: {
                        filter: {
                            colid: mark.colid,
                            regno: mark.regno,
                            subjectcode: 'ATTENDANCE',
                            semester: mark.semester,
                            academicyear: mark.academicyear
                        },
                        update: {
                            $set: updateFields,
                            $setOnInsert: { createdat: new Date() }
                        },
                        upsert: true
                    }
                };
            }

            // Standard Subject Logic
            const preMid = Number(mark.unitpremidobtain) || 0;
            const postMid = Number(mark.unitpostmidobtain) || 0;
            const unitTotalRaw = preMid + postMid;
            const unit20 = Number((unitTotalRaw * 0.2).toFixed(2));

            const hyTh = Number(mark.halfyearlythobtain) || 0;
            const hyPr = Number(mark.halfyearlypracticalobtain) || 0;
            const hyTotalRaw = hyTh + hyPr;
            const halfyearly30 = Number((hyTotalRaw * 0.3).toFixed(2));

            const annTh = Number(mark.annualthobtain) || 0;
            const annPr = Number(mark.annualpracticalobtain) || 0;
            const annTotalRaw = annTh + annPr;
            const annual50 = Number((annTotalRaw * 0.5).toFixed(2));

            const total = Number((unit20 + halfyearly30 + annual50).toFixed(2));
            const totalgrade = calculateGrade(total, 100);

            return {
                updateOne: {
                    filter: {
                        colid: mark.colid,
                        regno: mark.regno,
                        subjectcode: mark.subjectcode,
                        semester: mark.semester,
                        academicyear: mark.academicyear
                    },
                    update: {
                        $set: {
                            name: mark.name,
                            user: mark.user,
                            studentname: mark.studentname,
                            subjectname: mark.subjectname,

                            unitpremidobtain: preMid,
                            unitpostmidobtain: postMid,
                            unittotal: unitTotalRaw,
                            unit20: unit20,

                            halfyearlythobtain: hyTh,
                            halfyearlypracticalobtain: hyPr,
                            halfyearlytotal: hyTotalRaw,
                            halfyearly30: halfyearly30,

                            annualthobtain: annTh,
                            annualpracticalobtain: annPr,
                            annualtotal: annTotalRaw,
                            annual50: annual50,

                            total: total,
                            totalgrade: totalgrade,
                            status: 'finalized',
                            updatedat: new Date()
                        }
                    },
                    upsert: true
                }
            };
        });

        await StudentMarks11ds.bulkWrite(bulkOps);
        res.json({ success: true, message: "Marks saved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Get Data for PDF
exports.getMarksheetPDFData11ds = async (req, res) => {
    try {
        const { regno, colid, semester, academicyear } = req.query;

        // Fetch Student
        const student = await User.findOne({
            regno,
            colid: Number(colid)
        });

        if (!student) return res.status(404).json({ success: false, message: "Student not found" });

        // Fetch Marks (including ATTENDANCE)
        const marks = await StudentMarks11ds.find({
            regno,
            colid: Number(colid),
            semester,
            academicyear
        }).sort({ createdAt: 1 });

        // Extract Attendance
        const attRecord = marks.find(m => m.subjectcode === 'ATTENDANCE');
        // Filter out attendance from subjects list for display/calculation
        const subjectMarks = marks.filter(m => m.subjectcode !== 'ATTENDANCE');

        // Fetch Subject Configs — use student's section to get stream-specific subjects
        const subjectCodes = subjectMarks.map(m => m.subjectcode);
        const subjectConfigs = await SubjectComponentConfig11ds.find({
            colid: Number(colid),
            semester,
            academicyear,
            section: student.section || '',
            subjectcode: { $in: subjectCodes }
        });
        // Fallback: if no configs found with section, try without section filter (backward compat)
        let finalSubjectConfigs = subjectConfigs;
        if (finalSubjectConfigs.length === 0) {
            finalSubjectConfigs = await SubjectComponentConfig11ds.find({
                colid: Number(colid),
                semester,
                academicyear,
                subjectcode: { $in: subjectCodes }
            });
        }

        //console.log("DEBUG: Looking for subjects:", subjectCodes);
        //console.log("DEBUG: Found configs:", subjectConfigs.length);
        //subjectConfigs.forEach(sc => console.log(`DEBUG: Config Code: ${sc.subjectcode}, Name: ${sc.subjectname}`));


        const codeToNameMap = {};
        finalSubjectConfigs.forEach(sc => {
            codeToNameMap[sc.subjectcode] = sc.subjectname;
        });

        // Only include subjects that are configured for this student's section/stream.
        // This prevents other-stream subjects from appearing in the report card.
        const validSubjectCodes = new Set(finalSubjectConfigs.map(sc => sc.subjectcode));
        const filteredSubjectMarks = validSubjectCodes.size > 0
            ? subjectMarks.filter(m => validSubjectCodes.has(m.subjectcode))
            : subjectMarks; // Fallback: show all if config is empty (backward compat)

        let grandTotal = 0;
        let maxTotal = 0;
        let failCount = 0;

        const subjectsFormatted = filteredSubjectMarks
            .map(m => {
                // A subject has marks if total is > 0 OR if any individual component has been entered (is > 0)
                const hasMarks = (m.total > 0) ||
                    (m.unitpremidobtain > 0) ||
                    (m.unitpostmidobtain > 0) ||
                    (m.halfyearlythobtain > 0) ||
                    (m.halfyearlypracticalobtain > 0) ||
                    (m.annualthobtain > 0) ||
                    (m.annualpracticalobtain > 0);

                if (hasMarks) {
                    grandTotal += (m.total || 0);
                    maxTotal += 100; // Each subject is evaluated out of 100 weighted
                    if ((m.total || 0) < 33) failCount++;
                }

                // Use Config Name if available, else fallback to Marks Name
                let realSubjectName = codeToNameMap[m.subjectcode] || m.subjectname;

                // INTELLIGENT FIX: Check if the mapping inverted the Name/Code (User data issue)
                // If the Result (realSubjectName) looks like a Code (has numbers) 
                // AND the Input (m.subjectcode) looks like a Name (no numbers, len > 3), 
                // REVERT to the Input.
                const isResultCodeLike = /\d/.test(realSubjectName);
                const isInputNameLike = !/\d/.test(m.subjectcode) && m.subjectcode.length > 2;

                if (isResultCodeLike && isInputNameLike) {
                    realSubjectName = m.subjectcode; // Keep the name "Biology" instead of "BIO0011"
                }

                return {
                    subjectname: realSubjectName,
                    subjectcode: m.subjectcode,
                    unitpremid: m.unitpremidobtain,
                    unitpostmid: m.unitpostmidobtain,
                    unitTotal: m.unittotal,
                    unit20: m.unit20,

                    hyTh: m.halfyearlythobtain,
                    hyPr: m.halfyearlypracticalobtain,
                    hyTotal: m.halfyearlytotal,
                    hy30: m.halfyearly30,

                    annTh: m.annualthobtain,
                    annPr: m.annualpracticalobtain,
                    annTotal: m.annualtotal,
                    ann50: m.annual50,

                    grandTotal: m.total,
                    grade: m.totalgrade,
                    compartmentobtained: (m.compartmentobtained !== undefined && m.compartmentobtained !== null)
                        ? m.compartmentobtained : null, // Supplementary exam marks
                    hasMarks: hasMarks // Helper flag for filtering
                };
            })
            .filter(s => s.hasMarks);

        const percentage = maxTotal > 0 ? ((grandTotal / maxTotal) * 100).toFixed(2) : 0;
        const resultStatus = failCount === 0 ? "PASSED" : (failCount === 1 ? "COMPARTMENT" : "FAILED");

        // Build compartmentSubjects list
        const compartmentSubjects = subjectsFormatted
            .filter(s => (s.grandTotal || 0) < 33 || s.grade === 'E')
            .map(s => ({
                subjectname: s.subjectname,
                finalScore: s.grandTotal || 0,
                compartmentobtained: s.compartmentobtained // Supplementary exam marks
            }));

        // Fetch Co-Scholastic data
        let finalCoScholastic = [];
        try {
            const coActivities = await CoScholasticActivity9ds.find({
                colid: Number(colid),
                semester: semester,
                academicyear: academicyear,
                isactive: true
            });

            const coActivityIds = coActivities.map(act => act._id);

            const coGrades = await CoScholasticGrade9ds.find({
                colid: Number(colid),
                regno,
                semester,
                academicyear,
                activityid: { $in: coActivityIds }
            }).sort({ createdAt: -1 });

            // Create a lookup for grades
            const gradeMap = {};
            coGrades.forEach(g => {
                const actId = g.activityid.toString();
                if (!gradeMap[actId]) gradeMap[actId] = g;
            });

            // Format for frontend
            finalCoScholastic = coActivities.map(act => {
                const gradeData = gradeMap[act._id.toString()] || {};
                return {
                    id: act._id,
                    code: act.code || '',
                    area: act.name || act.activityname || '',
                    grade: gradeData.term1grade || gradeData.grade || '-',
                };
            });
        } catch (e) {
            console.error("Co-Scholastic fetch error:", e);
        }

        // Dynamic Rank Calculation
        // Step 1: Find all students in this specific section
        const sectionStudents = await User.find({
            colid: Number(colid),
            semester: semester,
            section: student.section,
            admissionyear: academicyear,
            role: 'Student'
        }).lean();

        const sectionRegNos = sectionStudents.map(s => s.regno);

        // Fetch all marks for the batch (Filtered by SECTION regnos)
        const allBatchMarks = await StudentMarks11ds.find({
            colid: Number(colid),
            semester,
            academicyear,
            subjectcode: { $ne: 'ATTENDANCE' },
            regno: { $in: sectionRegNos }
        }).lean();

        // Group and Sum
        const studentTotals = {};
        allBatchMarks.forEach(m => {
            if (!studentTotals[m.regno]) studentTotals[m.regno] = 0;
            studentTotals[m.regno] += (m.total || 0);
        });

        // Convert to array and Sort Descending
        const sortedRanks = Object.keys(studentTotals).map(r => ({
            regno: r,
            total: studentTotals[r]
        })).sort((a, b) => b.total - a.total);

        // Find Rank
        const rankIndex = sortedRanks.findIndex(s => s.regno === regno);
        const rank = rankIndex !== -1 ? rankIndex + 1 : '-';

        const pdfData = {
            profile: {
                name: student.name,
                regno: student.regno,
                rollno: student.rollno,
                class: `${semester} - ${student.section || ''}`,
                father: student.fathername,
                mother: student.mothername,
                dob: student.dob,
                address: student.address,
                phone: student.phone,
                contact: student.phone,
                cbseRegNo: student.cbseno || '',   // CBSE Registration Number from User table
                photo: student.photo,

                // Attendance Data from Marks Collection
                term1attendance: attRecord ? (attRecord.term1totalpresentdays || 0) : 0,
                term1workingdays: attRecord ? (attRecord.term1totalworkingdays || 0) : 0,
                term2attendance: attRecord ? (attRecord.term2totalpresentdays || 0) : 0,
                term2workingdays: attRecord ? (attRecord.term2totalworkingdays || 0) : 0
            },
            subjects: subjectsFormatted,
            coScholastic: finalCoScholastic, // Pass CoScholastic to frontend
            grandTotal,
            maxTotal,
            percentage,
            result: resultStatus,
            rank: rank,
            failCount,
            compartmentSubjects
        };


        res.json({ success: true, data: pdfData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
// Save Subject Component Config 11ds
exports.saveSubjectComponentConfig11ds = async (req, res) => {
    try {
        const { id, colid, user, subjectcode, subjectname, semester, academicyear, unitpremid, unitpostmid, halfyearlyth, halfyearlypractical, annualth, annualpractical, isadditional } = req.body;

        const updateData = {
            colid: Number(colid),
            user,
            subjectcode,
            subjectname,
            semester,
            academicyear,
            section: req.body.section || '',  // section/stream field
            unitpremid,
            unitpostmid,
            halfyearlyth,
            halfyearlypractical,
            annualth,
            annualpractical,
            isadditional,
            updatedat: new Date()
        };

        if (req.body.name) updateData.name = req.body.name; // subjectname map

        const filter = id ? { _id: id } : {
            colid: Number(colid),
            subjectcode: subjectcode,
            semester: semester,
            academicyear: academicyear,
            section: req.body.section || ''
        };

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        const result = await SubjectComponentConfig11ds.findOneAndUpdate(filter, updateData, options);

        res.json({
            success: true,
            message: 'Subject configuration saved successfully',
            data: result
        });
    } catch (error) {
        console.error('Error in saveSubjectComponentConfig11ds:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save subject configuration',
            error: error.message
        });
    }
};

// Start of getMarksheetPDFData11ds (existing) or End of file

exports.getrankreportds = async (req, res) => {
    try {
        const { colid, academicyear, semester, section } = req.query;

        // Validation
        if (!colid || !academicyear || !semester || !section) {
            return res.status(400).json({ success: false, message: "Missing required parameters." });
        }

        // 1. Fetch Students in the specified Section
        const students = await User.find({
            colid: Number(colid),
            admissionyear: academicyear,
            semester,
            section,
            role: 'Student'
        }).lean();

        if (students.length === 0) {
            return res.json({ success: true, data: [] });
        }

        const studentMap = {};
        const regNos = students.map(s => {
            studentMap[s.regno] = s;
            return s.regno;
        });

        // 2. Fetch marks for those students based on class level logic
        // We need to differentiate logic slightly if we are querying from Marks 9 or 11
        // Usually report endpoints are unified, but since they are in different collections
        // we might have to query both or rely on the correct controller.
        // Assuming we query StudentMarks9ds for class 9-10 and StudentMarks11ds for 11-12.

        let allMarks = [];
        const semLower = semester.toLowerCase();

        if (semLower.includes("11") || semLower.includes("12")) {
            allMarks = await StudentMarks11ds.find({
                colid: Number(colid),
                academicyear,
                semester,
                regno: { $in: regNos },
                subjectcode: { $ne: 'ATTENDANCE' }
            }).lean();
        } else {
            const StudentMarks9ds = require('../Models/studentmarks9ds');
            allMarks = await StudentMarks9ds.find({
                colid: Number(colid),
                academicyear,
                semester,
                regno: { $in: regNos },
                subjectcode: { $ne: 'ATTENDANCE' }
            }).lean();
        }

        // Group Marks by Regno and Compute Totals
        const studentTotals = {};

        allMarks.forEach(m => {
            const rNo = m.regno;
            if (!studentTotals[rNo]) {
                studentTotals[rNo] = { totalObtained: 0 };
            }

            if (semLower.includes("11") || semLower.includes("12")) {
                // 11-12
                studentTotals[rNo].totalObtained += (m.total || 0);
            } else {
                // Weighted calculation for 9-10 and below
                const t1Raw = ((m.term1periodictestobtained || 0)) + (m.term1notebookobtained || 0) + (m.term1enrichmentobtained || 0) + (m.term1midexamobtained || 0);
                const t2Raw = ((m.term2periodictestobtained || 0)) + (m.term2notebookobtained || 0) + (m.term2enrichmentobtained || 0) + (m.term2annualexamobtained || 0);
                // 9-10 and below has weighted 50-50 usually, or raw sum of everything.
                // In previous logic max total was total of 100 per subject.
                studentTotals[rNo].totalObtained += parseFloat(((t1Raw * 0.5) + (t2Raw * 0.5)).toFixed(2));
            }
        });

        // 3. Construct Data Array and Sort
        let reportData = students.map(s => {
            const studTot = studentTotals[s.regno] ? studentTotals[s.regno].totalObtained : 0;
            // We need maxTotal for percentage. Assuming 5 Main Subjects * 100 = 500 max.
            // A true generic way requires fetching config, but for rapid rank table 500 is standard
            const percentage = studTot > 0 ? ((studTot / 500) * 100).toFixed(2) + "%" : "0%";

            return {
                regno: s.regno,
                admissionno: s.regno,
                rollno: s.rollno || '-',
                name: s.name,
                total: studTot,
                percentage: percentage,
                rank: 0 // placeholder
            };
        });

        // Sort descending by total
        reportData.sort((a, b) => b.total - a.total);

        // 4. Assign Ranks
        reportData.forEach((row, index) => {
            row.rank = index + 1;
        });

        res.json({ success: true, data: reportData });

    } catch (e) {
        console.error("Error in getrankreportds:", e);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
