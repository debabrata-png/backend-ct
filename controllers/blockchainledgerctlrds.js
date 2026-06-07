const crypto = require("crypto");
const BlockchainLedger = require("../Models/blockchainledgerds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const stableStringify = (value) => {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value instanceof Date) return JSON.stringify(value.toISOString());
  if (typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
};

const sha256 = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");

const buildHash = ({ colid, blockindex, modelname, collectionname, recordid, action, datahash, previoushash, timestamp, user }) => sha256(stableStringify({
  colid,
  blockindex,
  modelname,
  collectionname,
  recordid,
  action,
  datahash,
  previoushash,
  timestamp,
  user
}));

const getLastBlock = async (colid) => BlockchainLedger.findOne({ colid }).sort({ blockindex: -1 }).lean();

const buildBlock = async ({
  colid,
  modelname,
  collectionname = "",
  recordid = "",
  action = "CREATE",
  payload = {},
  metadata = {},
  user = "",
  timestamp = new Date()
}) => {
  const lastBlock = await getLastBlock(colid);
  const blockindex = lastBlock ? Number(lastBlock.blockindex || 0) + 1 : 1;
  const previoushash = lastBlock ? lastBlock.hash : "GENESIS";
  const normalizedTimestamp = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const datahash = sha256(stableStringify(payload));
  const hash = buildHash({
    colid,
    blockindex,
    modelname,
    collectionname,
    recordid,
    action,
    datahash,
    previoushash,
    timestamp: normalizedTimestamp.toISOString(),
    user
  });
  return {
    colid,
    blockindex,
    modelname,
    collectionname,
    recordid,
    action,
    payload,
    metadata,
    datahash,
    previoushash,
    hash,
    timestamp: normalizedTimestamp,
    user
  };
};

exports.appendBlock = async (input = {}) => {
  const colid = number(input.colid);
  const modelname = text(input.modelname || input.modelName);
  if (colid === undefined) throw new Error("colid is required");
  if (!modelname) throw new Error("modelname is required");

  const block = await buildBlock({
    colid,
    modelname,
    collectionname: text(input.collectionname || input.collectionName),
    recordid: text(input.recordid || input.recordId || input._id),
    action: text(input.action) || "CREATE",
    payload: input.payload || {},
    metadata: input.metadata || {},
    user: text(input.user)
  });

  try {
    return await BlockchainLedger.create(block);
  } catch (error) {
    if (error.code !== 11000) throw error;
    const retryBlock = await buildBlock(block);
    return BlockchainLedger.create(retryBlock);
  }
};

exports.createBlock = async (req, res) => {
  try {
    const data = await exports.appendBlock(req.body);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getBlocks = async (req, res) => {
  try {
    const filter = {};
    const colid = number(req.query.colid);
    if (colid !== undefined) filter.colid = colid;
    ["modelname", "recordid", "action", "user", "status"].forEach((field) => {
      if (text(req.query[field])) filter[field] = text(req.query[field]);
    });
    const data = await BlockchainLedger.find(filter).sort({ colid: 1, blockindex: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyChain = async (req, res) => {
  try {
    const colid = number(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    const blocks = await BlockchainLedger.find({ colid }).sort({ blockindex: 1 }).lean();
    const errors = [];

    blocks.forEach((block, index) => {
      const expectedPreviousHash = index === 0 ? "GENESIS" : blocks[index - 1].hash;
      const expectedDataHash = sha256(stableStringify(block.payload || {}));
      const expectedHash = buildHash({
        colid: block.colid,
        blockindex: block.blockindex,
        modelname: block.modelname,
        collectionname: block.collectionname,
        recordid: block.recordid,
        action: block.action,
        datahash: block.datahash,
        previoushash: block.previoushash,
        timestamp: new Date(block.timestamp).toISOString(),
        user: block.user
      });

      if (block.previoushash !== expectedPreviousHash) errors.push({ blockindex: block.blockindex, message: "Previous hash mismatch" });
      if (block.datahash !== expectedDataHash) errors.push({ blockindex: block.blockindex, message: "Payload hash mismatch" });
      if (block.hash !== expectedHash) errors.push({ blockindex: block.blockindex, message: "Block hash mismatch" });
    });

    res.json({
      success: true,
      valid: errors.length === 0,
      blocks: blocks.length,
      errors
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
