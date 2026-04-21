const Classenr = require('../Models/classenr1');
const ExamAdmit = require('../Models/examadmit');
const ExamTimetable = require('../Models/examtimetable');

exports.getAdmitCard = async (req, res) => {
    try {
        const { regno } = req.params;
        const { colid } = req.query; // Expect colid in query params for GET

        if (!regno) {
            return res.status(400).json({ status: "error", message: "Registration number is required" });
        }
        if (!colid) {
            return res.status(400).json({ status: "error", message: "College ID (colid) is required" });
        }

        // 1. Fetch Student Details & Enrolled Courses
        const enrollments = await Classenr.find({
            regno: regno,
            colid: colid
        });

        if (!enrollments || enrollments.length === 0) {
            return res.status(404).json({ status: "error", message: "Student not found or no enrollments." });
        }

        // Extract student info from the first enrollment record
        const studentInfo = enrollments[0];

        // Get all course codes for this student
        const courseCodes = enrollments.map(enr => enr.coursecode);
        const uniqueCourseCodes = [...new Set(courseCodes)];

        // 2. Fetch Exam Schedule for these courses
        const exams = await ExamTimetable.find({
            coursecode: { $in: uniqueCourseCodes },
            colid: colid // Enforce colid
        });

        // 3. Map Data for Response
        const subjectDetails = exams.map(exam => ({
            subjectcode: exam.coursecode,
            subjectname: exam.course,
            examdate: exam.examdate,
            examtime: exam.examslot
        }));

        // 4. Construct Final Response
        const admitCardData = {
            studentname: studentInfo.student,
            regno: studentInfo.regno,
            program: studentInfo.program,
            semester: studentInfo.semester,
            examdate: exams.length > 0 ? exams[0].examdate : null,
            examCenter: "Main Campus",
            subjects: subjectDetails,
        };

        // Check if Admit Card is Released/Enabled in ExamAdmit
        const admitRecord = await ExamAdmit.findOne({ regno: regno, enabled: 'true', colid: colid });

        if (admitRecord) {
            // Example: examCenter might be specific in the release record
            // admitCardData.examCenter = admitRecord.examCenter; 
        }

        res.json(admitCardData);

    } catch (err) {
        console.error("Error fetching admit card:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};

exports.releaseAdmitCard = async (req, res) => {
    try {
        const { examCenter, colid, user, token } = req.body;

        if (!colid) {
            return res.status(400).json({ status: "error", message: "College ID is required" });
        }

        // Logic to release admit cards
        // For now, we are just returning success. 
        // In future, ensure 'colid' is used in any DB creation/update.

        res.json({ status: "success", message: "Admit cards release process initiated successfully." });

    } catch (err) {
        console.error("Error releasing admit card:", err);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
};
