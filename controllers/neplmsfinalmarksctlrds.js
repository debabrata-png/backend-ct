const NepLmsComponentMarks = require("../Models/neplmscomponentmarksds");
const NepLmsFinalMarks = require("../Models/neplmsfinalmarksds");
const NepLmsAssessmentMarks = require("../Models/neplmsassessmentmarksds");
const GradeConfiguration = require("../Models/gradeconfigurationds");
const User = require("../Models/user");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value || "").trim();

const getUgcGrade = (percentage) => {
  if (percentage >= 90) return { grade: "O", gradepoint: 10 };
  if (percentage >= 80) return { grade: "A+", gradepoint: 9 };
  if (percentage >= 70) return { grade: "A", gradepoint: 8 };
  if (percentage >= 60) return { grade: "B+", gradepoint: 7 };
  if (percentage >= 50) return { grade: "B", gradepoint: 6 };
  if (percentage >= 40) return { grade: "C", gradepoint: 5 };
  if (percentage >= 36) return { grade: "P", gradepoint: 4 };
  return { grade: "F", gradepoint: 0 };
};

const buildGradeKey = (row) => [
  row.academicyear,
  row.regulation,
  row.programcode,
  row.subject,
  row.semester,
  row.coursecode
].map((value) => text(value).toLowerCase()).join("||");

const buildQuery = (source = {}) => {
  const query = {};
  const colid = toNumber(source.colid);
  if (colid !== undefined) query.colid = colid;
  [
    "academicyear",
    "semester",
    "program",
    "programcode",
    "course",
    "coursecode",
    "major",
    "subject",
    "regno",
    "passstatus"
  ].forEach((field) => {
    if (source[field]) query[field] = source[field];
  });
  return query;
};

