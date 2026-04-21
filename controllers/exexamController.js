const ExamTotal = require('./../Models/examtotal1');
const ExamExt = require('./../Models/examext1');
const ExamInternal = require('./../Models/examnewrubrics1');

exports.exUpdateStudentMarks = async (req, res) => {
    try {
        const { regno, colid, name, user } = req.body;

        //console.log(req.body);

        // Fetch external marks
        const extData = await ExamExt.find({ regno, colid });

        //console.log(extData);

        // Fetch internal marks
        const intData = await ExamInternal.find({ regno, colid });

        //console.log(intData);

        if (!extData.length || !intData.length) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Merge course-wise
        const updates = [];

        extData.forEach(ext => {
            const internal = intData.find(
                i => i.coursecode === ext.coursecode
            );

            if (!internal) return;

            const totalMarks =
                (ext.extmarks || 0) +
                (internal.totalmarks || 0);
            
            var grade='A';
            var result='Pass';
            if (totalMarks >= 90) {
        grade = 'O';
        result = 'Pass';
    } else if (totalMarks >= 80) {
        grade = 'A+';
        result = 'Pass';
    } else if (totalMarks >= 70) {
        grade = 'A';
        result = 'Pass';
    } else if (totalMarks >= 60) {
        grade = 'B+';
        result = 'Pass';
    } else if (totalMarks >= 50) {
        grade = 'B';
        result = 'Pass';
    } else if (totalMarks >= 45) {
        grade = 'C';
        result = 'Pass';
    } else if (totalMarks >= 40) {
        grade = 'P';
        result = 'Pass';
    } else {
        grade = 'F';
        result = 'Fail';
    }

            updates.push({
                updateOne: {
                    filter: {
                        regno,
                        coursecode: ext.coursecode,
                        colid
                    },
                    update: {
                        $set: {
                            extmarks: ext.extmarks,
                            intmarks: internal.totalmarks,
                            totalmarks : totalMarks,
                            student:ext.student,
                            program:ext.program,
                            programcode:ext.programcode,
                            course:ext.course,
                            coursecode:ext.coursecode,
                            semester:ext.semester,
                            examcode:ext.examcode,
                            year:'2026-27',
                            grade,
                            result,
                            name,
                            user
                        }
                    },
                    upsert: true // IMPORTANT: no new record
                }
            });
        });

        if (updates.length > 0) {
            const a=await ExamTotal.bulkWrite(updates);
            //console.log(a);
        }

        res.json({ message: "Records updated successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};