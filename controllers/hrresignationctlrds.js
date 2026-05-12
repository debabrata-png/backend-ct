const path = require("path");
const multer = require("multer");
const AWS = require("aws-sdk");
const HrResignation = require("../Models/hrresignationds");
const User = require("../Models/user");
const Awsconfig = require("../Models/awsconfig");

const upload = multer({ storage: multer.memoryStorage() });
exports.uploadMiddleware = upload.single("file");

const STATUSES = ["Resigned", "Notice Period", "Absconded", "Completed"];
const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const regex = (value) => ({ $regex: text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" });

const encodeS3Key = (key) => String(key || "").split("/").map(encodeURIComponent).join("/");
const s3Url = (bucket, region, key) => {
  const encodedKey = encodeS3Key(key);
  if (region === "us-east-1") return `https://${bucket}.s3.amazonaws.com/${encodedKey}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
};

const employeeSnapshot = (employee = {}) => ({
  employeeid: String(employee._id || employee.employeeid || ""),
  name: text(employee.name),
  email: text(employee.email),
  phone: text(employee.phone),
  department: text(employee.department),
  admissionyear: text(employee.admissionyear),
  role: text(employee.role),
  regno: text(employee.regno)
});

const resignationPayload = (body = {}, employee = {}) => ({
  ...employeeSnapshot(employee),
  resignationdate: body.resignationdate || null,
  noticeperiod: number(body.noticeperiod),
  lastworkingdate: body.lastworkingdate || null,
  status: STATUSES.includes(text(body.status)) ? text(body.status) : "Notice Period",
  remarks: text(body.remarks),
  user: text(body.user),
  colid: Number(body.colid)
});

const userQuery = (source = {}) => {
  const filter = { colid: Number(source.colid) };
  ["department", "admissionyear", "role", "program", "programcode"].forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  ["name", "email", "phone", "regno"].forEach((field) => {
    if (text(source[field])) filter[field] = regex(source[field]);
  });
  return filter;
};

const resignationQuery = (source = {}) => {
  const filter = { colid: Number(source.colid) };
  ["status", "department", "admissionyear", "role"].forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  ["name", "email", "phone", "regno"].forEach((field) => {
    if (text(source[field])) filter[field] = regex(source[field]);
  });
  return filter;
};

const getDefaultAwsConfig = async (colid) => Awsconfig.findOne({ colid: Number(colid), type: /^aws$/i, default: /^yes$/i }).sort({ _id: -1 }).lean();

const findEmployee = async (employeeid, colid) => {
  if (!employeeid) return null;
  return User.findOne({ _id: employeeid, colid: Number(colid) }).lean();
};

exports.getOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const [departments, admissionyears, roles] = await Promise.all([
      User.distinct("department", { colid }),
      User.distinct("admissionyear", { colid }),
      User.distinct("role", { colid })
    ]);
    const clean = (items) => (items || []).filter(Boolean).sort((a, b) => String(a).localeCompare(String(b)));
    res.json({
      success: true,
      departments: clean(departments),
      admissionyears: clean(admissionyears),
      roles: clean(roles),
      statuses: STATUSES
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await User.find(userQuery(req.query))
      .select("name email phone department admissionyear role regno program programcode colid")
      .sort({ name: 1 })
      .limit(1000)
      .lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getResignations = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await HrResignation.find(resignationQuery(req.query)).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createResignation = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const employee = await findEmployee(req.body.employeeid, colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!employee) return res.status(400).json({ success: false, message: "Employee is required" });
    if (!req.body.resignationdate) return res.status(400).json({ success: false, message: "Resignation date is required" });
    const data = await HrResignation.create(resignationPayload(req.body, employee));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateResignation = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    let employee = null;
    if (req.body.employeeid) employee = await findEmployee(req.body.employeeid, colid);
    if (!employee) {
      const current = await HrResignation.findOne({ _id: req.body.id, colid }).lean();
      employee = current ? { ...current, _id: current.employeeid } : null;
    }
    if (!employee) return res.status(404).json({ success: false, message: "Resignation record not found" });
    const data = await HrResignation.findOneAndUpdate(
      { _id: req.body.id, colid },
      resignationPayload(req.body, employee),
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Resignation record not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteResignation = async (req, res) => {
  try {
    const data = await HrResignation.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Resignation record not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!req.body.id) return res.status(400).json({ success: false, message: "Resignation record is required" });
    if (!req.file) return res.status(400).json({ success: false, message: "File is required" });

    const config = await getDefaultAwsConfig(colid);
    if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
      return res.status(400).json({ success: false, message: "Default AWS configuration is incomplete" });
    }

    const cleanName = path.basename(req.file.originalname).replace(/[^\w.\-() ]/g, "_");
    const folder = text(req.body.documenttype) || "document";
    const key = `${colid}/hr-resignation/${req.body.id}/${folder}/${Date.now()}-${cleanName}`;
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

    const document = {
      documenttype: text(req.body.documenttype),
      description: text(req.body.description),
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bucket: config.bucket,
      region: config.region,
      key,
      url: s3Url(config.bucket, config.region, key),
      uploadedby: text(req.body.user)
    };
    const data = await HrResignation.findOneAndUpdate(
      { _id: req.body.id, colid },
      { $push: { documents: document } },
      { new: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Resignation record not found" });
    res.json({ success: true, data, document });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