exports.processFinalMarks = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const failmode = text(req.body.failmode) || "Any Component";
    const grademode = text(req.body.grademode) || "UGC";

    const query = { colid };
    ["academicyear", "semester", "programcode", "coursecode", "course", "major", "subject", "regno"].forEach((field) => {
      if (req.body[field]) query[field] = req.body[field];
    });

    const componentRows = await NepLmsComponentMarks.find(query).lean();
    if (!componentRows.length) return res.status(400).json({ success: false, message: "No componentwise marks found for processing" });

    const rawQuery = { colid };
    ["academicyear", "semester", "programcode", "coursecode"].forEach((field) => {
      if (query[field]) rawQuery[field] = query[field];
    });
    const rawMarks = await NepLmsAssessmentMarks.find(rawQuery)
      .select("academicyear semester program programcode regulation subject course coursecode regno")
      .lean();
    const rawMap = new Map();
    rawMarks.forEach((item) => {
      const key = [item.academicyear, item.semester, item.programcode, item.coursecode, item.regno]
        .map((value) => text(value).toLowerCase()).join("||");
      if (!rawMap.has(key)) rawMap.set(key, item);
    });

    const gradeRows = await GradeConfiguration.find({ colid, status: "Active" }).lean();
    const gradeMap = new Map();
    gradeRows.forEach((item) => {
      const key = buildGradeKey(item);
      if (!gradeMap.has(key)) gradeMap.set(key, []);
      gradeMap.get(key).push(item);
    });

    const getConfiguredGrade = (row, total) => {
      const configs = gradeMap.get(buildGradeKey(row)) || [];
      const found = configs.find((item) => total >= (Number(item.frompercentage) || 0) && total <= (Number(item.topercentage) || 0));
      if (found) return { grade: text(found.grade), gradepoint: Number(found.gradepoint) || 0 };
      return getUgcGrade(total);
    };

    const groups = new Map();
    componentRows.forEach((row) => {
      const key = [row.academicyear, row.semester, row.programcode, row.coursecode, row.regno]
        .map((value) => text(value)).join("||");
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    });

    const ops = [];
    groups.forEach((rows) => {
      const first = rows[0] || {};
      const rawKey = [first.academicyear, first.semester, first.programcode, first.coursecode, first.regno]
        .map((value) => text(value).toLowerCase()).join("||");
      const raw = rawMap.get(rawKey) || {};
      const internalmarks = rows
        .filter((row) => text(row.scoretype).toLowerCase() === "internal")
        .reduce((sum, row) => sum + (Number(row.marks) || 0), 0);
      const externalRows = rows.filter((row) => text(row.scoretype).toLowerCase() === "external");
      const externalmarks = externalRows.reduce((sum, row) => sum + (Number(row.marks) || 0), 0);
      const total = internalmarks + externalmarks;
      const anyComponentFailed = rows.some((row) => row.passstatus === "Fail");
      const externalFailed = externalRows.some((row) => row.passstatus === "Fail");
      const failByExternalOnly = failmode.toLowerCase().includes("external");
      const passstatus = (failByExternalOnly ? externalFailed : anyComponentFailed) ? "Fail" : "Pass";
      const enriched = {
        ...first,
        program: raw.program || first.program || "",
        regulation: raw.regulation || first.regulation || "",
        subject: first.subject || raw.subject || "",
        major: first.major || first.subject || raw.subject || ""
      };
      const gradeInfo = grademode.toLowerCase().includes("configuration")
        ? getConfiguredGrade(enriched, total)
        : getUgcGrade(total);
      const gradepoint = passstatus === "Fail" ? 0 : gradeInfo.gradepoint;
      const credits = rows.map((row) => toNumber(row.credits)).find((value) => value !== undefined) || 0;

      const payload = {
        academicyear: text(first.academicyear),
        semester: text(first.semester),
        program: text(enriched.program),
        programcode: text(first.programcode),
        regulation: text(enriched.regulation),
        course: text(first.course),
        coursecode: text(first.coursecode),
        major: text(enriched.major),
        subject: text(enriched.subject),
        student: text(first.student),
        regno: text(first.regno),
        internalmarks: Number(internalmarks.toFixed(2)),
        externalmarks: Number(externalmarks.toFixed(2)),
        total: Number(total.toFixed(2)),
        grade: passstatus === "Fail" ? "F" : gradeInfo.grade,
        gradepoint,
        credits,
        gpa: Number((gradepoint * credits).toFixed(2)),
        passstatus,
        attempt: 1,
        failmode,
        grademode,
        colid,
        user: text(req.body.user)
      };

      ops.push({
        updateOne: {
          filter: {
            colid,
            academicyear: payload.academicyear,
            semester: payload.semester,
            coursecode: payload.coursecode,
            regno: payload.regno
          },
          update: { $set: payload },
          upsert: true
        }
      });
    });

    let processed = 0;
    if (ops.length) {
      const result = await NepLmsFinalMarks.bulkWrite(ops, { ordered: false });
      processed = (result.upsertedCount || 0) + (result.modifiedCount || 0) + (result.matchedCount || 0);
    }

    res.json({ success: true, processed });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFinalMarks = async (req, res) => {
  try {
    const query = buildQuery(req.query);
    if (query.colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const data = await NepLmsFinalMarks.find(query)
      .sort({ academicyear: 1, semester: 1, course: 1, regno: 1 })
      .lean();

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteFinalMark = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const id = text(req.body.id || req.body._id);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!id) return res.status(400).json({ success: false, message: "id is required" });

    const deleted = await NepLmsFinalMarks.findOneAndDelete({ _id: id, colid });
    if (!deleted) return res.status(404).json({ success: false, message: "Final marks entry not found" });

    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchGradeCardStudents = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid, role: /^Student$/i };
    const exactFields = ["academicyear", "admissionyear", "program", "programcode", "semester", "section"];
    exactFields.forEach((field) => {
      if (req.query[field]) query[field] = req.query[field];
    });
    if (req.query.major) query.Major = req.query.major;
    if (req.query.minor) query.Minor = req.query.minor;
    ["name", "email", "phone", "regno"].forEach((field) => {
      if (req.query[field]) query[field] = { $regex: text(req.query[field]), $options: "i" };
    });

    const students = await User.find(query)
      .select("name email phone regno rollno academicyear admissionyear program programcode semester section Major Minor category gender regulation colid")
      .sort({ academicyear: 1, programcode: 1, semester: 1, section: 1, name: 1 })
      .limit(500)
      .lean();

    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGradeCardOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const students = await User.find({ colid, role: /^Student$/i })
      .select("academicyear admissionyear program programcode semester section Major Minor")
      .lean();
    const uniqueSorted = (values) => [...new Set(values.map(text).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    res.json({
      success: true,
      academicyears: uniqueSorted(students.map((item) => item.academicyear)),
      admissionyears: uniqueSorted(students.map((item) => item.admissionyear)),
      programs: uniqueSorted(students.map((item) => item.program)),
      programcodes: uniqueSorted(students.map((item) => item.programcode)),
      semesters: uniqueSorted(students.map((item) => item.semester)),
      sections: uniqueSorted(students.map((item) => item.section)),
      majors: uniqueSorted(students.map((item) => item.Major)),
      minors: uniqueSorted(students.map((item) => item.Minor))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGradeCard = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const regno = text(req.query.regno);
    const semester = text(req.query.semester);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });
    if (!semester) return res.status(400).json({ success: false, message: "semester is required" });

    const [student, semesterMarks, allMarks] = await Promise.all([
      User.findOne({ colid, regno }).select("name email phone regno rollno academicyear admissionyear program programcode semester section Major Minor category gender regulation colid").lean(),
      NepLmsFinalMarks.find({ colid, regno, semester }).sort({ course: 1, coursecode: 1 }).lean(),
      NepLmsFinalMarks.find({ colid, regno }).sort({ semester: 1, course: 1 }).lean()
    ]);

    const getSummary = (rows) => {
      const totalCredits = rows.reduce((sum, row) => sum + (Number(row.credits) || 0), 0);
      const totalGpa = rows.reduce((sum, row) => sum + (Number(row.gpa) || 0), 0);
      return {
        totalCredits: Number(totalCredits.toFixed(2)),
        totalGpa: Number(totalGpa.toFixed(2)),
        value: totalCredits ? Number((totalGpa / totalCredits).toFixed(2)) : 0
      };
    };

    const selectedSemesterNumber = Number(semester);
    const cgpaRows = Number.isNaN(selectedSemesterNumber)
      ? allMarks
      : allMarks.filter((row) => {
        const rowSemester = Number(row.semester);
        return !Number.isNaN(rowSemester) && rowSemester <= selectedSemesterNumber;
      });

    res.json({
      success: true,
      student,
      marks: semesterMarks,
      sgpa: getSummary(semesterMarks),
      cgpa: getSummary(cgpaRows),
      allMarks: cgpaRows
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
