const path = require("path");
const multer = require("multer");
const AWS = require("aws-sdk");
const Awsconfig = require("../Models/awsconfig");
const NepLmsResource = require("../Models/neplmsresourceds");
const NepLmsTimetable = require("../Models/neplmstimetableds");
const NepLmsAssignmentSubmission = require("../Models/neplmsassignmentsubmissionds");

const upload = multer({ storage: multer.memoryStorage() });
exports.uploadMiddleware = upload.single("file");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const optionalNumber = (value) => {
  if (value === "" || value === null || value === undefined) return 0;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const encodeS3Key = (key) => String(key || "").split("/").map(encodeURIComponent).join("/");
const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const coursePayload = (body = {}) => ({
  academicyear: text(body.academicyear),
  regulation: text(body.regulation),
  program: text(body.program),
  programcode: text(body.programcode),
  type: text(body.type),
  major: text(body.major || body.subject),
  semester: text(body.semester),
  course: text(body.course),
  coursecode: text(body.coursecode),
  faculty: text(body.faculty || body.facultyname),
  facultyemail: text(body.facultyemail),
  colid: Number(body.colid),
  user: text(body.user)
});

const resourcePayload = (body = {}) => ({
  ...coursePayload(body),
  resourcetype: text(body.resourcetype),
  title: text(body.title),
  module: text(body.module),
  topic: text(body.topic),
  description: text(body.description),
  duedate: text(body.duedate),
  fullmarks: optionalNumber(body.fullmarks),
  status: text(body.status) || "Active"
});

const timetablePayload = (body = {}) => ({
  ...coursePayload(body),
  faculty: text(body.faculty || body.facultyname),
  major: text(body.major || body.subject),
  classdate: text(body.classdate),
  classtime: text(body.classtime),
  period: text(body.period),
  durationminutes: number(body.durationminutes || body.durationMinutes),
  module: text(body.module),
  topic: text(body.topic),
  workcompleted: body.workcompleted === undefined ? "" : text(body.workcompleted),
  status: text(body.status) || "Active"
});

const courseFilter = (source = {}) => {
  const filter = { colid: Number(source.colid) };
  [
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
    "period",
    "resourcetype",
    "status",
    "user"
  ].forEach((field) => {
    if (source[field]) filter[field] = source[field];
  });
  return filter;
};

const getDefaultAwsConfig = async (colid) => Awsconfig.findOne({ colid: Number(colid), type: /^aws$/i, default: /^yes$/i }).sort({ _id: -1 }).lean();

exports.getResources = async (req, res) => {
  try {
    const data = await NepLmsResource.find(courseFilter(req.query)).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAssignmentSubmissions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const assignmentid = text(req.query.assignmentid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!assignmentid) return res.status(400).json({ success: false, message: "Assignment is required" });

    const assignment = await NepLmsResource.findOne({
      _id: assignmentid,
      colid,
      resourcetype: "Assignment"
    }).lean();
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });

    if (req.query.coursecode && assignment.coursecode !== req.query.coursecode) {
      return res.status(400).json({ success: false, message: "Assignment does not belong to selected course" });
    }
    if (req.query.facultyemail && assignment.facultyemail !== req.query.facultyemail) {
      return res.status(403).json({ success: false, message: "Assignment does not belong to selected faculty" });
    }

    const submissions = await NepLmsAssignmentSubmission.find({ colid, assignmentid })
      .sort({ submitteddate: -1, student: 1 })
      .lean();
    const data = submissions.map((row) => ({
      ...row,
      fullmarks: row.fullmarks || assignment.fullmarks || 0
    }));

    res.json({ success: true, assignment, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.gradeAssignmentSubmission = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const id = text(req.body.id);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!id) return res.status(400).json({ success: false, message: "Submission is required" });

    const submission = await NepLmsAssignmentSubmission.findOne({ _id: id, colid });
    if (!submission) return res.status(404).json({ success: false, message: "Submission not found" });

    const assignment = await NepLmsResource.findOne({ _id: submission.assignmentid, colid, resourcetype: "Assignment" }).lean();
    const fullmarks = optionalNumber(req.body.fullmarks || submission.fullmarks || assignment?.fullmarks);
    const marks = optionalNumber(req.body.marks);
    if (fullmarks && marks > fullmarks) {
      return res.status(400).json({ success: false, message: "Marks cannot be more than full marks" });
    }

    submission.fullmarks = fullmarks;
    submission.marks = marks;
    submission.facultycomments = text(req.body.facultycomments);
    submission.gradedby = text(req.body.gradedby || req.body.user);
    submission.gradeddate = new Date();
    submission.status = "Graded";
    const data = await submission.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadResource = async (req, res) => {
  try {
    const payload = resourcePayload(req.body);
    if (!payload.colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!payload.resourcetype) return res.status(400).json({ success: false, message: "Resource type is required" });
    if (!payload.coursecode) return res.status(400).json({ success: false, message: "Course is required" });

    let filePayload = {};
    if (req.file) {
      const config = await getDefaultAwsConfig(payload.colid);
      if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
        return res.status(400).json({ success: false, message: "Default AWS configuration is incomplete" });
      }
      const cleanName = path.basename(req.file.originalname).replace(/[^\w.\-() ]/g, "_");
      const folder = `nep-lms/${payload.academicyear || "year"}/${payload.coursecode || "course"}/${payload.resourcetype}`;
      const key = `${payload.colid}/${folder}/${Date.now()}-${cleanName}`;
      const s3 = new AWS.S3({
        accessKeyId: config.username,
        secretAccessKey: config.password,
        region: config.region
      });
      await s3.putObject({
        Bucket: config.bucket,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }).promise();
      filePayload = {
        filename: cleanName,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bucket: config.bucket,
        region: config.region,
        key,
        url: s3Url(config.bucket, config.region, key)
      };
    }

    const data = await NepLmsResource.create({ ...payload, ...filePayload });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const data = await NepLmsResource.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      resourcePayload(req.body),
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Resource not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    await NepLmsResource.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTimetable = async (req, res) => {
  try {
    const data = await NepLmsTimetable.find(courseFilter(req.query)).sort({ classdate: 1, classtime: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkCreateTimetable = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!items.length) return res.status(400).json({ success: false, message: "No rows received" });

    const errors = [];
    let saved = 0;
    for (let index = 0; index < items.length; index += 1) {
      const rowNumber = items[index].rowNumber || index + 2;
      const payload = timetablePayload({ ...items[index], colid, user: req.body.user || items[index].user });
      if (!payload.coursecode || !payload.classdate || !payload.classtime) {
        errors.push({ rowNumber, message: "Course code, class date and class time are required" });
        continue;
      }
      try {
        await NepLmsTimetable.create(payload);
        saved += 1;
      } catch (error) {
        errors.push({ rowNumber, message: error.message });
      }
    }
    res.json({ success: true, saved, errors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTimetable = async (req, res) => {
  try {
    const payload = timetablePayload(req.body);
    if (!payload.colid || !payload.coursecode || !payload.classdate || !payload.classtime) {
      return res.status(400).json({ success: false, message: "Course, class date and class time are required" });
    }
    const data = await NepLmsTimetable.create(payload);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTimetable = async (req, res) => {
  try {
    const data = await NepLmsTimetable.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      timetablePayload(req.body),
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Class not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTimetable = async (req, res) => {
  try {
    await NepLmsTimetable.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.swapTimetable = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const first = await NepLmsTimetable.findOne({ _id: req.body.firstId, colid });
    const second = await NepLmsTimetable.findOne({ _id: req.body.secondId, colid });
    if (!first || !second) return res.status(404).json({ success: false, message: "Both classes are required for swapping" });

    const firstSlot = {
      classdate: first.classdate,
      classtime: first.classtime,
      period: first.period,
      durationminutes: first.durationminutes
    };
    first.classdate = second.classdate;
    first.classtime = second.classtime;
    first.period = second.period;
    first.durationminutes = second.durationminutes;
    second.classdate = firstSlot.classdate;
    second.classtime = firstSlot.classtime;
    second.period = firstSlot.period;
    second.durationminutes = firstSlot.durationminutes;

    await first.save();
    await second.save();
    res.json({ success: true, data: [first, second] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
