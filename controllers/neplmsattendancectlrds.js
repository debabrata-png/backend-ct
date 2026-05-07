const WorkloadAssignment = require("../Models/workloadassignmentds");
const NepLmsTimetable = require("../Models/neplmstimetableds");
const NepLmsAttendance = require("../Models/neplmsattendanceds");
const User = require("../Models/user");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const regexText = (value) => new RegExp(`^${text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");

const classFields = [
  "academicyear",
  "regulation",
  "program",
  "programcode",
  "type",
  "major",
  "semester",
  "course",
  "coursecode",
  "faculty",
  "facultyemail",
  "classdate",
  "classtime",
  "period",
  "status"
];

const studentSelect = "name email phone regno admissionyear programcode regulation Major Minor semester section category gender department colid";

const buildClassFilter = (source = {}) => {
  const filter = {};
  classFields.forEach((field) => {
    if (field === "facultyemail") return;
    if (source[field]) filter[field] = text(source[field]);
  });
  return filter;
};

exports.getFacultyAttendanceContext = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    const facultyemail = text(req.query.facultyemail || req.query.user);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!facultyemail) return res.status(400).json({ success: false, message: "faculty email is required" });

    const assignments = await WorkloadAssignment.find({
      colid,
      facultyemail: regexText(facultyemail),
      status: /^Active$/i
    }).sort({ academicyear: -1, semester: 1, course: 1 }).lean();

    const courseCodes = [...new Set(assignments.map((item) => text(item.coursecode)).filter(Boolean))];
    const timetableQuery = {
      colid,
      ...(courseCodes.length ? { coursecode: { $in: courseCodes } } : {}),
      ...buildClassFilter(req.query)
    };

    const classes = await NepLmsTimetable.find(timetableQuery).sort({ classdate: 1, classtime: 1 }).lean();
    res.json({ success: true, assignments, classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentsForAttendance = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid, role: /^Student$/i };
    if (req.query.academicyear) query.admissionyear = text(req.query.academicyear);
    if (req.query.semester) query.semester = text(req.query.semester);
    if (req.query.major) query.Major = text(req.query.major);
    if (req.query.programcode) query.programcode = text(req.query.programcode);
    if (req.query.name) query.name = new RegExp(text(req.query.name), "i");
    if (req.query.email) query.email = new RegExp(text(req.query.email), "i");
    if (req.query.phone) query.phone = new RegExp(text(req.query.phone), "i");
    if (req.query.regno) query.regno = new RegExp(text(req.query.regno), "i");
    if (req.query.category) query.category = text(req.query.category);
    if (req.query.gender) query.gender = text(req.query.gender);

    const [students, attendanceRows] = await Promise.all([
      User.find(query).select(studentSelect).sort({ name: 1, regno: 1 }).lean(),
      req.query.classid
        ? NepLmsAttendance.find({ colid, classid: req.query.classid, type: text(req.query.type) || "Regular" }).lean()
        : []
    ]);

    const attendanceByStudent = new Map(attendanceRows.map((row) => [String(row.studentid), row]));
    const data = students.map((student) => {
      const attendance = attendanceByStudent.get(String(student._id));
      return {
        ...student,
        existingAttendance: attendance?.attendance,
        attendanceId: attendance?._id,
        attendanceComments: attendance?.comments || ""
      };
    });

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveAttendance = async (req, res) => {
  try {
    const colid = number(req.body.colid);
    const classInfo = req.body.classInfo || {};
    const students = Array.isArray(req.body.students) ? req.body.students : [];
    const attendanceType = text(req.body.type) || "Regular";
    const comments = text(req.body.comments);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!classInfo._id && !classInfo.classid) return res.status(400).json({ success: false, message: "Class is required" });
    if (!students.length) return res.status(400).json({ success: false, message: "Select at least one student" });

    const classid = classInfo._id || classInfo.classid;
    const saved = [];
    for (const item of students) {
      const studentid = item.studentid || item._id;
      if (!studentid) continue;
      const payload = {
        classid,
        studentid,
        student: text(item.student || item.name),
        studentemail: text(item.studentemail || item.email),
        studentphone: text(item.studentphone || item.phone),
        regno: text(item.regno),
        program: text(classInfo.program),
        programcode: text(classInfo.programcode || item.programcode),
        academicyear: text(classInfo.academicyear),
        semester: text(classInfo.semester || item.semester),
        major: text(classInfo.major || item.Major),
        faculty: text(classInfo.faculty),
        facultyemail: text(classInfo.facultyemail),
        course: text(classInfo.course),
        coursecode: text(classInfo.coursecode),
        classdate: text(classInfo.classdate),
        classtime: text(classInfo.classtime),
        attendance: Number(item.attendance) === 0 ? 0 : 1,
        type: attendanceType,
        comments,
        colid,
        user: text(req.body.user)
      };
      const row = await NepLmsAttendance.findOneAndUpdate(
        { colid, classid, studentid, type: attendanceType },
        payload,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      saved.push(row);
    }

    res.json({ success: true, saved: saved.length, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const query = { colid };
    [
      "academicyear",
      "program",
      "programcode",
      "semester",
      "major",
      "facultyemail",
      "coursecode",
      "classdate",
      "type",
      "regno"
    ].forEach((field) => {
      if (req.query[field]) query[field] = text(req.query[field]);
    });
    const data = await NepLmsAttendance.find(query).sort({ classdate: -1, classtime: 1, student: 1 }).lean();
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
