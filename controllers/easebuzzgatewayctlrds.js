const EasebuzzGateway = require("../Models/easebuzzgatewayds");

function text(value) {
  return String(value || "").trim();
}

function bool(value) {
  if (typeof value === "boolean") return value;
  return ["yes", "true", "active", "1"].includes(text(value).toLowerCase());
}

function payload(body = {}) {
  return {
    name: text(body.name),
    user: text(body.user),
    colid: Number(body.colid),
    merchantid: text(body.merchantid),
    salt: text(body.salt),
    environment: text(body.environment) === "prod" ? "prod" : "test",
    isactive: bool(body.isactive),
    returnurl: text(body.returnurl),
    notes: text(body.notes)
  };
}

function queryFrom(source = {}) {
  const query = { colid: Number(source.colid) };
  if (text(source.environment)) query.environment = text(source.environment);
  if (text(source.isactive)) query.isactive = bool(source.isactive);
  if (text(source.merchantid)) query.merchantid = { $regex: text(source.merchantid).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  return query;
}

exports.getEasebuzzGateways = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const data = await EasebuzzGateway.find(queryFrom(req.query)).sort({ createdAt: -1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createEasebuzzGateway = async (req, res) => {
  try {
    const item = payload(req.body);
    const data = await EasebuzzGateway.create(item);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEasebuzzGateway = async (req, res) => {
  try {
    const data = await EasebuzzGateway.findOneAndUpdate(
      { _id: req.body.id, colid: Number(req.body.colid) },
      payload(req.body),
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Payment gateway not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteEasebuzzGateway = async (req, res) => {
  try {
    const data = await EasebuzzGateway.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    if (!data) return res.status(404).json({ success: false, message: "Payment gateway not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
