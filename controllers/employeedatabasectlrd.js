const EmployeeField = require("../Models/employeedatabasefieldds");
const EmployeeDatabase = require("../Models/employeedatabaseds");

const baseFields = [
  { field: "name", label: "Name", type: "text", required: true },
  { field: "email", label: "Email", type: "email", required: true },
  { field: "phone", label: "Phone", type: "phone", required: false },
  { field: "employeeid", label: "Employee ID", type: "text", required: true },
  { field: "login", label: "Login", type: "text", required: false },
  { field: "institution", label: "Institution", type: "text", required: false },
  { field: "department", label: "Department", type: "text", required: false },
  { field: "status", label: "Status", type: "dropdown", options: ["Active", "Inactive"], required: false }
];

const excludedFilterFields = new Set(["_id", "__v", "colid", "user", "customFields"]);

const cleanFieldName = (value) => String(value || "")
  .trim()
  .replace(/[^a-zA-Z0-9_]/g, "_")
  .replace(/_+/g, "_")
  .replace(/^_+|_+$/g, "")
  .toLowerCase();

const normalizeOptions = (options) => {
  if (Array.isArray(options)) return options.map((item) => String(item).trim()).filter(Boolean);
  return String(options || "").split(",").map((item) => item.trim()).filter(Boolean);
};

const normalizeCustomFields = (customFields) => {
  if (!customFields) return {};
  if (customFields instanceof Map) return Object.fromEntries(customFields);
  if (typeof customFields === "object") return customFields;
  return {};
};

const colidFilter = (colid) => ({ colid: Number(colid) });

const valueFromBody = (body, candidates = []) => {
  for (const candidate of candidates) {
    if (candidate && body[candidate] !== undefined) return body[candidate];
  }
  const normalized = Object.entries(body).reduce((acc, [key, value]) => {
    acc[String(key).trim().toLowerCase()] = value;
    return acc;
  }, {});
  for (const candidate of candidates) {
    const key = String(candidate || "").trim().toLowerCase();
    if (key && normalized[key] !== undefined) return normalized[key];
  }
  return undefined;
};

const fieldPayload = (body) => ({
  colid: Number(body.colid),
  fieldname: cleanFieldName(body.fieldname || body.fieldName || body["Field Key"] || body.label || body.Label),
  label: String(body.label || body.Label || body["Field Label"] || "").trim(),
  type: String(body.type || body.Type || "text").trim() || "text",
  options: normalizeOptions(body.options || body.Options),
  iseditable: body.iseditable || body.editable || body.Editable || "Yes",
  isrequired: body.isrequired || body.required || body.Required || "No",
  isactive: body.isactive || body.active || body.Active || "Yes",
  order: Number(body.order || body.Order || 0),
  user: body.user || ""
});

const employeePayload = (body, fieldDefs = []) => {
  const customInput = normalizeCustomFields(body.customFields);
  const customValues = {};

  fieldDefs.forEach((field) => {
    const customValue = valueFromBody(customInput, [field.fieldname, field.label]);
    const bodyValue = valueFromBody(body, [field.fieldname, field.label, `customFields.${field.fieldname}`, `Custom ${field.label}`]);
    if (customValue !== undefined) {
      customValues[field.fieldname] = customValue;
    } else if (bodyValue !== undefined) {
      customValues[field.fieldname] = bodyValue;
    }
  });

  return {
    colid: Number(body.colid),
    name: String(body.name || body.Name || "").trim(),
    email: String(body.email || body.Email || "").trim(),
    phone: String(body.phone || body.Phone || "").trim(),
    employeeid: String(body.employeeid || body.employeeId || body["Employee ID"] || body.EmployeeID || "").trim(),
    login: String(body.login || body.Login || "").trim(),
    institution: String(body.institution || body.Institution || "").trim(),
    department: String(body.department || body.Department || "").trim(),
    customFields: customValues,
    status: body.status || body.Status || "Active",
    user: body.user || ""
  };
};

const serializeEmployee = (row) => {
  const data = row?.toObject ? row.toObject() : row;
  return { ...data, customFields: normalizeCustomFields(data?.customFields) };
};

