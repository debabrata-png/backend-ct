const User = require("../Models/user");
const WorkloadAssignment = require("../Models/workloadassignmentds");
const NepLmsAttendance = require("../Models/neplmsattendanceds");
const NepLmsResource = require("../Models/neplmsresourceds");
const NepLmsTimetable = require("../Models/neplmstimetableds");
const NepLmsQuiz = require("../Models/neplmsquizds");
const NepLmsFinalMarks = require("../Models/neplmsfinalmarksds");

const text = (value) => String(value || "").trim();
const escRegex = (value) => String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

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

const baseQueries = (courses, colid) => courses.map((course) => ({
  colid,
  academicyear: course.academicyear,
  semester: course.semester,
  coursecode: course.coursecode
}));

const studentQueryForCourse = (course, colid) => {
  const query = {
    colid,
    role: /^student$/i,
    programcode: course.programcode,
    semester: course.semester
  };
  if (course.academicyear) query.academicyear = course.academicyear;
  const major = text(course.subject);
  if (major) {
    query.$or = [
      { Major: { $regex: `^${escRegex(major)}$`, $options: "i" } },
      { major: { $regex: `^${escRegex(major)}$`, $options: "i" } },
      { department: { $regex: `^${escRegex(major)}$`, $options: "i" } }
    ];
  }
  return query;
};

exports.getFacultyDashboard = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const facultyemail = text(req.query.facultyemail || req.query.user);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!facultyemail) return res.status(400).json({ success: false, message: "facultyemail is required" });

    const allCourses = await WorkloadAssignment.find({
      colid,
      status: "Active",
      facultyemail: { $regex: `^${escRegex(facultyemail)}$`, $options: "i" }
    }).sort({ academicyear: -1, semester: 1, course: 1 }).lean();

    const years = [...new Set(allCourses.map((course) => text(course.academicyear)).filter(Boolean))]
      .sort((a, b) => b.localeCompare(a));
    const academicYear = text(req.query.academicyear) || years[0] || "";
    const courses = allCourses.filter((course) => !academicYear || course.academicyear === academicYear);
    const courseCodes = courses.map((course) => course.coursecode).filter(Boolean);
    const queries = baseQueries(courses, colid);
    const emptyOr = queries.length ? { $or: queries } : { coursecode: { $in: [] } };
    const today = new Date().toISOString().slice(0, 10);
    const now = new Date();

    const [attendanceRows, resources, timetable, quizzes, finalMarks, studentCounts] = await Promise.all([
      NepLmsAttendance.find({ colid, facultyemail: { $regex: `^${escRegex(facultyemail)}$`, $options: "i" }, academicyear: academicYear, coursecode: { $in: courseCodes } }).lean(),
      NepLmsResource.find({ ...emptyOr, colid, facultyemail: { $regex: `^${escRegex(facultyemail)}$`, $options: "i" } }).sort({ duedate: 1, createdAt: -1 }).lean(),
      NepLmsTimetable.find({ ...emptyOr, colid, facultyemail: { $regex: `^${escRegex(facultyemail)}$`, $options: "i" } }).sort({ classdate: 1, classtime: 1 }).lean(),
      NepLmsQuiz.find({ ...emptyOr, colid, facultyemail: { $regex: `^${escRegex(facultyemail)}$`, $options: "i" }, status: "Active" }).sort({ startdatetime: 1 }).lean(),
      NepLmsFinalMarks.find({ colid, academicyear: academicYear, coursecode: { $in: courseCodes } }).lean(),
      Promise.all(courses.map(async (course) => ({
        coursecode: course.coursecode,
        students: await User.countDocuments(studentQueryForCourse(course, colid))
      })))
    ]);

    const attendanceByCourse = new Map();
    const attendanceByStudentCourse = new Map();
    attendanceRows.forEach((row) => {
      const courseKey = row.coursecode || row.course || "";
      const item = attendanceByCourse.get(courseKey) || {
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
      attendanceByCourse.set(courseKey, item);

      const studentKey = `${courseKey}||${row.regno || row.studentemail || row.student || ""}`;
      const studentItem = attendanceByStudentCourse.get(studentKey) || { coursecode: courseKey, regno: row.regno || "", total: 0, present: 0 };
      studentItem.total += 1;
      if (Number(row.attendance) === 1) studentItem.present += 1;
      attendanceByStudentCourse.set(studentKey, studentItem);
    });

    const lowAttendanceCounts = {};
    [...attendanceByStudentCourse.values()].forEach((row) => {
      const percentage = row.total ? (row.present / row.total) * 100 : 0;
      if (percentage < 70) lowAttendanceCounts[row.coursecode] = (lowAttendanceCounts[row.coursecode] || 0) + 1;
    });

    const lowScoreCounts = {};
    finalMarks.forEach((row) => {
      if (Number(row.total || 0) < 70) lowScoreCounts[row.coursecode] = (lowScoreCounts[row.coursecode] || 0) + 1;
    });

    const studentCountMap = Object.fromEntries(studentCounts.map((item) => [item.coursecode, item.students]));
    const courseRows = courses.map((course) => {
      const attendance = attendanceByCourse.get(course.coursecode) || {};
      return {
        ...compactCourse(course),
        students: studentCountMap[course.coursecode] || 0,
        attendancePercentage: attendance.percentage || 0,
        totalAttendanceEntries: attendance.total || 0,
        lowAttendanceStudents: lowAttendanceCounts[course.coursecode] || 0,
        lowScoreStudents: lowScoreCounts[course.coursecode] || 0
      };
    });

    const assignments = resources.filter((item) => item.resourcetype === "Assignment");
    const courseMaterial = resources.filter((item) => item.resourcetype === "Course Material");
    const upcomingAssignments = assignments.filter((item) => item.duedate && item.duedate >= today);
    const upcomingClasses = timetable.filter((item) => item.classdate && item.classdate >= today);
    const pastClasses = timetable.filter((item) => item.classdate && item.classdate < today).reverse();
    const upcomingQuizzes = quizzes.filter((item) => new Date(item.enddatetime) >= now);

    const totalAttendance = attendanceRows.length;
    const presentAttendance = attendanceRows.filter((row) => Number(row.attendance) === 1).length;
    const summary = {
      academicYear,
      courses: courses.length,
      students: courseRows.reduce((sum, row) => sum + Number(row.students || 0), 0),
      upcomingClasses: upcomingClasses.length,
      pastClasses: pastClasses.length,
      upcomingAssignments: upcomingAssignments.length,
      upcomingQuizzes: upcomingQuizzes.length,
      courseMaterials: courseMaterial.length,
      attendancePercentage: totalAttendance ? Number(((presentAttendance / totalAttendance) * 100).toFixed(2)) : 0,
      lowAttendanceStudents: courseRows.reduce((sum, row) => sum + Number(row.lowAttendanceStudents || 0), 0),
      lowScoreStudents: courseRows.reduce((sum, row) => sum + Number(row.lowScoreStudents || 0), 0)
    };

    res.json({
      success: true,
      faculty: {
        name: text(req.query.name),
        email: facultyemail
      },
      options: { academicyears: years },
      summary,
      courses: courseRows,
      attendance: [...attendanceByCourse.values()].sort((a, b) => String(a.coursecode).localeCompare(String(b.coursecode))),
      upcomingClasses: upcomingClasses.slice(0, 12),
      pastClasses: pastClasses.slice(0, 12),
      upcomingAssignments: upcomingAssignments.slice(0, 12),
      upcomingQuizzes: upcomingQuizzes.slice(0, 12),
      courseMaterial: courseMaterial.slice(0, 12)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
