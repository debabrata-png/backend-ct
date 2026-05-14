const path = require("path");
const multer = require("multer");
const AWS = require("aws-sdk");
const User = require("../Models/user");
const Awsconfig = require("../Models/awsconfig");
const StudentActivity = require("../Models/studentactivityds");

const upload = multer({ storage: multer.memoryStorage() });
exports.uploadMiddleware = upload.single("document");

const studentFilterFields = [
  "academicyear",
  "admissionyear",
  "name",
  "email",
  "phone",
  "regno",
  "program",
  "programcode",
  "semester",
  "section",
  "category",
  "gender",
  "Major",
  "Minor"
];

const text = (value) => String(value || "").trim();
const num = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const escapeRegex = (value) => text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const encodeS3Key = (key) => String(key || "").split("/").map(encodeURIComponent).join("/");
const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const serializeStudent = (student = {}) => ({
  _id: student._id,
  name: student.name || "",
  regno: student.regno || "",
  email: student.email || "",
  phone: student.phone || "",
  academicyear: student.academicyear || "",
  admissionyear: student.admissionyear || "",
  program: student.program || "",
  programcode: student.programcode || "",
  semester: student.semester || "",
  section: student.section || "",
  category: student.category || "",
  gender: student.gender || "",
  major: student.Major || student.major || "",
  minor: student.Minor || student.minor || ""
});

const selectedStudentPayload = (body = {}) => ({
  studentid: text(body.studentid),
  student: text(body.student || body.name),
  regno: text(body.regno),
  email: text(body.email),
  phone: text(body.phone),
  academicyear: text(body.academicyear),
  program: text(body.program),
  programcode: text(body.programcode),
  semester: text(body.semester),
  section: text(body.section)
});

const activityPayload = (body = {}) => ({
  colid: num(body.colid),
  user: text(body.user),
  ...selectedStudentPayload(body),
  activitytype: text(body.activitytype || body.type),
  activitydetails: text(body.activitydetails || body.details),
  activitydate: text(body.activitydate),
  documenturl: text(body.documenturl),
  documentname: text(body.documentname),
  documentkey: text(body.documentkey),
  status: text(body.status) || "Active"
});

const buildStudentSearchFilter = (body = {}) => {
  const filter = { colid: num(body.colid), role: "Student" };
  const filters = Array.isArray(body.filters) ? body.filters : [];
  filters.forEach(({ field, value }) => {
    if (!studentFilterFields.includes(field) || !text(value)) return;
    if (["name", "email", "phone", "regno"].includes(field)) {
      filter[field] = new RegExp(escapeRegex(value), "i");
    } else {
      filter[field] = text(value);
    }
  });
  return filter;
};

const getDefaultAwsConfig = async (colid) => Awsconfig.findOne({ colid: num(colid), type: /^aws$/i, default: /^yes$/i }).sort({ _id: -1 }).lean();

const uploadDocument = async (colid, file) => {
  if (!file) return {};
  const config = await getDefaultAwsConfig(colid);
  if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
    throw new Error("Default AWS configuration is missing or incomplete");
  }
  const cleanName = path.basename(file.originalname || "activity-document").replace(/[^\w.\-() ]/g, "_");
  const key = `${colid}/student-activities/${Date.now()}-${cleanName}`;
  const s3 = new AWS.S3({
    accessKeyId: config.username,
    secretAccessKey: config.password,
    region: config.region
  });
  await s3.putObject({
    Bucket: config.bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype
  }).promise();
  return {
    documenturl: s3Url(config.bucket, config.region, key),
    documentname: cleanName,
    documentkey: key
  };
};

exports.getStudentFilterOptions = async (req, res) => {
  try {
    const colid = num(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const options = {};
    await Promise.all(studentFilterFields.map(async (field) => {
      const values = await User.distinct(field, { colid, role: "Student" });
      options[field] = values.filter(Boolean).map(String).sort((a, b) => a.localeCompare(b));
    }));
    res.json({ success: true, fields: studentFilterFields, options });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchStudents = async (req, res) => {
  try {
    const filter = buildStudentSearchFilter(req.body);
    if (!filter.colid) return res.status(400).json({ success: false, message: "colid is required" });
    const students = await User.find(filter)
      .select("name regno email phone academicyear admissionyear program programcode semester section category gender Major Minor")
      .sort({ name: 1, regno: 1 })
      .limit(500)
      .lean();
    res.json({ success: true, data: students.map(serializeStudent) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const colid = num(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const filter = { colid };
    ["studentid", "regno", "email", "academicyear", "program", "programcode", "semester", "section", "activitytype", "status"].forEach((field) => {
      if (text(req.query[field])) filter[field] = text(req.query[field]);
    });
    const data = await StudentActivity.find(filter).sort({ activitydate: -1, createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createActivity = async (req, res) => {
  try {
    const payload = activityPayload(req.body);
    if (!payload.colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!payload.student && payload.studentid) {
      const student = await User.findOne({ _id: payload.studentid, colid: payload.colid, role: "Student" }).lean();
      Object.assign(payload, selectedStudentPayload(serializeStudent(student)));
    }
    if (!payload.student || !payload.activitytype || !payload.activitydetails) {
      return res.status(400).json({ success: false, message: "Student, activity type and details are required" });
    }
    const filePayload = await uploadDocument(payload.colid, req.file);
    const data = await StudentActivity.create({ ...payload, ...filePayload });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateActivity = async (req, res) => {
  try {
    const payload = activityPayload(req.body);
    if (!req.body.id) return res.status(400).json({ success: false, message: "id is required" });
    if (!payload.colid) return res.status(400).json({ success: false, message: "colid is required" });
    const filePayload = await uploadDocument(payload.colid, req.file);
    const data = await StudentActivity.findOneAndUpdate(
      { _id: req.body.id, colid: payload.colid },
      { ...payload, ...filePayload },
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Activity not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteActivity = async (req, res) => {
  try {
    const data = await StudentActivity.findOneAndDelete({ _id: req.body.id, colid: num(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Activity not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bulkActivities = async (req, res) => {
  try {
    const colid = num(req.body.colid);
    const rows = Array.isArray(req.body.rows) ? req.body.rows : [];
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!rows.length) return res.status(400).json({ success: false, message: "No rows received" });
    const errors = [];
    const docs = [];
    rows.forEach((row, index) => {
      const payload = activityPayload({ ...row, colid, user: req.body.user || row.user });
      if (!payload.student && row.name) payload.student = text(row.name);
      if (!payload.student || !payload.activitytype || !payload.activitydetails) {
        errors.push({ row: index + 2, message: "Student, activitytype and activitydetails are required" });
        return;
      }
      docs.push(payload);
    });
    const inserted = docs.length ? await StudentActivity.insertMany(docs, { ordered: false }) : [];
    res.json({ success: true, inserted: inserted.length, errors, data: inserted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
