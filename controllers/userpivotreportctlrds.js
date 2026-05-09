const User = require("../Models/user");
const Institution = require("../Models/insdetails");

const filterFields = [
  { field: "academicyear", label: "Academic Year" },
  { field: "role", label: "Role" },
  { field: "program", label: "Program" },
  { field: "programcode", label: "Program Code" },
  { field: "category", label: "Category" },
  { field: "gender", label: "Gender" },
  { field: "Major", label: "Major" },
  { field: "Minor", label: "Minor" },
  { field: "AEC", label: "AEC" },
  { field: "SEC", label: "SEC" },
  { field: "quota", label: "Quota" },
  { field: "department", label: "Department" },
  { field: "state", label: "State" },
  { field: "city", label: "City" },
  { field: "district", label: "District" },
  { field: "section", label: "Section" },
  { field: "semester", label: "Semester" }
];

const allowedFields = new Set(filterFields.map((item) => item.field));

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const labelFor = (field) => filterFields.find((item) => item.field === field)?.label || field;

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
      const values = value.map((item) => String(item || "").trim()).filter(Boolean);
      if (values.length) query[field] = { $in: values };
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

const pivotByField = (rows, field) => {
  const counts = {};
  rows.forEach((row) => {
    const value = row[field] || "Not specified";
    counts[value] = (counts[value] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([value, count]) => ({
      id: `${field}-${value}`,
      field,
      fieldLabel: labelFor(field),
      value,
      count
    }))
    .sort((a, b) => b.count - a.count || String(a.value).localeCompare(String(b.value)));
};

const pivotByFields = (rows, fields = []) => {
  const activeFields = fields.filter((field) => allowedFields.has(field));
  const counts = {};

  rows.forEach((row) => {
    const keyValues = activeFields.map((field) => row[field] || "Not specified");
    const key = keyValues.join("||");
    if (!counts[key]) {
      counts[key] = {
        id: key || "all-users",
        values: Object.fromEntries(activeFields.map((field, index) => [field, keyValues[index]])),
        count: 0
      };
    }
    counts[key].count += 1;
  });

  return Object.values(counts).sort((a, b) => b.count - a.count);
};

exports.getUserPivotOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const baseQuery = { colid };
    const entries = await Promise.all(filterFields.map(async ({ field, label }) => {
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
    }));

    res.json({ success: true, fields: filterFields, options: Object.fromEntries(entries) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateUserPivotReport = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const requestedPivotFields = Array.isArray(req.body.pivotFields) ? req.body.pivotFields : [];
    const selectedPivotFields = [...new Set(
      (requestedPivotFields.length ? requestedPivotFields : filters.map((item) => item.field))
        .filter((field) => allowedFields.has(field))
    )];
    const pivotFields = selectedPivotFields.length ? selectedPivotFields : ["role", "programcode", "category", "gender"];

    const query = {
      colid,
      ...buildFilterQuery(filters)
    };

    const [rows, institution] = await Promise.all([
      User.find(query)
        .select("academicyear role program programcode category gender Major Minor AEC SEC quota department state city district section semester colid")
        .lean(),
      Institution.findOne({ colid }).lean()
    ]);

    const grouped = req.body.groupTogether === true;
    const pivotRows = grouped ? pivotByFields(rows, pivotFields) : pivotFields.flatMap((field) => pivotByField(rows, field));

    res.json({
      success: true,
      total: rows.length,
      fields: filterFields,
      selectedFilters: filters.filter((item) => item.field && (item.operator === "notempty" || item.value)),
      pivotFields,
      pivotRows,
      grouped,
      institution: institution || null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
