const path = require("path");
const multer = require("multer");
const AWS = require("aws-sdk");
const ResearchApprovalMatrix = require("../Models/researchapprovalmatrixds");
const ResearchComponent = require("../Models/researchcomponentds");
const ResearchGrantApplication = require("../Models/researchgrantapplicationds");
const User = require("../Models/user");
const Awsconfig = require("../Models/awsconfig");

const upload = multer({ storage: multer.memoryStorage() });
exports.uploadMiddleware = upload.single("file");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const text = (value) => String(value || "").trim();
const clean = (value) => text(value).replace(/[^a-zA-Z0-9_]/g, "_").replace(/_+/g, "_").toLowerCase();
const encodeS3Key = (key) => String(key || "").split("/").map(encodeURIComponent).join("/");
const s3Url = (bucket, region, key) => region === "us-east-1"
  ? `https://${bucket}.s3.amazonaws.com/${encodeS3Key(key)}`
  : `https://${bucket}.s3.${region}.amazonaws.com/${encodeS3Key(key)}`;

const parseComponents = (value) => {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const roleQuery = (role) => ({ role: { $regex: `^${text(role).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } });

exports.getApprovalMatrix = async (req, res) => {
  try {
    const data = await ResearchApprovalMatrix.find({ colid: toNumber(req.query.colid) }).sort({ level: 1, role: 1 }).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveApprovalMatrix = async (req, res) => {
  try {
    const payload = {
      colid: toNumber(req.body.colid),
      level: toNumber(req.body.level),
      role: text(req.body.role),
      status: req.body.status || "Active",
      name: req.body.name,
      user: req.body.user
    };
    if (!payload.colid || !payload.level || !payload.role) return res.status(400).json({ success: false, message: "Level and role are required" });
    const data = req.body.id
      ? await ResearchApprovalMatrix.findOneAndUpdate({ _id: req.body.id, colid: payload.colid }, payload, { new: true })
      : await ResearchApprovalMatrix.create(payload);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteApprovalMatrix = async (req, res) => {
  try {
    await ResearchApprovalMatrix.findOneAndDelete({ _id: req.body.id, colid: toNumber(req.body.colid) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getComponents = async (req, res) => {
  try {
    const query = { colid: toNumber(req.query.colid) };
    if (req.query.status) query.status = req.query.status;
    const data = await ResearchComponent.find(query).sort({ component: 1 }).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.saveComponent = async (req, res) => {
  try {
    const payload = {
      colid: toNumber(req.body.colid),
      component: text(req.body.component),
      description: req.body.description || "",
      status: req.body.status || "Active",
      name: req.body.name,
      user: req.body.user
    };
    if (!payload.colid || !payload.component) return res.status(400).json({ success: false, message: "Component is required" });
    const data = req.body.id
      ? await ResearchComponent.findOneAndUpdate({ _id: req.body.id, colid: payload.colid }, payload, { new: true })
      : await ResearchComponent.create(payload);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteComponent = async (req, res) => {
  try {
    await ResearchComponent.findOneAndDelete({ _id: req.body.id, colid: toNumber(req.body.colid) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.searchFaculty = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const q = text(req.query.q);
    const query = { colid };
    if (q) query.$or = [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { department: { $regex: q, $options: "i" } }
    ];
    const data = await User.find(query).select("name email department role").sort({ name: 1 }).limit(30).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "Select a file" });
    const colid = toNumber(req.body.colid);
    const config = await Awsconfig.findOne({ colid, type: /^aws$/i, default: /^yes$/i }).lean();
    if (!config?.username || !config?.password || !config?.bucket || !config?.region) {
      return res.status(400).json({ success: false, message: "Default AWS configuration is missing" });
    }
    const cleanName = path.basename(req.file.originalname).replace(/[^\w.\-() ]/g, "_");
    const key = `${colid}/research-seed-fund/${clean(req.body.documenttype) || "document"}/${Date.now()}-${cleanName}`;
    const s3 = new AWS.S3({ accessKeyId: config.username, secretAccessKey: config.password, region: config.region });
    await s3.putObject({ Bucket: config.bucket, Key: key, Body: req.file.buffer, ContentType: req.file.mimetype }).promise();
    res.json({
      success: true,
      document: {
        documenttype: req.body.documenttype || "Document",
        description: req.body.description || "",
        filename: cleanName,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        bucket: config.bucket,
        region: config.region,
        key,
        url: s3Url(config.bucket, config.region, key),
        uploadedAt: new Date()
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createGrant = async (req, res) => {
  try {
    const payload = {
      colid: toNumber(req.body.colid),
      academicyear: req.body.academicyear,
      department: req.body.department,
      facultyname: req.body.facultyname,
      userid: req.body.userid,
      projecttitle: req.body.projecttitle,
      description: req.body.description,
      fromdate: req.body.fromdate,
      todate: req.body.todate,
      estimatedtotalamount: toNumber(req.body.estimatedtotalamount) || 0,
      copiinternal: req.body.copiinternal,
      copiinternalemail: req.body.copiinternalemail,
      copiexternal: req.body.copiexternal,
      requestedcomponents: parseComponents(req.body.requestedcomponents).map((item) => ({ component: item.component, requestedamount: toNumber(item.requestedamount) || 0 })),
      documents: Array.isArray(req.body.documents) ? req.body.documents : parseComponents(req.body.documents),
      status: "Applied",
      currentlevel: 1,
      name: req.body.name,
      user: req.body.user
    };
    if (!payload.colid || !payload.projecttitle) return res.status(400).json({ success: false, message: "Project title is required" });
    const data = await ResearchGrantApplication.create(payload);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.bulkCreateGrants = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!items.length) return res.status(400).json({ success: false, message: "No rows found for upload" });

    const docs = items
      .filter((item) => text(item.projecttitle || item["Project Title"]))
      .map((item) => {
        const requestedcomponents = parseComponents(item.requestedcomponents).map((component) => ({
          component: component.component,
          requestedamount: toNumber(component.requestedamount) || 0
        }));
        const estimated = toNumber(item.estimatedtotalamount || item["Estimated Total Amount"]);
        return {
          colid,
          academicyear: item.academicyear || item["Academic Year"],
          department: item.department || req.body.department,
          facultyname: item.facultyname || item["Faculty Name"] || req.body.facultyname,
          userid: item.userid || item["User ID"] || req.body.userid,
          projecttitle: item.projecttitle || item["Project Title"],
          description: item.description || item.Description || "",
          fromdate: item.fromdate || item["From Date"],
          todate: item.todate || item["To Date"],
          estimatedtotalamount: estimated !== undefined ? estimated : requestedcomponents.reduce((sum, component) => sum + Number(component.requestedamount || 0), 0),
          copiinternal: item.copiinternal || item["Co PI Internal"] || "",
          copiinternalemail: item.copiinternalemail || item["Co PI Internal Email"] || "",
          copiexternal: item.copiexternal || item["Co PI External"] || "",
          requestedcomponents,
          documents: [],
          status: "Applied",
          currentlevel: 1,
          name: req.body.name,
          user: req.body.user
        };
      });

    if (!docs.length) return res.status(400).json({ success: false, message: "No valid rows found. Project title is required." });
    const data = await ResearchGrantApplication.insertMany(docs, { ordered: false });
    res.json({ success: true, inserted: data.length, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateGrant = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const payload = { ...req.body };
    delete payload.id;
    if (payload.requestedcomponents) payload.requestedcomponents = parseComponents(payload.requestedcomponents);
    if (payload.documents) payload.documents = parseComponents(payload.documents);
    const data = await ResearchGrantApplication.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getGrants = async (req, res) => {
  try {
    const query = { colid: toNumber(req.query.colid) };
    ["academicyear", "department", "facultyname", "userid", "status", "projecttitle"].forEach((field) => {
      if (req.query[field]) query[field] = { $regex: text(req.query[field]), $options: "i" };
    });
    if (req.query.component) query["requestedcomponents.component"] = req.query.component;
    const data = await ResearchGrantApplication.find(query).sort({ createdAt: -1 }).limit(1000).lean();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteGrant = async (req, res) => {
  try {
    const grant = await ResearchGrantApplication.findOne({ _id: req.body.id, colid: toNumber(req.body.colid) });
    if (!grant) return res.status(404).json({ success: false, message: "Grant application not found" });
    if (grant.status !== "Applied") {
      return res.status(400).json({ success: false, message: "Delete is allowed only when status is Applied" });
    }
    await ResearchGrantApplication.findOneAndDelete({ _id: req.body.id, colid: toNumber(req.body.colid) });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getApprovalQueue = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const role = text(req.query.role);
    const levels = await ResearchApprovalMatrix.find({ colid, status: "Active", ...roleQuery(role) }).select("level role").lean();
    const levelNumbers = levels.map((item) => item.level);
    const query = { colid, status: { $in: ["Applied", "In Approval"] } };
    if (levelNumbers.length) query.currentlevel = { $in: levelNumbers };
    const data = await ResearchGrantApplication.find(query).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data, levels });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.decideGrant = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const grant = await ResearchGrantApplication.findOne({ _id: req.body.id, colid });
    if (!grant) return res.status(404).json({ success: false, message: "Grant application not found" });
    const decision = req.body.decision === "Approved" ? "Approved" : "Denied";
    grant.approvalhistory.push({
      level: grant.currentlevel,
      role: req.body.role,
      decision,
      comments: req.body.comments || "",
      approvedby: req.body.approvedby,
      approvedbyname: req.body.approvedbyname,
      approvedAt: new Date()
    });
    if (decision === "Denied") {
      grant.status = "Denied";
    } else {
      const next = await ResearchApprovalMatrix.findOne({ colid, status: "Active", level: { $gt: grant.currentlevel } }).sort({ level: 1 }).lean();
      if (next) {
        grant.currentlevel = next.level;
        grant.status = "In Approval";
      } else {
        grant.status = "Approved";
      }
    }
    await grant.save();
    res.json({ success: true, data: grant });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const query = { colid: toNumber(req.query.colid) };
    ["academicyear", "department", "facultyname", "userid", "status", "projecttitle"].forEach((field) => {
      if (req.query[field]) query[field] = { $regex: text(req.query[field]), $options: "i" };
    });
    if (req.query.component) query["requestedcomponents.component"] = req.query.component;
    const data = await ResearchGrantApplication.find(query).sort({ createdAt: -1 }).lean();
    const flatten = (rows) => {
      const map = new Map();
      rows.forEach((grant) => {
        (grant.requestedcomponents || [{ component: "Not specified", requestedamount: grant.estimatedtotalamount || 0 }]).forEach((component) => {
          const key = `${grant.academicyear || "NA"}||${grant.department || "NA"}||${component.component || "NA"}`;
          const row = map.get(key) || { id: key, academicyear: grant.academicyear || "-", department: grant.department || "-", component: component.component || "-", applications: 0, estimatedtotalamount: 0, requestedamount: 0 };
          row.applications += 1;
          row.estimatedtotalamount += Number(grant.estimatedtotalamount || 0);
          row.requestedamount += Number(component.requestedamount || 0);
          map.set(key, row);
        });
      });
      return Array.from(map.values()).sort((a, b) => b.requestedamount - a.requestedamount);
    };
    res.json({
      success: true,
      data,
      applied: flatten(data.filter((item) => item.status !== "Approved")),
      approved: flatten(data.filter((item) => item.status === "Approved"))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
