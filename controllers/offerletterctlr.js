const User = require("../Models/user");
const Fees = require("../Models/fees");

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
  return { colid, role: { $regex: /^student$/i } };
}

function buildFilterQuery(filters = []) {
  const query = {};
  filters.forEach((filter) => {
    const field = cleanText(filter.field);
    const value = cleanText(filter.value);
    if (!allowedFields.has(field) || !value) return;
    query[field] = ["name", "email", "phone", "regno"].includes(field)
      ? { $regex: escapeRegExp(value), $options: "i" }
      : value;
  });
  return query;
}

function numberValue(value) {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

exports.getOfferLetterOptions = async (req, res) => {
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
            values: values.map((item) => cleanText(item)).filter(Boolean).sort((a, b) => a.localeCompare(b))
          }
        ];
      })
    );

    res.json({ success: true, fields: filterFields, options: Object.fromEntries(entries) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchOfferLetterStudents = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const rows = await User.find({ ...baseQuery(colid), ...buildFilterQuery(filters) })
      .select("-password -expotoken")
      .sort({ admissionyear: -1, programcode: 1, name: 1 })
      .limit(1000)
      .lean();

    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOfferLetter = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    const regno = cleanText(req.query.regno);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!regno) return res.status(400).json({ success: false, message: "regno is required" });

    const student = await User.findOne({ ...baseQuery(colid), regno }).select("-password -expotoken").lean();
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const feeQuery = {
      colid,
      academicyear: student.admissionyear,
      programcode: student.programcode,
      regulation: student.regulation || "",
      major: student.Major || "",
      minor: student.Minor || ""
    };

    let fees = await Fees.find({ ...feeQuery, status: "Active" }).sort({ feegroup: 1, feeeitem: 1 }).lean();
    if (!fees.length) {
      fees = await Fees.find(feeQuery).sort({ feegroup: 1, feeeitem: 1 }).lean();
    }

    const normalizedFees = fees.map((item) => ({
      ...item,
      feeitem: item.feeeitem || item.feeitem || ""
    }));

    const totals = normalizedFees.reduce((sum, item) => ({
      amount: sum.amount + numberValue(item.amount)
    }), { amount: 0 });

    res.json({ success: true, student, fees: normalizedFees, totals, feeQuery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
