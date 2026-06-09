const WorkloadAssignment = require("../Models/workloadassignmentds");
const NepLmsTimetable = require("../Models/neplmstimetableds");
const NepLmsAttendance = require("../Models/neplmsattendanceds");
const User = require("../Models/user");
const NepLmsClassGroup = require("../Models/neplmsclassgroupds");

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

exports.getClassGroupStudentsForAttendance = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!req.query.groupname) return res.status(400).json({ success: false, message: "groupname is required" });

    const query = { colid, groupname: text(req.query.groupname) };
    ["academicyear", "regulation", "programcode", "semester", "coursecode", "facultyemail"].forEach((field) => {
      if (req.query[field]) query[field] = text(req.query[field]);
    });

    const [groupRows, attendanceRows] = await Promise.all([
      NepLmsClassGroup.find(query).sort({ student: 1, regno: 1 }).lean(),
      req.query.classid
        ? NepLmsAttendance.find({ colid, classid: req.query.classid, type: text(req.query.type) || "Regular" }).lean()
        : []
    ]);

    const attendanceByStudent = new Map(attendanceRows.map((row) => [String(row.studentid), row]));
    const data = groupRows.map((row) => {
      const studentKey = String(row.studentid || row._id);
      const attendance = attendanceByStudent.get(studentKey);
      return {
        _id: row.studentid || row._id,
        classgroupid: row._id,
        name: row.student,
        email: row.studentemail,
        phone: row.studentphone,
        regno: row.regno,
        programcode: row.programcode,
        regulation: row.regulation,
        Major: row.subject,
        semester: row.semester,
        section: row.section,
        category: row.category,
        gender: row.gender,
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

exports.getStudentwiseAttendanceReport = async (req, res) => {
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
      "course",
      "coursecode",
      "facultyemail",
      "type"
    ].forEach((field) => {
      if (req.query[field]) query[field] = text(req.query[field]);
    });

    const data = await NepLmsAttendance.find(query).sort({ student: 1, classdate: 1, classtime: 1 }).lean();
    const map = new Map();
    data.forEach((row) => {
      const key = String(row.studentid || row.regno || row.student || "");
      if (!map.has(key)) {
        map.set(key, {
          id: key,
          studentid: row.studentid,
          student: row.student || "",
          regno: row.regno || "",
          email: row.studentemail || "",
          phone: row.studentphone || "",
          program: row.program || "",
          programcode: row.programcode || "",
          academicyear: row.academicyear || "",
          semester: row.semester || "",
          major: row.major || "",
          total: 0,
          present: 0,
          absent: 0,
          percentage: 0
        });
      }
      const item = map.get(key);
      item.total += 1;
      if (Number(row.attendance) === 1) item.present += 1;
      else item.absent += 1;
      item.percentage = item.total ? Number(((item.present / item.total) * 100).toFixed(2)) : 0;
    });

    const rows = [...map.values()].sort((a, b) => String(a.student).localeCompare(String(b.student)));
    const summary = {
      totalStudents: rows.length,
      totalClasses: data.length,
      present: data.filter((row) => Number(row.attendance) === 1).length,
      absent: data.filter((row) => Number(row.attendance) !== 1).length
    };
    summary.percentage = summary.totalClasses ? Number(((summary.present / summary.totalClasses) * 100).toFixed(2)) : 0;

    const groupRows = (field) => [...data.reduce((acc, row) => {
      const key = row[field] || "-";
      const current = acc.get(key) || { name: key, total: 0, present: 0, absent: 0, percentage: 0 };
      current.total += 1;
      if (Number(row.attendance) === 1) current.present += 1;
      else current.absent += 1;
      current.percentage = current.total ? Number(((current.present / current.total) * 100).toFixed(2)) : 0;
      acc.set(key, current);
      return acc;
    }, new Map()).values()].sort((a, b) => String(a.name).localeCompare(String(b.name)));

    const uniq = (field) => [...new Set(data.map((row) => text(row[field])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    res.json({
      success: true,
      rows,
      raw: data,
      summary,
      charts: {
        byCourse: groupRows("coursecode"),
        bySemester: groupRows("semester"),
        byProgram: groupRows("programcode"),
        presentAbsent: [
          { name: "Present", value: summary.present },
          { name: "Absent", value: summary.absent }
        ]
      },
      options: {
        academicyear: uniq("academicyear"),
        program: uniq("program"),
        programcode: uniq("programcode"),
        semester: uniq("semester"),
        major: uniq("major"),
        course: uniq("course"),
        coursecode: uniq("coursecode"),
        type: uniq("type")
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentCoursewiseAttendanceReport = async (req, res) => {
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
      "course",
      "coursecode",
      "faculty",
      "facultyemail",
      "type"
    ].forEach((field) => {
      if (req.query[field]) query[field] = text(req.query[field]);
    });
    if (req.query.name || req.query.student) query.student = new RegExp(text(req.query.name || req.query.student), "i");
    if (req.query.email) query.studentemail = new RegExp(text(req.query.email), "i");
    if (req.query.regno) query.regno = new RegExp(text(req.query.regno), "i");

    const data = await NepLmsAttendance.find(query).sort({ student: 1, coursecode: 1, classdate: 1, classtime: 1 }).lean();

    const studentMap = new Map();
    data.forEach((row) => {
      const key = String(row.studentid || row.regno || row.studentemail || row.student || "");
      if (!studentMap.has(key)) {
        studentMap.set(key, {
          id: key,
          studentid: row.studentid,
          student: row.student || "",
          regno: row.regno || "",
          email: row.studentemail || "",
          phone: row.studentphone || "",
          academicyear: row.academicyear || "",
          program: row.program || "",
          programcode: row.programcode || "",
          semester: row.semester || "",
          major: row.major || "",
          total: 0,
          present: 0,
          absent: 0,
          percentage: 0
        });
      }
      const item = studentMap.get(key);
      item.total += 1;
      if (Number(row.attendance) === 1) item.present += 1;
      else item.absent += 1;
      item.percentage = item.total ? Number(((item.present / item.total) * 100).toFixed(2)) : 0;
    });

    const students = [...studentMap.values()].sort((a, b) => String(a.student).localeCompare(String(b.student)));
    const selectedKey = text(req.query.studentid || req.query.selectedStudentId || req.query.selectedStudent || "");
    const selectedRegno = text(req.query.selectedRegno || "");
    const selectedEmail = text(req.query.selectedEmail || "");
    const selectedStudent = students.find((item) => (
      (selectedKey && String(item.id) === selectedKey)
      || (selectedKey && String(item.studentid) === selectedKey)
      || (selectedRegno && text(item.regno).toLowerCase() === selectedRegno.toLowerCase())
      || (selectedEmail && text(item.email).toLowerCase() === selectedEmail.toLowerCase())
    )) || null;

    const selectedRows = selectedStudent
      ? data.filter((row) => {
        const key = String(row.studentid || row.regno || row.studentemail || row.student || "");
        return key === String(selectedStudent.id)
          || (selectedStudent.studentid && String(row.studentid) === String(selectedStudent.studentid))
          || (selectedStudent.regno && text(row.regno).toLowerCase() === text(selectedStudent.regno).toLowerCase())
          || (selectedStudent.email && text(row.studentemail).toLowerCase() === text(selectedStudent.email).toLowerCase());
      })
      : [];

    const courseMap = new Map();
    selectedRows.forEach((row) => {
      const key = [
        row.coursecode || row.course || "",
        row.academicyear || "",
        row.programcode || "",
        row.semester || "",
        row.major || "",
        row.type || ""
      ].join("||");
      if (!courseMap.has(key)) {
        courseMap.set(key, {
          id: key,
          course: row.course || "",
          coursecode: row.coursecode || "",
          academicyear: row.academicyear || "",
          program: row.program || "",
          programcode: row.programcode || "",
          semester: row.semester || "",
          major: row.major || "",
          type: row.type || "",
          totalClasses: 0,
          classesAttended: 0,
          classesAbsent: 0,
          percentage: 0
        });
      }
      const item = courseMap.get(key);
      item.totalClasses += 1;
      if (Number(row.attendance) === 1) item.classesAttended += 1;
      else item.classesAbsent += 1;
      item.percentage = item.totalClasses ? Number(((item.classesAttended / item.totalClasses) * 100).toFixed(2)) : 0;
    });

    const courseRows = [...courseMap.values()].sort((a, b) => String(a.coursecode || a.course).localeCompare(String(b.coursecode || b.course)));
    const summary = {
      totalCourses: courseRows.length,
      totalClasses: selectedRows.length,
      classesAttended: selectedRows.filter((row) => Number(row.attendance) === 1).length,
      classesAbsent: selectedRows.filter((row) => Number(row.attendance) !== 1).length
    };
    summary.percentage = summary.totalClasses ? Number(((summary.classesAttended / summary.totalClasses) * 100).toFixed(2)) : 0;

    const uniq = (field) => [...new Set(data.map((row) => text(row[field])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    res.json({
      success: true,
      students,
      selectedStudent,
      rows: courseRows,
      raw: selectedRows,
      summary,
      charts: {
        courseAttendance: courseRows.map((row) => ({
          name: row.coursecode || row.course || "-",
          percentage: row.percentage,
          totalClasses: row.totalClasses,
          classesAttended: row.classesAttended
        })),
        presentAbsent: [
          { name: "Attended", value: summary.classesAttended },
          { name: "Absent", value: summary.classesAbsent }
        ]
      },
      options: {
        academicyear: uniq("academicyear"),
        program: uniq("program"),
        programcode: uniq("programcode"),
        semester: uniq("semester"),
        major: uniq("major"),
        course: uniq("course"),
        coursecode: uniq("coursecode"),
        name: [...new Set(data.map((row) => text(row.student)).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
        email: [...new Set(data.map((row) => text(row.studentemail)).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
        regno: uniq("regno"),
        type: uniq("type")
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyStudentAttendanceSummary = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    const regno = text(req.query.regno);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });

    const query = { colid, regno: regexText(regno) };
    ["academicyear", "semester", "course", "coursecode", "type"].forEach((field) => {
      if (req.query[field]) query[field] = text(req.query[field]);
    });

    const data = await NepLmsAttendance.find(query).sort({ semester: 1, coursecode: 1, classdate: 1, classtime: 1 }).lean();
    const student = data[0] ? {
      student: data[0].student || "",
      regno: data[0].regno || "",
      email: data[0].studentemail || "",
      phone: data[0].studentphone || "",
      program: data[0].program || "",
      programcode: data[0].programcode || "",
      academicyear: data[0].academicyear || "",
      major: data[0].major || ""
    } : {};

    const courseMap = new Map();
    data.forEach((row) => {
      const key = [row.semester || "", row.coursecode || row.course || "", row.type || ""].join("||");
      if (!courseMap.has(key)) {
        courseMap.set(key, {
          id: key,
          academicyear: row.academicyear || "",
          semester: row.semester || "",
          program: row.program || "",
          programcode: row.programcode || "",
          major: row.major || "",
          course: row.course || "",
          coursecode: row.coursecode || "",
          faculty: row.faculty || "",
          facultyemail: row.facultyemail || "",
          type: row.type || "",
          totalClasses: 0,
          present: 0,
          absent: 0,
          percentage: 0
        });
      }
      const item = courseMap.get(key);
      item.totalClasses += 1;
      if (Number(row.attendance) === 1) item.present += 1;
      else item.absent += 1;
      item.percentage = item.totalClasses ? Number(((item.present / item.totalClasses) * 100).toFixed(2)) : 0;
    });

    const rows = [...courseMap.values()].sort((a, b) => (
      String(a.semester).localeCompare(String(b.semester), undefined, { numeric: true })
      || String(a.coursecode || a.course).localeCompare(String(b.coursecode || b.course))
    ));
    const summary = {
      totalCourses: rows.length,
      totalClasses: data.length,
      present: data.filter((row) => Number(row.attendance) === 1).length,
      absent: data.filter((row) => Number(row.attendance) !== 1).length
    };
    summary.percentage = summary.totalClasses ? Number(((summary.present / summary.totalClasses) * 100).toFixed(2)) : 0;

    const groupRows = (field) => [...data.reduce((acc, row) => {
      const key = row[field] || "-";
      const current = acc.get(key) || { name: key, total: 0, present: 0, absent: 0, percentage: 0 };
      current.total += 1;
      if (Number(row.attendance) === 1) current.present += 1;
      else current.absent += 1;
      current.percentage = current.total ? Number(((current.present / current.total) * 100).toFixed(2)) : 0;
      acc.set(key, current);
      return acc;
    }, new Map()).values()].sort((a, b) => String(a.name).localeCompare(String(b.name), undefined, { numeric: true }));

    const detailRows = data.map((row) => ({
      id: String(row._id),
      academicyear: row.academicyear || "",
      semester: row.semester || "",
      course: row.course || "",
      coursecode: row.coursecode || "",
      faculty: row.faculty || "",
      facultyemail: row.facultyemail || "",
      classdate: row.classdate || "",
      classtime: row.classtime || "",
      type: row.type || "",
      attendance: Number(row.attendance) === 1 ? 1 : 0,
      status: Number(row.attendance) === 1 ? "Present" : "Absent",
      comments: row.comments || ""
    }));

    const uniq = (field) => [...new Set(data.map((row) => text(row[field])).filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    res.json({
      success: true,
      student,
      rows,
      detailRows,
      summary,
      charts: {
        bySemester: groupRows("semester"),
        byCourse: rows.map((row) => ({ name: row.coursecode || row.course || "-", percentage: row.percentage, total: row.totalClasses, present: row.present })),
        presentAbsent: [
          { name: "Present", value: summary.present },
          { name: "Absent", value: summary.absent }
        ]
      },
      options: {
        academicyear: uniq("academicyear"),
        semester: uniq("semester"),
        course: uniq("course"),
        coursecode: uniq("coursecode"),
        type: uniq("type")
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFacultyCoursewiseLowAttendanceReport = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    const threshold = Number(req.query.threshold || 75);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const query = { colid };
    [
      "academicyear",
      "program",
      "programcode",
      "semester",
      "major",
      "course",
      "coursecode",
      "faculty",
      "facultyemail",
      "type"
    ].forEach((field) => {
      if (req.query[field]) query[field] = text(req.query[field]);
    });

    const data = await NepLmsAttendance.find(query).sort({ faculty: 1, coursecode: 1, classdate: 1 }).lean();
    const map = new Map();
    data.forEach((row) => {
      const key = [
        row.facultyemail || row.faculty || "",
        row.coursecode || "",
        row.programcode || "",
        row.semester || "",
        row.major || "",
        row.academicyear || ""
      ].join("||");
      if (!map.has(key)) {
        map.set(key, {
          id: key,
          faculty: row.faculty || "",
          facultyemail: row.facultyemail || "",
          course: row.course || "",
          coursecode: row.coursecode || "",
          program: row.program || "",
          programcode: row.programcode || "",
          academicyear: row.academicyear || "",
          semester: row.semester || "",
          major: row.major || "",
          total: 0,
          present: 0,
          absent: 0,
          averageAttendance: 0
        });
      }
      const item = map.get(key);
      item.total += 1;
      if (Number(row.attendance) === 1) item.present += 1;
      else item.absent += 1;
      item.averageAttendance = item.total ? Number(((item.present / item.total) * 100).toFixed(2)) : 0;
    });

    const allRows = [...map.values()].sort((a, b) => (
      String(a.faculty).localeCompare(String(b.faculty))
      || String(a.coursecode).localeCompare(String(b.coursecode))
    ));
    const rows = allRows.filter((row) => Number(row.averageAttendance || 0) < threshold);

    const groupRows = (items, field) => [...items.reduce((acc, row) => {
      const key = row[field] || "-";
      const current = acc.get(key) || { name: key, courses: 0, total: 0, present: 0, absent: 0, averageAttendance: 0 };
      current.courses += 1;
      current.total += Number(row.total || 0);
      current.present += Number(row.present || 0);
      current.absent += Number(row.absent || 0);
      current.averageAttendance = current.total ? Number(((current.present / current.total) * 100).toFixed(2)) : 0;
      acc.set(key, current);
      return acc;
    }, new Map()).values()].sort((a, b) => String(a.name).localeCompare(String(b.name)));

    const uniq = (field) => [...new Set(data.map((row) => text(row[field])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const summary = {
      totalCourseRows: allRows.length,
      lowCourseRows: rows.length,
      totalEntries: rows.reduce((sum, row) => sum + Number(row.total || 0), 0),
      present: rows.reduce((sum, row) => sum + Number(row.present || 0), 0),
      absent: rows.reduce((sum, row) => sum + Number(row.absent || 0), 0),
      threshold
    };
    summary.averageAttendance = summary.totalEntries ? Number(((summary.present / summary.totalEntries) * 100).toFixed(2)) : 0;

    res.json({
      success: true,
      rows,
      allRows,
      summary,
      charts: {
        byFaculty: groupRows(rows, "faculty"),
        byCourse: groupRows(rows, "coursecode"),
        byProgram: groupRows(rows, "programcode"),
        thresholdSummary: [
          { name: "Below Threshold", value: rows.length },
          { name: "At or Above", value: Math.max(allRows.length - rows.length, 0) }
        ]
      },
      options: {
        academicyear: uniq("academicyear"),
        program: uniq("program"),
        programcode: uniq("programcode"),
        semester: uniq("semester"),
        major: uniq("major"),
        course: uniq("course"),
        coursecode: uniq("coursecode"),
        faculty: uniq("faculty"),
        facultyemail: uniq("facultyemail"),
        type: uniq("type")
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
