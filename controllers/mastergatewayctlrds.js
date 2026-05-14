const MasterGateway = require("../Models/mastergatewayds");

const text = (value) => String(value || "").trim();

const normalizeType = (value) => (text(value).toLowerCase() === "external" ? "External" : "Internal");
const normalizeStatus = (value) => (["not active", "inactive", "no"].includes(text(value).toLowerCase()) ? "Not active" : "Active");
const normalizeYesNo = (value) => (["yes", "true", "1", "default"].includes(text(value).toLowerCase()) ? "Yes" : "No");

const payload = (body = {}) => ({
  name: text(body.name),
  user: text(body.user),
  colid: Number(body.colid),
  gatewayname: text(body.gatewayname || body.gatewayName),
  description: text(body.description),
  type: normalizeType(body.type),
  externallink: text(body.externallink || body.externalLink),
  callbackurl: text(body.callbackurl || body.callbackUrl),
  status: normalizeStatus(body.status),
  default: normalizeYesNo(body.default)
});

const queryFrom = (source = {}) => {
  const query = { colid: Number(source.colid) };
  if (text(source.gatewayname)) query.gatewayname = { $regex: text(source.gatewayname).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  if (text(source.type)) query.type = normalizeType(source.type);
  if (text(source.status)) query.status = normalizeStatus(source.status);
  if (text(source.default)) query.default = normalizeYesNo(source.default);
  return query;
};

exports.getMasterGateways = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await MasterGateway.find(queryFrom(req.query)).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMasterGateway = async (req, res) => {
  try {
    const item = payload(req.body);
    if (!item.colid || !item.gatewayname) return res.status(400).json({ success: false, message: "Gateway name and colid are required" });
    const data = await MasterGateway.create(item);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMasterGateway = async (req, res) => {
  try {
    const item = payload(req.body);
    if (!req.body.id) return res.status(400).json({ success: false, message: "id is required" });
    const data = await MasterGateway.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      item,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Gateway not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMasterGateway = async (req, res) => {
  try {
    const data = await MasterGateway.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Gateway not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
