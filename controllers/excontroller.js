const ClassEnr = require('./../Models/classenr1');
const Attendance = require('./../Models/attendancenew');
const ExamAdmit = require('./../Models/examadmit');

// 👉 Get semesters based on regno
exports.exGetSemesters = async (req, res) => {
    try {
        const { regno, colid } = req.query;

        const data = await ClassEnr.find({ regno, colid }).distinct('semester');

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 👉 Get courses based on semester
exports.exGetCourses = async (req, res) => {
    try {
        const { regno, semester, colid } = req.query;

        const data = await ClassEnr.find({ regno, semester, colid }).distinct('course');

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // 👉 Check attendance and insert into examadmit1
// exports.exCheckAndInsert = async (req, res) => {
//     try {
//         const { regno, semester, course, colid } = req.body;

//         // Get attendance
//         const attendanceData = await Attendance.findOne({
//             regno,
//             semester,
//             course,
//             colid
//         });

//         if (!attendanceData) {
//             return res.json({ success: false, message: "Attendance not found" });
//         }

//         if (attendanceData.percentage >= 75) {
//             // Insert into examadmit1
//             await ExamAdmit.create({
//                 regno,
//                 semester,
//                 course,
//                 colid,
//                 status: "Eligible"
//             });

//             return res.json({ success: true, message: "Eligible - Entry Added" });
//         } else {
//             return res.json({ success: false, message: "Attendance below 75%" });
//         }

//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// 👉 UPDATED FUNCTION
exports.exCheckAndInsert = async (req, res) => {
    try {
        // const { regno, semester, course, colid } = req.body;
        const { regno, semester, course, colid, exam, year, program, student } = req.body;

        // // 🔹 Get all attendance records
        // const attendanceList = await Attendance.find({
        //     regno,
        //     semester,
        //     course,
        //     colid
        // });

        // if (!attendanceList.length) {
        //     return res.json({
        //         success: false,
        //         message: "Attendance not found"
        //     });
        // }

        // // 🔹 Calculate average attendance
        // const total = attendanceList.reduce((sum, item) => {
        //     return sum + (item.percentage || 0);
        // }, 0);

        // const avgAttendance = total / attendanceList.length;

        const result = await Attendance.aggregate([
    {
        $match: { regno, semester, course, colid }
    },
    {
        $group: {
            _id: null,
            avgAttendance: { $avg: "$att" }
        }
    }
]);

console.log(result);

const avgAttendance = result[0]?.avgAttendance || 0;
const avgAttendance1 = avgAttendance * 100;

        // 🔹 Condition check
        if (avgAttendance1 >= 75) {

            await ExamAdmit.create({
                name: 'System',
                user: 'demo@campus.technology',
                regno,
                semester,
                course,
                colid,
                avgAttendance, // optional field
                status1: "Submitted",
                enabled: 'Yes',
                exam:exam,
                examcode:exam,
                program:program,
                programcode:program,
                coursecode:course,
                student:student,
                year: year
            });

            

            

            return res.json({
                success: true,
                message: `Eligible (Avg: ${avgAttendance1.toFixed(2)}%)`
            });

        } else {
            return res.json({
                success: false,
                message: `Attendance below 75% (Avg: ${avgAttendance1.toFixed(2)}%)`
            });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};