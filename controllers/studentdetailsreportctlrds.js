const User = require("../Models/user");
const Institution = require("../Models/insdetails");

const filterFields = [
  { field: "academicyear", label: "Academic Year" },
  { field: "program", label: "Program" },
  { field: "programcode", label: "Program Code" },
  { field: "semester", label: "Semester" },
  { field: "section", label: "Section" },
  { field: "regulation", label: "Regulation" },
  { field: "Major", label: "Major" },
  { field: "Minor", label: "Minor" },
  { field: "IDC", label: "IDC" },
  { field: "SEC", label: "SEC" },
  { field: "VAC", label: "VAC" },
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "regno", label: "Reg No" },
  { field: "phone", label: "Phone" },
  { field: "category", label: "Category" },
  { field: "gender", label: "Gender" },
  { field: "admissionyear", label: "Admission Year" }
];

const allowedFields = new Set(filterFields.map((item) => item.field));

const displayFields = [
  "name", "regno", "email", "phone", "academicyear", "admissionyear", "program", "programcode",
  "regulation", "semester", "section", "Major", "Minor", "IDC", "SEC", "VAC", "category",
  "gender", "state", "city", "district", "pincode", "guardianname", "guardianmobile", "password"
];

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const clean = (value) => String(value ?? "").trim();
const escapeRegex = (value) => clean(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildFilterQuery = (filters = []) => {
  const query = {};
  filters.forEach((filter) => {
    const field = clean(filter.field);
    const value = filter.value;
    const operator = clean(filter.operator || "equals");
    if (!allowedFields.has(field)) return;

    if (Array.isArray(value)) {
      const values = value.map(clean).filter(Boolean);
      if (values.length) query[field] = { $in: values };
      return;
    }

    const text = clean(value);
    if (!text) return;
    if (operator === "contains" || ["name", "email", "regno", "phone"].includes(field)) {
      query[field] = { $regex: escapeRegex(text), $options: "i" };
    } else {
      query[field] = text;
    }
  });
  return query;
};

const countBy = (rows, field) => {
  const counts = {};
  rows.forEach((row) => {
    const value = clean(row[field]) || "Not specified";
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
};

exports.getStudentDetailsOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const baseQuery = { colid, role: { $regex: /^Student$/i } };
    const entries = await Promise.all(filterFields.map(async ({ field, label }) => {
      const values = await User.distinct(field, baseQuery);
      return [
        field,
        {
          label,
          values: values.map(clean).filter(Boolean).sort((a, b) => a.localeCompare(b))
        }
      ];
    }));

    res.json({ success: true, fields: filterFields, options: Object.fromEntries(entries) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentDetailsReport = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const query = {
      colid,
      role: { $regex: /^Student$/i },
      ...buildFilterQuery(filters)
    };

    const [students, institution] = await Promise.all([
      User.find(query)
        .select(`${displayFields.join(" ")} role status colid`)
        .sort({ academicyear: -1, program: 1, semester: 1, section: 1, rollno: 1, name: 1 })
        .lean(),
      Institution.findOne({ colid }).lean()
    ]);

    res.json({
      success: true,
      data: students,
      total: students.length,
      fields: filterFields,
      selectedFilters: filters.filter((item) => item.field && item.value),
      summary: {
        program: countBy(students, "program"),
        programcode: countBy(students, "programcode"),
        semester: countBy(students, "semester"),
        section: countBy(students, "section"),
        category: countBy(students, "category"),
        gender: countBy(students, "gender"),
        major: countBy(students, "Major"),
        minor: countBy(students, "Minor")
      },
      institution: institution || null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
