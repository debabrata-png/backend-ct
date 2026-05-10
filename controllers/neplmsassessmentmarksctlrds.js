const WorkloadAssignment = require("../Models/workloadassignmentds");
const CourseAssessment = require("../Models/courseassessmentds");
const User = require("../Models/user");
const NepLmsAssessmentMarks = require("../Models/neplmsassessmentmarksds");
const NepLmsComponentMarks = require("../Models/neplmscomponentmarksds");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value || "").trim();
const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const exactRegex = (value) => ({ $regex: `^${escapeRegExp(text(value))}$`, $options: "i" });

exports.getFacultyCourses = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const facultyemail = text(req.query.facultyemail || req.query.user);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!facultyemail) return res.status(400).json({ success: false, message: "faculty email is required" });

    const query = {
      colid,
      facultyemail: exactRegex(facultyemail),
      status: req.query.status || "Active"
    };
    if (req.query.academicyear) query.academicyear = req.query.academicyear;
    if (req.query.semester) query.semester = req.query.semester;

    const courses = await WorkloadAssignment.find(query)
      .sort({ academicyear: 1, semester: 1, course: 1 })
      .lean();

    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseAssessmentsForMarks = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid, status: req.query.status || "Active" };
    ["academicyear", "coursecode", "semester"].forEach((field) => {
      if (req.query[field]) query[field] = req.query[field];
    });

    const data = await CourseAssessment.find(query)
      .sort({ assessmentgroup: 1, grouptype: 1, scoretype: 1, assessmentcomponent: 1 })
      .lean();

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentsForAssessmentMarks = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const studentQuery = {
      colid,
      role: /^Student$/i
    };
    if (req.query.academicyear) studentQuery.academicyear = req.query.academicyear;
    if (req.query.program) studentQuery.program = req.query.program;
    if (req.query.programcode) studentQuery.programcode = req.query.programcode;
    if (req.query.semester) studentQuery.semester = req.query.semester;
    if (req.query.major) studentQuery.Major = req.query.major;

    const students = await User.find(studentQuery)
      .select("name regno email phone academicyear program programcode semester Major section colid")
      .sort({ programcode: 1, semester: 1, section: 1, name: 1 })
      .lean();

    const markQuery = {
      colid,
      academicyear: req.query.academicyear || "",
      coursecode: req.query.coursecode || "",
      semester: req.query.semester || "",
      assessmentcomponent: req.query.assessmentcomponent || "",
      assessmentgroup: req.query.assessmentgroup || ""
    };
    const marks = await NepLmsAssessmentMarks.find(markQuery).lean();
    const markMap = new Map(marks.map((item) => [item.regno, item]));

    res.json({
      success: true,
      data: students.map((student) => {
        const mark = markMap.get(student.regno);
        return {
          ...student,
          student: student.name || "",
          marksobtained: mark?.marksobtained ?? "",
          effectivemarks: mark?.effectivemarks ?? "",
          marksid: mark?._id || ""
        };
      })
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveAssessmentMarksBulk = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const assessment = req.body.assessment || {};
    const course = req.body.course || {};
    const marksRows = Array.isArray(req.body.marks) ? req.body.marks : [];
    const totalmarks = toNumber(assessment.marks) || toNumber(req.body.totalmarks) || 0;
    const weightage = toNumber(assessment.weightage) || 0;

    if (!marksRows.length) return res.status(400).json({ success: false, message: "No marks received" });
    if (!assessment.assessmentcomponent) return res.status(400).json({ success: false, message: "Assessment component is required" });

    const errors = [];
    const ops = [];

    marksRows.forEach((row, index) => {
      const regno = text(row.regno);
      const marksobtained = toNumber(row.marksobtained);
      if (!regno) {
        errors.push({ rowNumber: index + 1, message: "Reg no missing" });
        return;
      }
      if (marksobtained === undefined) return;
      if (marksobtained < 0 || marksobtained > totalmarks) {
        errors.push({ rowNumber: index + 1, regno, message: `Marks cannot be more than ${totalmarks}` });
        return;
      }

      const payload = {
        academicyear: text(course.academicyear || assessment.academicyear),
        regulation: text(course.regulation || assessment.regulation),
        program: text(course.program || assessment.program),
        programcode: text(course.programcode || assessment.programcode),
        type: text(course.type || assessment.type),
        subject: text(course.subject || assessment.subject),
        semester: text(course.semester || assessment.semester),
        course: text(course.course || assessment.course),
        coursecode: text(course.coursecode || assessment.coursecode),
        assessmentcomponent: text(assessment.assessmentcomponent),
        assessmentgroup: text(assessment.assessmentgroup),
        grouptype: text(assessment.grouptype),
        scoretype: text(assessment.scoretype),
        totalmarks,
        weightage,
        marksobtained,
        effectivemarks: marksobtained * weightage,
        student: text(row.student || row.name),
        regno,
        email: text(row.email),
        phone: text(row.phone),
        faculty: text(course.facultyname || course.faculty),
        facultyemail: text(course.facultyemail),
        status: "Added",
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
            assessmentcomponent: payload.assessmentcomponent,
            assessmentgroup: payload.assessmentgroup,
            regno
          },
          update: { $set: payload },
          upsert: true
        }
      });
    });

    let saved = 0;
    if (ops.length) {
      const result = await NepLmsAssessmentMarks.bulkWrite(ops, { ordered: false });
      saved = (result.upsertedCount || 0) + (result.modifiedCount || 0) + (result.matchedCount || 0);
    }

    res.json({ success: true, saved, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssessmentMarks = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid };
    [
      "academicyear",
      "semester",
      "coursecode",
      "course",
      "program",
      "programcode",
      "assessmentcomponent",
      "assessmentgroup",
      "status"
    ].forEach((field) => {
      if (req.query[field]) query[field] = req.query[field];
    });

    if (req.query.facultyemail || req.query.user) {
      query.facultyemail = exactRegex(req.query.facultyemail || req.query.user);
    }

    const data = await NepLmsAssessmentMarks.find(query)
      .sort({ assessmentgroup: 1, assessmentcomponent: 1, regno: 1, student: 1 })
      .lean();

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAssessmentMark = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const id = text(req.body.id || req.body._id);
    const marksobtained = toNumber(req.body.marksobtained);

    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!id) return res.status(400).json({ success: false, message: "id is required" });
    if (marksobtained === undefined || marksobtained < 0) {
      return res.status(400).json({ success: false, message: "Valid marks obtained is required" });
    }

    const existing = await NepLmsAssessmentMarks.findOne({ _id: id, colid });
    if (!existing) return res.status(404).json({ success: false, message: "Marks entry not found" });

    const totalmarks = Number(existing.totalmarks) || 0;
    if (totalmarks && marksobtained > totalmarks) {
      return res.status(400).json({ success: false, message: `Marks cannot be more than ${totalmarks}` });
    }

    existing.marksobtained = marksobtained;
    existing.effectivemarks = marksobtained * (Number(existing.weightage) || 0);
    existing.user = text(req.body.user || existing.user);
    await existing.save();

    res.json({ success: true, data: existing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAssessmentMark = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const id = text(req.body.id || req.body._id);

    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!id) return res.status(400).json({ success: false, message: "id is required" });

    const deleted = await NepLmsAssessmentMarks.findOneAndDelete({ _id: id, colid });
    if (!deleted) return res.status(404).json({ success: false, message: "Marks entry not found" });

    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.processComponentMarks = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid };
    ["academicyear", "semester", "coursecode", "course", "programcode"].forEach((field) => {
      if (req.body[field]) query[field] = req.body[field];
    });
    if (req.body.facultyemail || req.body.user) {
      query.facultyemail = exactRegex(req.body.facultyemail || req.body.user);
    }

    const rawMarks = await NepLmsAssessmentMarks.find(query).lean();
    if (!rawMarks.length) return res.status(400).json({ success: false, message: "No marks found for processing" });

    const groups = new Map();
    rawMarks.forEach((row) => {
      const key = [
        row.academicyear,
        row.semester,
        row.programcode,
        row.coursecode,
        row.regno,
        row.assessmentgroup,
        row.scoretype
      ].map((item) => text(item)).join("||");

      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    });

    const ops = [];
    groups.forEach((rows) => {
      const first = rows[0] || {};
      const values = rows
        .map((row) => toNumber(row.effectivemarks))
        .filter((value) => value !== undefined);
      if (!values.length) return;

      const grouptype = text(first.grouptype || rows.find((row) => row.grouptype)?.grouptype);
      const useBest = grouptype.toLowerCase() === "best";
      const marks = useBest
        ? Math.max(...values)
        : values.reduce((sum, value) => sum + value, 0) / values.length;

      const payload = {
        academicyear: text(first.academicyear),
        semester: text(first.semester),
        programcode: text(first.programcode),
        course: text(first.course),
        coursecode: text(first.coursecode),
        major: text(first.subject),
        subject: text(first.subject),
        student: text(first.student),
        regno: text(first.regno),
        assessmentgroup: text(first.assessmentgroup),
        grouptype,
        scoretype: text(first.scoretype),
        marks: Number(marks.toFixed(2)),
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
            regno: payload.regno,
            assessmentgroup: payload.assessmentgroup,
            scoretype: payload.scoretype
          },
          update: { $set: payload },
          upsert: true
        }
      });
    });

    let processed = 0;
    if (ops.length) {
      const result = await NepLmsComponentMarks.bulkWrite(ops, { ordered: false });
      processed = (result.upsertedCount || 0) + (result.modifiedCount || 0) + (result.matchedCount || 0);
    }

    res.json({ success: true, processed });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getComponentMarks = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid };
    [
      "academicyear",
      "semester",
      "programcode",
      "coursecode",
      "course",
      "major",
      "subject",
      "assessmentgroup",
      "scoretype",
      "regno"
    ].forEach((field) => {
      if (req.query[field]) query[field] = req.query[field];
    });

    const data = await NepLmsComponentMarks.find(query)
      .sort({ academicyear: 1, semester: 1, course: 1, assessmentgroup: 1, regno: 1 })
      .lean();

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteComponentMark = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const id = text(req.body.id || req.body._id);

    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!id) return res.status(400).json({ success: false, message: "id is required" });

    const deleted = await NepLmsComponentMarks.findOneAndDelete({ _id: id, colid });
    if (!deleted) return res.status(404).json({ success: false, message: "Componentwise marks entry not found" });

    res.json({ success: true, data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
