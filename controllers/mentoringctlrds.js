const path = require("path");
const multer = require("multer");
const AWS = require("aws-sdk");
const User = require("../Models/user");
const Awsconfig = require("../Models/awsconfig");
const MentoringWorkspace = require("../Models/mentoringworkspaceds");
const MentoringMessage = require("../Models/mentoringmessageds");

const upload = multer({ storage: multer.memoryStorage() });
exports.uploadMiddleware = upload.single("file");

const studentFilterFields = [
  "academicyear",
  "regulation",
  "program",
  "programcode",
  "semester",
  "section",
  "Major",
  "Minor",
  "category",
  "gender"
];

const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== "";
const text = (value) => String(value || "").trim();
const uniqueSorted = (values = []) => [...new Set(values.map((value) => text(value)).filter(Boolean))]
  .sort((a, b) => a.localeCompare(b));
const encodeS3Key = (key) => String(key || "").split("/").map(encodeURIComponent).join("/");
const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const studentBaseQuery = (colid) => ({ colid: Number(colid), role: { $regex: /^student$/i } });
const getDefaultAwsConfig = async (colid) => Awsconfig.findOne({ colid: Number(colid), type: /^aws$/i, default: /^yes$/i }).sort({ _id: -1 }).lean();

const uploadFileToAws = async (colid, file) => {
  if (!file) throw new Error("File is required");
  const config = await getDefaultAwsConfig(colid);
  if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
    throw new Error("Default AWS configuration is missing or incomplete");
  }
  const cleanName = path.basename(file.originalname || "mentoring-file").replace(/[^\w.\-() ]/g, "_");
  const key = `${colid}/mentoring/${Date.now()}-${cleanName}`;
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
    url: s3Url(config.bucket, config.region, key),
    filename: cleanName,
    key,
    mimetype: file.mimetype
  };
};

exports.getMentoringOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const baseQuery = studentBaseQuery(colid);
    const pairs = await Promise.all(studentFilterFields.map(async (field) => [field, await User.distinct(field, baseQuery)]));
    const options = pairs.reduce((acc, [field, values]) => {
      acc[field] = uniqueSorted(values);
      return acc;
    }, {});
    res.status(200).json({ success: true, data: { fields: studentFilterFields, options } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading mentoring options", error: error.message });
  }
};

exports.searchMentoringStudents = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const query = studentBaseQuery(colid);
    const filters = req.body.filters || {};
    studentFilterFields.forEach((field) => {
      if (hasValue(filters[field])) query[field] = filters[field];
    });
    if (hasValue(filters.name)) query.name = { $regex: text(filters.name), $options: "i" };
    if (hasValue(filters.email)) query.email = { $regex: text(filters.email), $options: "i" };
    if (hasValue(filters.phone)) query.phone = { $regex: text(filters.phone), $options: "i" };
    if (hasValue(filters.regno)) query.regno = { $regex: text(filters.regno), $options: "i" };

    const students = await User.find(query)
      .select("name email phone regno academicyear regulation program programcode semester section Major Minor category gender")
      .sort({ name: 1, regno: 1 })
      .limit(500)
      .lean();

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error searching students", error: error.message });
  }
};

exports.createMentoringWorkspace = async (req, res) => {
  try {
    const body = req.body || {};
    const colid = Number(body.colid);
    if (!colid || !hasValue(body.groupname)) {
      return res.status(400).json({ success: false, message: "colid and groupname are required" });
    }

    const students = Array.isArray(body.students) ? body.students.map((student) => ({
      student: text(student.student || student.name),
      regno: text(student.regno),
      email: text(student.email),
      phone: text(student.phone),
      academicyear: text(student.academicyear),
      regulation: text(student.regulation),
      program: text(student.program),
      programcode: text(student.programcode),
      semester: text(student.semester),
      section: text(student.section),
      major: text(student.major || student.Major),
      minor: text(student.minor || student.Minor)
    })) : [];

    const workspace = await MentoringWorkspace.create({
      colid,
      groupname: text(body.groupname),
      description: text(body.description),
      facultyname: text(body.facultyname),
      facultyemail: text(body.facultyemail),
      academicyear: text(body.academicyear),
      regulation: text(body.regulation),
      program: text(body.program),
      programcode: text(body.programcode),
      semester: text(body.semester),
      section: text(body.section),
      major: text(body.major),
      minor: text(body.minor),
      students,
      status: text(body.status) || "Active",
      createdby: text(body.createdby)
    });

    res.status(201).json({ success: true, data: workspace });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating mentoring workspace", error: error.message });
  }
};

exports.getFacultyWorkspaces = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const query = { colid };
    if (hasValue(req.query.facultyemail)) query.facultyemail = text(req.query.facultyemail);
    const data = await MentoringWorkspace.find(query).sort({ updatedAt: -1 }).lean();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading mentoring workspaces", error: error.message });
  }
};

exports.getStudentWorkspaces = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const regno = text(req.query.regno);
    if (!colid || !regno) return res.status(400).json({ success: false, message: "colid and regno are required" });
    const data = await MentoringWorkspace.find({ colid, "students.regno": regno, status: "Active" }).sort({ updatedAt: -1 }).lean();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading student mentoring workspaces", error: error.message });
  }
};

exports.getWorkspaceMessages = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const workspaceid = text(req.query.workspaceid);
    if (!colid || !workspaceid) return res.status(400).json({ success: false, message: "colid and workspaceid are required" });
    const messages = await MentoringMessage.find({ colid, workspaceid }).sort({ createdAt: 1 }).lean();
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error loading messages", error: error.message });
  }
};

exports.createWorkspaceMessage = async (req, res) => {
  try {
    const body = req.body || {};
    const colid = Number(body.colid);
    if (!colid || !hasValue(body.workspaceid)) {
      return res.status(400).json({ success: false, message: "colid and workspaceid are required" });
    }
    const message = await MentoringMessage.create({
      colid,
      workspaceid: body.workspaceid,
      senderrole: text(body.senderrole) === "Student" ? "Student" : "Faculty",
      sendername: text(body.sendername),
      senderemail: text(body.senderemail),
      regno: text(body.regno),
      itemtype: ["Document", "Link"].includes(text(body.itemtype)) ? text(body.itemtype) : "Message",
      message: text(body.message),
      title: text(body.title),
      url: text(body.url)
    });
    await MentoringWorkspace.findByIdAndUpdate(body.workspaceid, { updatedAt: new Date() });
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error posting message", error: error.message });
  }
};

exports.uploadMentoringFile = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await uploadFileToAws(colid, req.file);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error uploading mentoring file", error: error.message });
  }
};
