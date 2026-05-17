const User = require("../Models/user");
const WorkloadAssignment = require("../Models/workloadassignmentds");
const NepLmsAttendance = require("../Models/neplmsattendanceds");
const NepLmsResource = require("../Models/neplmsresourceds");
const NepLmsTimetable = require("../Models/neplmstimetableds");
const NepLmsAssignmentSubmission = require("../Models/neplmsassignmentsubmissionds");
const NepLmsQuiz = require("../Models/neplmsquizds");
const NepLmsQuizAttempt = require("../Models/neplmsquizattemptds");

const text = (value) => String(value || "").trim();
const escRegex = (value) => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const studentMajor = (student) => text(student.Major || student.major || student.majorname || student.department);

const courseQueryForStudent = (source, student) => {
  const query = { colid: Number(source.colid), status: "Active" };
  const academicyear = text(source.academicyear || student.academicyear);
  const program = text(source.program || student.program);
  const programcode = text(source.programcode || student.programcode);
  const semester = text(source.semester || student.semester);
  const major = text(source.major || studentMajor(student));

  if (academicyear) query.academicyear = academicyear;
  if (program) query.program = program;
  if (programcode) query.programcode = programcode;
  if (semester) query.semester = semester;
  if (major) query.subject = { $regex: `^${escRegex(major)}$`, $options: "i" };
  return query;
};

const compactCourse = (course) => ({
  id: String(course._id),
  academicyear: course.academicyear || "",
  regulation: course.regulation || "",
  program: course.program || "",
  programcode: course.programcode || "",
  type: course.type || "",
  major: course.subject || "",
  semester: course.semester || "",
  course: course.course || "",
  coursecode: course.coursecode || "",
  faculty: course.facultyname || "",
  facultyemail: course.facultyemail || "",
  facultydepartment: course.facultydepartment || ""
});

const courseBaseQueries = (courses, colid) => courses.map((course) => ({
  colid,
  academicyear: course.academicyear,
  semester: course.semester,
  coursecode: course.coursecode
}));

exports.getStudentDashboard = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const regno = text(req.query.regno);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });

    const student = await User.findOne({ colid, regno }).lean();
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const courses = await WorkloadAssignment.find(courseQueryForStudent(req.query, student))
      .sort({ semester: 1, course: 1 })
      .lean();
    const baseQueries = courseBaseQueries(courses, colid);
    const courseCodes = courses.map((course) => course.coursecode).filter(Boolean);
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date();

    const emptyOr = baseQueries.length ? { $or: baseQueries } : { coursecode: { $in: [] } };
    const [attendanceRows, resources, timetable, submissions, quizzes, quizAttempts] = await Promise.all([
      NepLmsAttendance.find({ colid, regno, coursecode: { $in: courseCodes } }).sort({ classdate: 1 }).lean(),
      NepLmsResource.find({ ...emptyOr, colid }).sort({ duedate: 1, createdAt: -1 }).lean(),
      NepLmsTimetable.find({ ...emptyOr, colid }).sort({ classdate: 1, classtime: 1 }).lean(),
      NepLmsAssignmentSubmission.find({ colid, regno, coursecode: { $in: courseCodes } }).lean(),
      NepLmsQuiz.find({ ...emptyOr, colid, status: "Active" }).sort({ startdatetime: 1 }).lean(),
      NepLmsQuizAttempt.find({ colid, regno, coursecode: { $in: courseCodes } }).lean()
    ]);

    const attendanceMap = new Map();
    attendanceRows.forEach((row) => {
      const key = row.coursecode || row.course || "";
      const item = attendanceMap.get(key) || {
        course: row.course || "",
        coursecode: row.coursecode || "",
        total: 0,
        present: 0,
        absent: 0,
        percentage: 0
      };
      item.total += 1;
      if (Number(row.attendance) === 1) item.present += 1;
      else item.absent += 1;
      item.percentage = item.total ? Number(((item.present / item.total) * 100).toFixed(2)) : 0;
      attendanceMap.set(key, item);
    });

    const submittedAssignmentIds = new Set(submissions.map((item) => String(item.assignmentid || "")));
    const attemptedQuizIds = new Set(quizAttempts.map((item) => String(item.quizid || "")));
    const upcomingAssignments = resources.filter((item) => (
      item.resourcetype === "Assignment"
      && item.duedate
      && item.duedate >= today
      && !submittedAssignmentIds.has(String(item._id))
    ));
    const courseMaterial = resources.filter((item) => item.resourcetype === "Course Material");
    const upcomingClasses = timetable.filter((item) => item.classdate && item.classdate >= today);
    const pastClasses = timetable.filter((item) => item.classdate && item.classdate < today).reverse();
    const upcomingQuizzes = quizzes.filter((item) => (
      new Date(item.enddatetime) >= now
      && !attemptedQuizIds.has(String(item._id))
    ));

    const summary = {
      courses: courses.length,
      faculties: new Set(courses.map((course) => course.facultyemail || course.facultyname).filter(Boolean)).size,
      upcomingClasses: upcomingClasses.length,
      pastClasses: pastClasses.length,
      upcomingAssignments: upcomingAssignments.length,
      upcomingQuizzes: upcomingQuizzes.length,
      courseMaterials: courseMaterial.length,
      attendancePercentage: attendanceRows.length
        ? Number(((attendanceRows.filter((row) => Number(row.attendance) === 1).length / attendanceRows.length) * 100).toFixed(2))
        : 0
    };

    res.json({
      success: true,
      student: {
        name: student.name || "",
        regno: student.regno || "",
        email: student.email || "",
        phone: student.phone || "",
        academicyear: student.academicyear || "",
        program: student.program || "",
        programcode: student.programcode || "",
        major: studentMajor(student),
        semester: student.semester || "",
        section: student.section || ""
      },
      summary,
      courses: courses.map(compactCourse),
      attendance: [...attendanceMap.values()].sort((a, b) => String(a.coursecode).localeCompare(String(b.coursecode))),
      upcomingClasses: upcomingClasses.slice(0, 12),
      pastClasses: pastClasses.slice(0, 12),
      upcomingAssignments: upcomingAssignments.slice(0, 12),
      upcomingQuizzes: upcomingQuizzes.slice(0, 12),
      courseMaterial: courseMaterial.slice(0, 12),
      quizAttempts,
      submissions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
