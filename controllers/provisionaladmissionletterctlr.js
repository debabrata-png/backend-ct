const User = require("../Models/user");
const Ledgerstud = require("../Models/ledgerstud");

const filterFields = [
  { field: "admissionyear", label: "Academic Year" },
  { field: "programcode", label: "Program" },
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "phone", label: "Phone" },
  { field: "regno", label: "Reg No" },
  { field: "regulation", label: "Regulation" },
  { field: "Major", label: "Major" },
  { field: "Minor", label: "Minor" },
  { field: "AEC", label: "AEC" },
  { field: "SEC", label: "SEC" },
  { field: "VAC", label: "VAC" },
  { field: "IDC", label: "IDC" },
  { field: "category", label: "Category" },
  { field: "gender", label: "Gender" },
  { field: "semester", label: "Semester" },
  { field: "section", label: "Section" },
  { field: "department", label: "Department" },
  { field: "status1", label: "Status" }
];

const allowedFields = new Set(filterFields.map((item) => item.field));

function toNumber(value) {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function cleanText(value) {
  return String(value || "").trim();
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function baseQuery(colid) {
  return {
    colid,
    role: { $regex: /^student$/i }
  };
}

function buildFilterQuery(filters = []) {
  const query = {};
  filters.forEach((filter) => {
    const field = cleanText(filter.field);
    const value = cleanText(filter.value);
    if (!allowedFields.has(field) || !value) return;
    query[field] = field === "name" || field === "email" || field === "phone" || field === "regno"
      ? { $regex: escapeRegExp(value), $options: "i" }
      : value;
  });
  return query;
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

exports.getProvisionalAdmissionLetterOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const entries = await Promise.all(
      filterFields.map(async ({ field, label }) => {
        const values = await User.distinct(field, baseQuery(colid));
        return [
          field,
          {
            label,
            values: values
              .map((item) => cleanText(item))
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b))
          }
        ];
      })
    );

    res.json({ success: true, fields: filterFields, options: Object.fromEntries(entries) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchProvisionalAdmissionStudents = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const rows = await User.find({
      ...baseQuery(colid),
      ...buildFilterQuery(filters)
    })
      .select("-password -expotoken")
      .sort({ admissionyear: -1, programcode: 1, name: 1 })
      .limit(1000)
      .lean();

    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProvisionalAdmissionLetter = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const regno = cleanText(req.query.regno);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });

    const student = await User.findOne({ ...baseQuery(colid), regno }).select("-password -expotoken").lean();
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const fees = await Ledgerstud.find({ colid, regno })
      .select("academicyear regulation programcode feegroup feeitem feebook cashbook amount paid concession balance status semester")
      .sort({ academicyear: -1, feegroup: 1, feeitem: 1 })
      .lean();

    const totals = fees.reduce((sum, item) => ({
      amount: sum.amount + numberValue(item.amount),
      paid: sum.paid + numberValue(item.paid),
      concession: sum.concession + numberValue(item.concession),
      balance: sum.balance + numberValue(item.balance)
    }), { amount: 0, paid: 0, concession: 0, balance: 0 });

    res.json({ success: true, student, fees, totals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