const parseFilters = (source) => {
  if (Array.isArray(source)) return source;
  if (!source) return [];
  try {
    const parsed = JSON.parse(source);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
};

const buildFilter = (colid, filters = []) => {
  const mongoFilter = colidFilter(colid);
  filters.forEach((filter) => {
    if (!filter?.field || excludedFilterFields.has(filter.field)) return;
    const value = filter.value;
    if (value === undefined || value === null || String(value).trim() === "") return;
    mongoFilter[filter.field] = { $regex: String(value), $options: "i" };
  });
  return mongoFilter;
};

exports.getMeta = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const customFields = await EmployeeField.find({ ...colidFilter(colid), isactive: "Yes" }).sort({ order: 1, label: 1 }).lean();
    const customFilterFields = customFields.map((field) => ({
      field: `customFields.${field.fieldname}`,
      fieldname: field.fieldname,
      label: field.label,
      type: field.type || "text",
      options: field.options || [],
      source: "custom"
    }));
    res.json({ baseFields, customFields, filterFields: [...baseFields, ...customFilterFields] });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getFields = async (req, res) => {
  try {
    const filter = colidFilter(req.query.colid);
    if (req.query.activeOnly !== "No") filter.isactive = "Yes";
    const data = await EmployeeField.find(filter).sort({ order: 1, label: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createField = async (req, res) => {
  try {
    const payload = fieldPayload(req.body);
    if (!payload.colid || !payload.label || !payload.fieldname) return res.status(400).json({ msg: "Field label is required" });
    const data = await EmployeeField.create(payload);
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: "Field key already exists" });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateField = async (req, res) => {
  try {
    const payload = fieldPayload(req.body);
    const duplicate = await EmployeeField.findOne({ _id: { $ne: req.body.id }, colid: payload.colid, fieldname: payload.fieldname });
    if (duplicate) return res.status(400).json({ msg: "Field key already exists" });
    const data = await EmployeeField.findOneAndUpdate({ _id: req.body.id, colid: payload.colid }, payload, { new: true, runValidators: true });
    res.json(data);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: "Field key already exists" });
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteField = async (req, res) => {
  try {
    await EmployeeField.findOneAndUpdate({ _id: req.body.id, colid: Number(req.body.colid) }, { isactive: "No" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkFields = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const colid = Number(req.body.colid);
    const errors = [];
    let saved = 0;
    if (!colid) return res.status(400).json({ msg: "College id is required" });
    if (!items.length) return res.status(400).json({ msg: "No rows received" });

    for (let index = 0; index < items.length; index += 1) {
      const rowNumber = items[index].rowNumber || index + 2;
      const payload = fieldPayload({ ...items[index], colid, user: req.body.user || items[index].user });
      if (!payload.label || !payload.fieldname) {
        errors.push({ rowNumber, msg: "Field label is required" });
        continue;
      }
      try {
        await EmployeeField.findOneAndUpdate(
          { colid, fieldname: payload.fieldname },
          payload,
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        saved += 1;
      } catch (err) {
        errors.push({ rowNumber, msg: err.message });
      }
    }
    res.json({ saved, errors });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const filters = parseFilters(req.query.filters);
    const data = await EmployeeDatabase.find(buildFilter(req.query.colid, filters)).sort({ name: 1, employeeid: 1 }).limit(Number(req.query.limit || 2000));
    res.json(data.map(serializeEmployee));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getEmployeeProfileByLogin = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const login = String(req.query.login || "").trim();
    if (!colid || !login) return res.status(400).json({ msg: "College id and login are required" });
    const data = await EmployeeDatabase.find({ colid, login }).sort({ name: 1, employeeid: 1 });
    res.json(data.map(serializeEmployee));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const fieldDefs = await EmployeeField.find({ ...colidFilter(req.body.colid), isactive: "Yes" }).lean();
    const payload = employeePayload(req.body, fieldDefs);
    if (!payload.colid || !payload.name || !payload.email || !payload.employeeid) {
      return res.status(400).json({ msg: "Name, email and employee id are required" });
    }
    const missing = fieldDefs.filter((field) => field.isrequired === "Yes" && !String(payload.customFields[field.fieldname] || "").trim());
    if (missing.length) return res.status(400).json({ msg: `Required field missing: ${missing.map((item) => item.label).join(", ")}` });
    const data = await EmployeeDatabase.create(payload);
    res.json(serializeEmployee(data));
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: "Duplicate email or employee id is not allowed" });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const fieldDefs = await EmployeeField.find({ ...colidFilter(colid), isactive: "Yes" }).lean();
    const payload = employeePayload(req.body, fieldDefs);
    const missing = fieldDefs.filter((field) => field.isrequired === "Yes" && !String(payload.customFields[field.fieldname] || "").trim());
    if (missing.length) return res.status(400).json({ msg: `Required field missing: ${missing.map((item) => item.label).join(", ")}` });

    const duplicate = await EmployeeDatabase.findOne({
      _id: { $ne: req.body.id },
      colid,
      $or: [{ email: payload.email }, { employeeid: payload.employeeid }]
    });
    if (duplicate) return res.status(400).json({ msg: "Duplicate email or employee id is not allowed" });

    const data = await EmployeeDatabase.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true, runValidators: true });
    res.json(serializeEmployee(data));
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: "Duplicate email or employee id is not allowed" });
    res.status(500).json({ msg: err.message });
  }
};

exports.updateEmployeeProfileEditable = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const login = String(req.body.login || "").trim();
    const employee = await EmployeeDatabase.findOne({ _id: req.body.id, colid, login });
    if (!employee) return res.status(404).json({ msg: "Employee profile not found" });

    const fieldDefs = await EmployeeField.find({ ...colidFilter(colid), isactive: "Yes" }).lean();
    const incoming = normalizeCustomFields(req.body.customFields);
    const currentCustom = normalizeCustomFields(employee.customFields);
    const updatedCustom = { ...currentCustom };

    fieldDefs.forEach((field) => {
      if (field.iseditable === "Yes" && incoming[field.fieldname] !== undefined) {
        updatedCustom[field.fieldname] = incoming[field.fieldname];
      }
    });

    const missing = fieldDefs.filter((field) => (
      field.iseditable === "Yes"
      && field.isrequired === "Yes"
      && !String(updatedCustom[field.fieldname] || "").trim()
    ));
    if (missing.length) return res.status(400).json({ msg: `Required field missing: ${missing.map((item) => item.label).join(", ")}` });

    employee.customFields = updatedCustom;
    await employee.save();
    res.json(serializeEmployee(employee));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await EmployeeDatabase.findOneAndDelete({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bulkEmployees = async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    const colid = Number(req.body.colid);
    const errors = [];
    let saved = 0;
    if (!colid) return res.status(400).json({ msg: "College id is required" });
    if (!items.length) return res.status(400).json({ msg: "No rows received" });

    const fieldDefs = await EmployeeField.find({ ...colidFilter(colid), isactive: "Yes" }).lean();
    for (let index = 0; index < items.length; index += 1) {
      const rowNumber = items[index].rowNumber || index + 2;
      const payload = employeePayload({ ...items[index], colid, user: req.body.user || items[index].user }, fieldDefs);
      if (!payload.name || !payload.email || !payload.employeeid) {
        errors.push({ rowNumber, msg: "Name, email and employee id are required" });
        continue;
      }
      const missing = fieldDefs.filter((field) => field.isrequired === "Yes" && !String(payload.customFields[field.fieldname] || "").trim());
      if (missing.length) {
        errors.push({ rowNumber, msg: `Required field missing: ${missing.map((item) => item.label).join(", ")}` });
        continue;
      }
      try {
        await EmployeeDatabase.findOneAndUpdate(
          { colid, employeeid: payload.employeeid },
          payload,
          { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
        saved += 1;
      } catch (err) {
        errors.push({ rowNumber, msg: err.message });
      }
    }
    res.json({ saved, errors });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ msg: "Duplicate email or employee id is not allowed" });
    res.status(500).json({ msg: err.message });
  }
};
