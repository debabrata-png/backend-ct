const studalloc1 = require('../Models/studalloc1');
const questionbankds = require('../Models/questionbankds');
const questionsds = require('../Models/questionsds');
const questionsectionds = require('../Models/questionsectionds');
const studquestionmarksds = require('../Models/studquestionmarksds');
const exammarks2ds = require('../Models/exammarks2ds');
const exammarks1ds = require('../Models/exammarks1ds');
const User = require('../Models/user');

// Get unevaluated answer sheets for faculty
exports.getunevaluatedanswersheetsds = async (req, res) => {
    try {
        const { facultyid, colid } = req.query;

        const answerSheets = await studalloc1.find({
            facultyid: facultyid,
            colid: Number(colid), // ✅ colid filter
            marks: null,
            link: { $exists: true, $ne: '' }
        });

        // Return without student identifying information
        const sanitizedData = answerSheets.map(sheet => ({
            _id: sheet._id,
            courseCode: sheet.courseCode,
            course: sheet.course,
            semester: sheet.semester,
            year: sheet.year,
            examode: sheet.examode,
            component: sheet.component,
            link: sheet.link,
            maxmarks: sheet.weightage,
            program: sheet.program,
            regno: sheet.regno
        }));

        res.status(200).json(sanitizedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get question banks for evaluation
exports.getquestionbanksforevaluationds = async (req, res) => {
    try {
        const { examcode, semester, year, colid, coursecode } = req.query;

        const questionBanks = await questionbankds.find({
            examcode: examcode,
            semester: semester,
            year: year,
            colid: Number(colid), // ✅ colid filter
            coursecode: coursecode,
            isfinalized: true
        });

        res.status(200).json(questionBanks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get questions from selected question bank
exports.getquestionsfrombankds = async (req, res) => {
    try {
        const { questionbankcode, colid } = req.query;

        // Get sections first
        const sections = await questionsectionds.find({
            questionbankcode: questionbankcode,
            colid: Number(colid) // ✅ colid filter
        }).sort({ section: 1 });

        // Get questions
        const questions = await questionsds.find({
            questionbankcode: questionbankcode,
            colid: Number(colid) // ✅ colid filter
        }).sort({ sectionid: 1 });

        res.status(200).json({
            sections: sections,
            questions: questions
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get student info and exam structure info
exports.getstudentadditionalinfods = async (req, res) => {
    try {
        const { regno, papercode, semester, year, colid } = req.query;

        // Fetch student from User table
        const student = await User.findOne({
            regno: regno,
            colid: Number(colid) // ✅ colid filter
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found in user table' });
        }

        // Fetch exam structure from exammarks1ds to get regulation, branch, month, status
        const examStructure = await exammarks1ds.findOne({
            papercode: papercode,
            semester: semester,
            year: year,
            colid: Number(colid) 
        });

        if (!examStructure) {
            return res.status(404).json({ error: 'Exam structure not found in exammarks1ds' });
        }

        res.status(200).json({
            // From User table
            student: student.name,
            gender: student.gender || '',
            fathername: '', // Not available in User schema
            mothername: '', // Not available in User schema
            
            // From exammarks1ds
            regulation: examStructure.regulation || '',
            branch: examStructure.branch || '',
            month: examStructure.month || '',
            status: examStructure.status || '',
            program: examStructure.program || ''
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Submit question-wise marks
exports.submitquestionwisemarksds = async (req, res) => {
    try {
        const { 
            answersheetid, 
            questionmarks,
            totalmarks,
            name,
            user,
            colid,
            regulation,
            branch,
            month,
            student,
            mothername,
            fathername,
            gender,
            status
        } = req.body;

        // Get answer sheet details
        const answerSheet = await studalloc1.findOne({
            _id: answersheetid,
            colid: Number(colid) // ✅ colid filter
        });

        if (!answerSheet) {
            return res.status(404).json({ error: 'Answer sheet not found' });
        }

        // Update marks in studalloc1
        answerSheet.marks = totalmarks;
        answerSheet.checkstatus = 'evaluated';
        answerSheet.checkeddate = new Date();
        await answerSheet.save();

        // Save individual question marks
        const questionMarksPromises = questionmarks.map(qm => {
            return studquestionmarksds.create({
                name: name,
                user: user,
                colid: Number(colid), // ✅ colid included
                student: student,
                regno: answerSheet.regno,
                program: answerSheet.program,
                course: answerSheet.course,
                coursecode: answerSheet.courseCode,
                year: answerSheet.year,
                semester: answerSheet.semester,
                examcode: answerSheet.examode,
                month: month || '',
                regulation: regulation || '',
                branch: branch || '',
                examiner: user,
                questionbankcode: qm.questionbankcode,
                section: qm.section,
                question: qm.questiontext,
                maxmark: qm.maxmark,
                marksobtained: qm.marksobtained,
                type: 'regular',
                status: 'completed'
            });
        });

        await Promise.all(questionMarksPromises);

        // UPSERT into exammarks2ds based on component type
        await upsertExamMarks2AfterEvaluationds(
            answerSheet, 
            totalmarks, 
            name, 
            user, 
            colid,
            regulation,
            branch,
            month,
            student,
            mothername,
            fathername,
            gender,
            status
        );

        res.status(200).json({ message: 'Marks submitted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Helper function to UPSERT exammarks2ds after evaluation
async function upsertExamMarks2AfterEvaluationds(
    answerSheet, 
    newMarks, 
    name, 
    user, 
    colid,
    regulation,
    branch,
    month,
    student,
    mothername,
    fathername,
    gender,
    status
) {
    try {
        // Try to find existing record
        let marksRecord = await exammarks2ds.findOne({
            regno: answerSheet.regno,
            papercode: answerSheet.courseCode,
            examcode: answerSheet.examode,
            semester: answerSheet.semester,
            year: answerSheet.year,
            program: answerSheet.program,
            colid: Number(colid) // ✅ colid filter
        });

        // Determine which field to update based on component
        const component = (answerSheet.component || '').toLowerCase();
        const marksObtained = Math.round(newMarks);
        const maxMarks = answerSheet.weightage;

        if (!marksRecord) {
            // CREATE new record
            const newRecord = {
                name: name,
                user: user,
                colid: Number(colid), // ✅ colid as Number
                student: student,
                regno: answerSheet.regno,
                mothername: mothername || '',
                fathername: fathername || '',
                gender: gender || '',
                program: answerSheet.program,
                examcode: answerSheet.examode,
                month: month || '',
                year: answerSheet.year,
                status: status || '',
                regulation: regulation || '',
                semester: answerSheet.semester,
                branch: branch || '',
                papercode: answerSheet.courseCode,
                papername: answerSheet.course
            };

            // Set component-specific marks
            if (component === 'theory' || component === 'th') {
                newRecord.thmax = maxMarks;
                newRecord.thobtained = marksObtained;
            } else if (component === 'practical' || component === 'pr') {
                newRecord.prmax = maxMarks;
                newRecord.probtained = marksObtained;
            } else if (component === 'iat') {
                newRecord.iatmax = maxMarks;
                newRecord.iatobtained = marksObtained;
            } else if (component === 'iap') {
                newRecord.iapmax = maxMarks;
                newRecord.iapobtained = marksObtained;
            } else {
                // Default to theory if component not specified
                newRecord.thmax = maxMarks;
                newRecord.thobtained = marksObtained;
            }

            marksRecord = await exammarks2ds.create(newRecord);
            console.log(`✅ exammarks2ds created - regno: ${answerSheet.regno}, paper: ${answerSheet.courseCode}, colid: ${colid}, thmax: ${maxMarks}, thobtained: ${marksObtained}`);
        } else {
            // UPDATE existing record - only update specific component
            if (component === 'theory' || component === 'th') {
                marksRecord.thmax = maxMarks;
                marksRecord.thobtained = marksObtained;
            } else if (component === 'practical' || component === 'pr') {
                marksRecord.prmax = maxMarks;
                marksRecord.probtained = marksObtained;
            } else if (component === 'iat') {
                marksRecord.iatmax = maxMarks;
                marksRecord.iatobtained = marksObtained;
            } else if (component === 'iap') {
                marksRecord.iapmax = maxMarks;
                marksRecord.iapobtained = marksObtained;
            } else {
                // Default to theory
                marksRecord.thmax = maxMarks;
                marksRecord.thobtained = marksObtained;
            }

            await marksRecord.save();
            console.log(`✅ exammarks2ds updated - regno: ${answerSheet.regno}, paper: ${answerSheet.courseCode}, colid: ${colid}, component: ${component}, thmax: ${maxMarks}, thobtained: ${marksObtained}`);
        }
    } catch (err) {
        console.error('❌ Error upserting exammarks2ds:', err);
    }
}

// Get question-wise marks for reevaluation view
exports.getquestionwisemarksforreevaluationds = async (req, res) => {
    try {
        const { regno, coursecode, semester, year, examcode, colid } = req.query;

        const questionMarks = await studquestionmarksds.find({
            regno: regno,
            coursecode: coursecode,
            semester: semester,
            year: year,
            examcode: examcode,
            colid: Number(colid), // ✅ colid filter
            type: 'regular'
        });

        // Get answer sheet link
        const answerSheet = await studalloc1.findOne({
            regno: regno,
            courseCode: coursecode,
            semester: semester,
            year: year,
            examode: examcode,
            colid: Number(colid) // ✅ colid filter
        });

        res.status(200).json({
            questionmarks: questionMarks,
            answersheet: answerSheet ? {
                link: answerSheet.link,
                totalmarks: answerSheet.marks,
                maxmarks: answerSheet.weightage
            } : null
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update question-wise marks for reevaluation
exports.updatequestionwisemarksforreevaluationds = async (req, res) => {
    try {
        const { 
            regno, 
            coursecode, 
            semester, 
            year, 
            examcode, 
            colid,
            questionmarks,
            examinernumber,
            examiner,
            applicationid
        } = req.body;

        // Update each question's marks - create new records with type 'reevaluation'
        for (const qm of questionmarks) {
            const originalQuestion = await studquestionmarksds.findOne({
                _id: qm.questionid,
                colid: Number(colid) // ✅ colid filter
            });
            
            if (originalQuestion) {
                await studquestionmarksds.create({
                    name: originalQuestion.name,
                    user: examiner,
                    colid: Number(colid), // ✅ colid included
                    student: originalQuestion.student,
                    regno: regno,
                    program: originalQuestion.program,
                    course: originalQuestion.course,
                    coursecode: coursecode,
                    year: year,
                    semester: semester,
                    examcode: examcode,
                    month: originalQuestion.month,
                    regulation: originalQuestion.regulation,
                    branch: originalQuestion.branch,
                    examiner: examiner,
                    questionbankcode: originalQuestion.questionbankcode,
                    section: originalQuestion.section,
                    question: originalQuestion.question,
                    maxmark: originalQuestion.maxmark,
                    marksobtained: qm.marksobtained,
                    type: `reevaluation_examiner${examinernumber}`,
                    status: 'completed'
                });
            }
        }

        // Calculate total marks
        const totalMarks = questionmarks.reduce((sum, qm) => sum + (parseFloat(qm.marksobtained) || 0), 0);

        res.status(200).json({ 
            message: 'Question-wise marks updated successfully',
            totalmarks: totalMarks
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
