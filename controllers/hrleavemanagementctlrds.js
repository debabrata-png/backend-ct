const XLSX = require("xlsx");
const User = require("../Models/user");
const NepLmsTimetable = require("../Models/neplmstimetableds");
const LeaveHierarchy = require("../Models/hrleavehierarchyds");
const LeaveType = require("../Models/hrleavetypeds");
const LeaveCycle = require("../Models/hrleavecycleds");
const LeaveBalance = require("../Models/hrleavebalanceds");
const LeaveApplication = require("../Models/hrleaveapplicationds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};
const dateDays = (from, to) => {
  const start = new Date(from);
  const end = new Date(to);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return 0;
  return Math.floor((end - start) / 86400000) + 1;
};
const readSheet = (buffer) => XLSX.utils.sheet_to_json(XLSX.read(buffer, { type: "buffer" }).Sheets[XLSX.read(buffer, { type: "buffer" }).SheetNames[0]], { defval: "" });
const splitLevels = (row) => {
  if (Array.isArray(row.levels)) return row.levels;
  const levels = [];
  for (let index = 1; index <= 10; index += 1) {
    const approveremail = text(row[`approveremail${index}`] || row[`level${index}email`]);
    if (approveremail) {
      levels.push({
        level: index,
        approvername: text(row[`approvername${index}`] || row[`level${index}name`]),
        approveremail,
        approverrole: text(row[`approverrole${index}`] || row[`level${index}role`])
      });
    }
  }
  return levels;
};

const classQuery = (colid, email, fromdate, todate) => ({
  colid,
  facultyemail: email,
  classdate: { $gte: fromdate, $lte: todate }
});

const getAssignedClasses = async (colid, employeeemail, fromdate, todate) => {
  if (!fromdate || !todate || !employeeemail) return [];
  return NepLmsTimetable.find(classQuery(colid, employeeemail, fromdate, todate))
    .sort({ classdate: 1, classtime: 1 })
    .lean();
};

const calcCarryForward = (type, unused) => {
  const criteria = text(type.carryforwardcriteria).toLowerCase();
  if (criteria === "full") return unused;
  if (criteria === "max days") return Math.min(unused, number(type.carryforwardmaxdays));
  if (criteria === "percentage") return Number(((unused * number(type.carryforwardpercentage)) / 100).toFixed(2));
  return 0;
};

const queryFrom = (source, fields) => {
  const filter = { colid: Number(source.colid) };
  fields.forEach((field) => {
    if (text(source[field])) filter[field] = text(source[field]);
  });
  return filter;
};

const crud = (Model, fields, required = []) => ({
  create: async (req, res) => {
    try {
      const payload = { colid: Number(req.body.colid), user: text(req.body.user) };
      fields.forEach((field) => { if (Object.prototype.hasOwnProperty.call(req.body, field)) payload[field] = req.body[field]; });
      if (fields.includes("levels")) payload.levels = splitLevels(req.body);
      required.forEach((field) => {
        if (!text(payload[field])) throw new Error(`${field} is required`);
      });
      const data = await Model.create(payload);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  get: async (req, res) => {
    try {
      const filter = queryFrom(req.query, fields.filter((field) => field !== "levels"));
      if (!filter.colid) return res.status(400).json({ success: false, message: "colid is required" });
      const data = await Model.find(filter).sort({ createdAt: -1 }).lean();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const payload = { user: text(req.body.user) };
      fields.forEach((field) => { if (Object.prototype.hasOwnProperty.call(req.body, field)) payload[field] = req.body[field]; });
      if (fields.includes("levels")) payload.levels = splitLevels(req.body);
      const data = await Model.findOneAndUpdate({ _id: req.body.id, colid: Number(req.body.colid) }, payload, { new: true, runValidators: true });
      if (!data) return res.status(404).json({ success: false, message: "Record not found" });
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await Model.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
      res.json({ success: true, message: "Deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  bulk: async (req, res) => {
    try {
      const colid = Number(req.body.colid);
      if (!req.file) return res.status(400).json({ success: false, message: "Excel file is required" });
      const rows = readSheet(req.file.buffer).map((row) => {
        const payload = { colid, user: text(req.body.user) };
        fields.forEach((field) => { if (field !== "levels") payload[field] = row[field] ?? ""; });
        if (fields.includes("levels")) payload.levels = splitLevels(row);
        return payload;
      });
      const data = await Model.insertMany(rows, { ordered: false });
      res.json({ success: true, inserted: data.length, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
});

const hierarchyCrud = crud(LeaveHierarchy, ["employeename", "employeeemail", "department", "levels", "status"], ["employeeemail"]);
const typeCrud = crud(LeaveType, ["leavetype", "code", "description", "annualquota", "documentrequired", "carryforwardcriteria", "carryforwardmaxdays", "carryforwardpercentage", "status"], ["leavetype"]);
const cycleCrud = crud(LeaveCycle, ["cyclename", "resetmonth", "resetday", "status"], ["cyclename"]);
const balanceCrud = crud(LeaveBalance, ["cyclename", "employeename", "employeeemail", "department", "leavetype", "openingbalance", "carryforward", "earned", "used", "balance", "status"], ["employeeemail", "leavetype"]);

exports.createHierarchy = hierarchyCrud.create;
exports.getHierarchies = hierarchyCrud.get;
exports.updateHierarchy = hierarchyCrud.update;
exports.deleteHierarchy = hierarchyCrud.delete;
exports.bulkHierarchy = hierarchyCrud.bulk;
exports.createType = typeCrud.create;
exports.getTypes = typeCrud.get;
exports.updateType = typeCrud.update;
exports.deleteType = typeCrud.delete;
exports.bulkType = typeCrud.bulk;
exports.createCycle = cycleCrud.create;
exports.getCycles = cycleCrud.get;
exports.updateCycle = cycleCrud.update;
exports.deleteCycle = cycleCrud.delete;
exports.bulkCycle = cycleCrud.bulk;
exports.createBalance = balanceCrud.create;
exports.getBalances = balanceCrud.get;
exports.updateBalance = balanceCrud.update;
exports.deleteBalance = balanceCrud.delete;
exports.bulkBalance = balanceCrud.bulk;

exports.options = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const users = await User.find({ colid }).select("name email phone department role user").sort({ name: 1 }).lean();
    const types = await LeaveType.find({ colid, status: "Active" }).sort({ leavetype: 1 }).lean();
    const cycles = await LeaveCycle.find({ colid, status: "Active" }).sort({ cyclename: -1 }).lean();
    res.json({ success: true, users, types, cycles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkClasses = async (req, res) => {
  try {
    const data = await getAssignedClasses(Number(req.query.colid), text(req.query.employeeemail), text(req.query.fromdate), text(req.query.todate));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.applyLeave = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const employeeemail = text(req.body.employeeemail || req.body.user);
    const days = dateDays(req.body.fromdate, req.body.todate);
    if (!days) return res.status(400).json({ success: false, message: "Valid from and to date are required" });
    const balance = await LeaveBalance.findOne({ colid, employeeemail, leavetype: text(req.body.leavetype), cyclename: text(req.body.cyclename) });
    if (!balance || number(balance.balance) < days) return res.status(400).json({ success: false, message: "Insufficient leave balance" });
    const hierarchy = await LeaveHierarchy.findOne({ colid, employeeemail, status: "Active" }).lean();
    if (!hierarchy?.levels?.length) return res.status(400).json({ success: false, message: "Approval hierarchy not configured" });
    const classes = await getAssignedClasses(colid, employeeemail, text(req.body.fromdate), text(req.body.todate));
    const approvals = hierarchy.levels.sort((a, b) => number(a.level) - number(b.level)).map((level) => ({ ...level, status: "Pending" }));
    const data = await LeaveApplication.create({
      cyclename: text(req.body.cyclename),
      employeename: text(req.body.employeename || hierarchy.employeename),
      employeeemail,
      department: text(req.body.department || hierarchy.department),
      leavetype: text(req.body.leavetype),
      fromdate: text(req.body.fromdate),
      todate: text(req.body.todate),
      days,
      reason: text(req.body.reason),
      employeecomment: text(req.body.employeecomment),
      documentlink: text(req.body.documentlink),
      classes,
      approvals,
      currentlevel: approvals[0]?.level || 1,
      status: "Applied",
      colid,
      user: text(req.body.user)
    });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const filter = queryFrom(req.query, ["cyclename", "employeeemail", "leavetype", "status", "department"]);
    const approveremail = text(req.query.approveremail);
    if (approveremail) filter["approvals.approveremail"] = approveremail;
    const data = await LeaveApplication.find(filter).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveLeave = async (req, res) => {
  try {
    const app = await LeaveApplication.findOne({ _id: req.body.id, colid: Number(req.body.colid) });
    if (!app) return res.status(404).json({ success: false, message: "Leave application not found" });
    const approveremail = text(req.body.approveremail || req.body.user);
    const approval = app.approvals.find((item) => text(item.approveremail).toLowerCase() === approveremail.toLowerCase() && item.status === "Pending");
    if (!approval) return res.status(403).json({ success: false, message: "No pending approval found for this user" });
    approval.status = text(req.body.action) === "Reject" ? "Rejected" : "Approved";
    approval.comment = text(req.body.comment);
    approval.actiondate = new Date();
    if (approval.status === "Rejected") {
      app.status = "Rejected";
      app.finalcomment = text(req.body.comment);
    } else {
      const next = app.approvals.find((item) => item.status === "Pending");
      if (next) {
        app.currentlevel = next.level;
        app.status = "In Approval";
      } else {
        const balance = await LeaveBalance.findOne({ colid: app.colid, employeeemail: app.employeeemail, leavetype: app.leavetype, cyclename: app.cyclename });
        if (!balance || number(balance.balance) < number(app.days)) return res.status(400).json({ success: false, message: "Insufficient leave balance at final approval" });
        balance.used = number(balance.used) + number(app.days);
        balance.balance = number(balance.balance) - number(app.days);
        await balance.save();
        app.status = "Approved";
        app.finalcomment = text(req.body.comment);
      }
    }
    const data = await app.save();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.resetLeaves = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const cyclename = text(req.body.cyclename);
    const balances = await LeaveBalance.find({ colid, ...(cyclename ? { cyclename } : {}) });
    const types = await LeaveType.find({ colid }).lean();
    const typeMap = new Map(types.map((item) => [item.leavetype, item]));
    for (const balance of balances) {
      const type = typeMap.get(balance.leavetype) || {};
      const unused = Math.max(0, number(balance.balance));
      const carry = calcCarryForward(type, unused);
      balance.carryforward = carry;
      balance.openingbalance = number(type.annualquota) + carry;
      balance.earned = number(type.annualquota);
      balance.used = 0;
      balance.balance = number(type.annualquota) + carry;
      await balance.save();
    }
    res.json({ success: true, updated: balances.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const employeeemail = text(req.query.employeeemail || req.query.user);
    const balances = await LeaveBalance.find({ colid, employeeemail }).sort({ leavetype: 1 }).lean();
    const applications = await LeaveApplication.find({ colid, employeeemail }).sort({ fromdate: 1 }).lean();
    const monthwise = {};
    applications.filter((item) => item.status === "Approved").forEach((item) => {
      const month = text(item.fromdate).slice(0, 7);
      monthwise[month] = (monthwise[month] || 0) + number(item.days);
    });
    res.json({
      success: true,
      balances,
      applications,
      monthwise: Object.entries(monthwise).map(([month, days]) => ({ month, days })),
      pending: applications.filter((item) => ["Applied", "In Approval"].includes(item.status)).length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
