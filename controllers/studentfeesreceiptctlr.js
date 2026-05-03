const Ledgerstud = require("../Models/ledgerstud");
const User = require("../Models/user");

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
