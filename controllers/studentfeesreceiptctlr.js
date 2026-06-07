const Ledgerstud = require("../Models/ledgerstud");
const User = require("../Models/user");
const BlockchainLedger = require("../Models/blockchainledgerds");
const { appendBlock } = require("./blockchainledgerctlrds");
const crypto = require("crypto");

function toNumber(value) {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function text(value) {
  return String(value || "").trim();
}

function regex(value) {
  return new RegExp(text(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

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

const buildBlockchainHash = ({ colid, blockindex, modelname, collectionname, recordid, action, datahash, previoushash, timestamp, user }) => sha256(stableStringify({
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

const allowedFilters = [
  "academicyear",
  "programcode",
  "regulation",
  "student",
  "regno",
  "major",
  "minor",
  "feegroup",
  "feeitem",
  "feebook",
  "cashbook",
  "semester",
  "feecategory",
  "status"
];

exports.getFeesReceiptRows = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const query = { colid };
    allowedFilters.forEach((field) => {
      if (!req.query[field]) return;
      query[field] = ["student", "feeitem", "feegroup"].includes(field) ? regex(req.query[field]) : req.query[field];
    });

    const data = await Ledgerstud.find(query)
      .sort({ paiddate: -1, academicyear: -1, student: 1, feegroup: 1, feeitem: 1 })
      .limit(3000)
      .lean();

    const regnos = Array.from(new Set(data.map((row) => row.regno).filter(Boolean)));
    const users = await User.find({ colid, regno: { $in: regnos } })
      .select("name email phone regno programcode admissionyear semester section gender category address fathername mothername regulation Major Minor colid")
      .lean();
    const userMap = new Map(users.map((user) => [user.regno, user]));

    const students = Array.from(new Map(data.map((item) => {
      const user = userMap.get(item.regno) || {};
      return [
        item.regno || item.student,
        {
          regno: item.regno || "",
          student: user.name || item.student || "",
          programcode: user.programcode || item.programcode || "",
          academicyear: item.academicyear || user.admissionyear || "",
          regulation: user.regulation || item.regulation || "",
          major: user.Major || item.major || "",
          minor: user.Minor || item.minor || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || ""
        }
      ];
    })).values()).sort((a, b) => `${a.student}${a.regno}`.localeCompare(`${b.student}${b.regno}`));

    const options = {};
    allowedFilters.forEach((field) => {
      options[field] = Array.from(new Set(data.map((row) => text(row[field])).filter(Boolean))).sort((a, b) => a.localeCompare(b));
    });

    const enriched = data.map((row) => ({
      ...row,
      userdetails: userMap.get(row.regno) || null
    }));

    res.json({ success: true, count: enriched.length, data: enriched, students, options });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.storeFeesReceiptOnBlockchain = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const receipt = req.body.receipt || {};
    const regno = text(receipt.student?.regno || req.body.regno);
    const student = text(receipt.student?.name || req.body.student);
    const items = Array.isArray(receipt.items) ? receipt.items : [];

    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });
    if (!student) return res.status(400).json({ success: false, message: "student name is required" });
    if (!items.length) return res.status(400).json({ success: false, message: "receipt items are required" });

    const receiptNo = text(receipt.receiptNo) || `FR-${regno}-${Date.now()}`;
    const payload = {
      ...receipt,
      receiptNo,
      student: {
        ...(receipt.student || {}),
        name: student,
        regno
      },
      storedAt: new Date().toISOString()
    };

    const block = await appendBlock({
      colid,
      modelname: "studentfeesreceipt",
      collectionname: "ledgerstud",
      recordid: `${regno}::${receiptNo}`,
      action: "FEES_RECEIPT_STORE",
      payload,
      metadata: {
        regno,
        student,
        receiptNo,
        totalPaid: receipt.totals?.paid || 0
      },
      user: text(req.body.user)
    });

    res.json({ success: true, message: "Fees receipt stored in blockchain", data: block });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyFeesReceiptFromBlockchain = async (req, res) => {
  try {
    const regno = text(req.query.regno);
    const colid = toNumber(req.query.colid);
    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });

    const query = {
      modelname: "studentfeesreceipt",
      recordid: { $regex: `^${regno.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}::`, $options: "i" }
    };
    if (colid !== undefined) query.colid = colid;

    const blocks = await BlockchainLedger.find(query).sort({ timestamp: -1 }).lean();
    const data = [];
    for (const block of blocks) {
      const payloadRegno = text(block.payload?.student?.regno);
      if (payloadRegno.toLowerCase() !== regno.toLowerCase()) continue;

      const previousBlock = block.previoushash === "GENESIS"
        ? null
        : await BlockchainLedger.findOne({ colid: block.colid, blockindex: Number(block.blockindex) - 1 }).lean();
      const expectedPreviousHash = previousBlock ? previousBlock.hash : "GENESIS";
      const expectedDataHash = sha256(stableStringify(block.payload || {}));
      const expectedHash = buildBlockchainHash({
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
      const errors = [];
      if (block.previoushash !== expectedPreviousHash) errors.push("Previous hash mismatch");
      if (block.datahash !== expectedDataHash) errors.push("Payload hash mismatch");
      if (block.hash !== expectedHash) errors.push("Block hash mismatch");

      data.push({
        blockid: block._id,
        colid: block.colid,
        blockindex: block.blockindex,
        recordid: block.recordid,
        hash: block.hash,
        timestamp: block.timestamp,
        valid: errors.length === 0,
        errors,
        payload: block.payload
      });
    }

    res.json({
      success: true,
      verified: data.some((item) => item.valid),
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
