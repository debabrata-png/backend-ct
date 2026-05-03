const User = require("../Models/user");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const filterFields = [
  { field: "admissionyear", label: "Academic year" },
  { field: "programcode", label: "Program" },
  { field: "department", label: "Department" },
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
  { field: "status1", label: "Status" },
  { field: "degree", label: "Degree" },
  { field: "minorsub", label: "Minor subject" },
  { field: "vocationalsub", label: "Vocational subject" },
  { field: "mdcsub", label: "MDC subject" }
];

const allowedFields = new Set(filterFields.map((item) => item.field));
const summaryFields = ["programcode", "category", "gender", "Major", "Minor", "AEC", "SEC", "VAC", "IDC"];

const buildBaseQuery = (colid) => ({
  colid,
  role: { $regex: /^student$/i }
});

const buildFilterQuery = (filters = []) => {
  const query = {};
  filters.forEach((filter) => {
    const field = String(filter.field || "").trim();
    const operator = String(filter.operator || "equals").trim();
    const value = filter.value;

    if (!allowedFields.has(field)) return;

    if (operator === "notempty") {
      query[field] = { $nin: ["", null] };
      return;
    }

    if (Array.isArray(value)) {
      const cleanValues = value.map((item) => String(item || "").trim()).filter(Boolean);
      if (cleanValues.length) query[field] = { $in: cleanValues };
      return;
    }

    const cleanValue = String(value || "").trim();
    if (!cleanValue) return;

    if (operator === "contains") {
      query[field] = { $regex: escapeRegExp(cleanValue), $options: "i" };
    } else {
      query[field] = cleanValue;
    }
  });
  return query;
};

const countByField = (rows, field) => {
  const counts = {};
  rows.forEach((row) => {
    const value = row[field] || "Not specified";
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || String(a.value).localeCompare(String(b.value)));
};

exports.getStudentFilterOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const baseQuery = buildBaseQuery(colid);
    const optionEntries = await Promise.all(
      filterFields.map(async ({ field, label }) => {
        const values = await User.distinct(field, baseQuery);
        return [
          field,
          {
            label,
            values: values
              .map((item) => String(item || "").trim())
              .filter(Boolean)
              .sort((a, b) => a.localeCompare(b))
          }
        ];
      })
    );

    res.json({
      success: true,
      fields: filterFields,
      options: Object.fromEntries(optionEntries)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchStudentsDynamic = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) {
      return res.status(400).json({ success: false, message: "colid is required" });
    }

    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const query = {
      ...buildBaseQuery(colid),
      ...buildFilterQuery(filters)
    };

    const rows = await User.find(query)
      .select("-password -expotoken")
      .sort({ admissionyear: 1, programcode: 1, name: 1 })
      .lean();

    const summary = {
      total: rows.length,
      selectedFilters: filters.filter((item) => item.field && (item.operator === "notempty" || item.value)),
      breakdown: Object.fromEntries(summaryFields.map((field) => [field, countByField(rows, field)]))
    };

    res.json({ success: true, count: rows.length, data: rows, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
