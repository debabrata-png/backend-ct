const User = require("../Models/user");

const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const filterFields = [
  { field: "name", label: "Name" },
  { field: "regno", label: "Reg No" },
  { field: "email", label: "Email" },
  { field: "phone", label: "Phone" },
  { field: "password", label: "Password" },
  { field: "admissionyear", label: "Academic year" },
  { field: "academicyear", label: "Academic Year" },
  { field: "program", label: "Program Name" },
  { field: "programcode", label: "Program" },
  { field: "regulation", label: "Regulation" },
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

const clean = (value) => String(value ?? "").trim();

const valueFromBody = (body, field) => {
  const aliases = {
    Major: ["Major", "major"],
    Minor: ["Minor", "minor"],
    AEC: ["AEC", "aec"],
    SEC: ["SEC", "sec"],
    VAC: ["VAC", "vac"],
    IDC: ["IDC", "idc"]
  };
  const keys = aliases[field] || [field];
  for (const key of keys) {
    if (body[key] !== undefined) return body[key];
  }
  return "";
};

const buildStudentPayload = (body = {}) => ({
  name: clean(body.name) || "NA",
  regno: clean(body.regno) || "NA",
  email: clean(body.email),
  phone: clean(body.phone) || "NA",
  password: clean(body.password) || "NA",
  role: "Student",
  program: clean(body.program) || "NA",
  programcode: clean(body.programcode) || "NA",
  admissionyear: clean(body.admissionyear || body.academicyear) || "NA",
  academicyear: clean(body.academicyear || body.admissionyear) || "NA",
  semester: clean(body.semester) || "NA",
  section: clean(body.section) || "NA",
  gender: clean(body.gender) || "Not specified",
  category: clean(body.category) || "General",
  department: clean(body.department) || "NA",
  regulation: clean(body.regulation) || "NA",
  Major: clean(valueFromBody(body, "Major")) || "NA",
  Minor: clean(valueFromBody(body, "Minor")) || "NA",
  AEC: clean(valueFromBody(body, "AEC")) || "NA",
  SEC: clean(valueFromBody(body, "SEC")) || "NA",
  VAC: clean(valueFromBody(body, "VAC")) || "NA",
  IDC: clean(valueFromBody(body, "IDC")) || "NA",
  state: clean(body.state) || "NA",
  city: clean(body.city) || "NA",
  district: clean(body.district) || "NA",
  pincode: clean(body.pincode) || "NA",
  guardianname: clean(body.guardianname) || "NA",
  guardianmobile: clean(body.guardianmobile) || "NA",
  guardianemail: clean(body.guardianemail) || "NA",
  rollno: clean(body.rollno) || "NA",
  photo: clean(body.photo),
  institution: clean(body.institution) || "NA",
  user: clean(body.user),
  addedby: clean(body.user),
  status1: clean(body.status1),
  colid: Number(body.colid),
  status: Number(body.status || 1),
  lastlogin: body.lastlogin ? new Date(body.lastlogin) : new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))
});

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
      .select("-expotoken")
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

exports.createStudent = async (req, res) => {
  try {
    const payload = buildStudentPayload(req.body);
    if (!payload.colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!payload.email) return res.status(400).json({ success: false, message: "Email is required" });

    const data = await User.create(payload);
    res.json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: "Duplicate email is not allowed" });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const payload = buildStudentPayload(req.body);
    if (!payload.colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (!req.body.id) return res.status(400).json({ success: false, message: "id is required" });
    if (!payload.email) return res.status(400).json({ success: false, message: "Email is required" });

    const duplicate = await User.findOne({ _id: { $ne: req.body.id }, email: payload.email });
    if (duplicate) return res.status(400).json({ success: false, message: "Duplicate email is not allowed" });

    const data = await User.findOneAndUpdate(
      { _id: req.body.id, ...buildBaseQuery(payload.colid) },
      payload,
      { new: true, runValidators: true }
    );
    if (!data) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, data });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: "Duplicate email is not allowed" });
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });
    if (!req.body.id) return res.status(400).json({ success: false, message: "id is required" });

    const data = await User.findOneAndDelete({ _id: req.body.id, ...buildBaseQuery(colid) });
    if (!data) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
