const User = require("../Models/user");

const filterFields = [
  { field: "academicyear", label: "Academic Year" },
  { field: "regulation", label: "Regulation" },
  { field: "program", label: "Program" },
  { field: "programcode", label: "Program Code" },
  { field: "Major", label: "Major" },
  { field: "Minor", label: "Minor" },
  { field: "semester", label: "Semester" },
  { field: "IDC", label: "IDC" },
  { field: "section", label: "Section" },
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "regno", label: "Reg No" },
  { field: "phone", label: "Phone" }
];

const allowedFields = new Set(filterFields.map((item) => item.field));
const displayFields = [
  "name",
  "regno",
  "email",
  "phone",
  "academicyear",
  "regulation",
  "program",
  "programcode",
  "Major",
  "Minor",
  "semester",
  "IDC",
  "section",
  "category",
  "gender",
  "rollno"
];

const clean = (value) => String(value ?? "").trim();
const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const escapeRegex = (value) => clean(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildFilterQuery = (filters = []) => {
  const query = {};
  filters.forEach((filter) => {
    const field = clean(filter.field);
    if (!allowedFields.has(field)) return;

    if (Array.isArray(filter.value)) {
      const values = filter.value.map(clean).filter(Boolean);
      if (values.length) query[field] = { $in: values };
      return;
    }

    const value = clean(filter.value);
    if (!value) return;
    if (["name", "email", "regno", "phone"].includes(field) || clean(filter.operator) === "contains") {
      query[field] = { $regex: escapeRegex(value), $options: "i" };
    } else {
      query[field] = value;
    }
  });
  return query;
};

exports.getStudentPromotionOptions = async (req, res) => {
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
          values: values.map(clean).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        }
      ];
    }));

    res.json({ success: true, fields: filterFields, options: Object.fromEntries(entries) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchStudentPromotionStudents = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const query = {
      colid,
      role: { $regex: /^Student$/i },
      ...buildFilterQuery(filters)
    };

    const students = await User.find(query)
      .select(displayFields.join(" "))
      .sort({ academicyear: -1, program: 1, semester: 1, section: 1, rollno: 1, name: 1 })
      .lean();

    res.json({ success: true, data: students, total: students.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.promoteStudents = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    const ids = Array.isArray(req.body.ids) ? req.body.ids.map(clean).filter(Boolean) : [];
    const targetSemester = clean(req.body.targetSemester);
    const targetSection = clean(req.body.targetSection);

    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!ids.length) return res.status(400).json({ success: false, message: "Please select at least one student" });
    if (!targetSemester) return res.status(400).json({ success: false, message: "Target semester is required" });

    const update = { semester: targetSemester };
    if (targetSection) update.section = targetSection;

    const result = await User.updateMany(
      { _id: { $in: ids }, colid, role: { $regex: /^Student$/i } },
      { $set: update }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount || 0} student(s) updated`,
      matchedCount: result.matchedCount || 0,
      modifiedCount: result.modifiedCount || 0
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
