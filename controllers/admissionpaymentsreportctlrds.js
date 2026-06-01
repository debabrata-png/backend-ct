const AdmissionApplication = require("../Models/admissionapplicationdynamic");
const Institution = require("../Models/insdetails");

const baseFilterFields = [
  { field: "academicyear", label: "Academic Year" },
  { field: "formid", label: "Form ID" },
  { field: "level", label: "Level" },
  { field: "programtype", label: "Program Type" },
  { field: "programapplied", label: "Program" },
  { field: "programcode", label: "Program Code" },
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "phone", label: "Phone" },
  { field: "applicationstatus", label: "Application Status" }
];

const reportFilterFields = [
  ...baseFilterFields,
  { field: "paymenttype", label: "Payment Type" },
  { field: "paymentstatus", label: "Payment Status" },
  { field: "paymentrefno", label: "Reference No" }
];

const allowedBaseFields = new Set(baseFilterFields.map((item) => item.field));
const allowedReportFields = new Set(reportFilterFields.map((item) => item.field));
const textFields = new Set(["name", "email", "phone", "paymentrefno"]);

const clean = (value) => String(value ?? "").trim();
const toNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};
const escapeRegex = (value) => clean(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isPaid = (status, amount) => {
  const cleanStatus = clean(status).toUpperCase();
  return cleanStatus === "SUCCESS" || cleanStatus === "PAID" || Number(amount || 0) > 0;
};

const getDateValue = (...values) => {
  for (const value of values) {
    if (!value) continue;
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return null;
};

const buildApplicationQuery = (filters = []) => {
  const query = {};
  filters.forEach((filter) => {
    const field = clean(filter.field);
    if (!allowedBaseFields.has(field)) return;
    const rawValue = filter.value;
    if (Array.isArray(rawValue)) {
      const values = rawValue.map(clean).filter(Boolean);
      if (values.length) query[field] = { $in: values };
      return;
    }
    const value = clean(rawValue);
    if (!value) return;
    if (textFields.has(field) || clean(filter.operator) === "contains") {
      query[field] = { $regex: escapeRegex(value), $options: "i" };
    } else {
      query[field] = value;
    }
  });
  return query;
};

const paymentRowsForApplication = (application) => {
  const common = {
    applicationid: String(application._id || ""),
    academicyear: application.academicyear || "",
    formid: application.formid || "",
    level: application.level || "",
    programtype: application.programtype || "",
    program: application.programapplied || "",
    programcode: application.programcode || "",
    student: application.name || "",
    email: application.email || "",
    phone: application.phone || "",
    applicationstatus: application.applicationstatus || "",
    createdAt: application.createdAt,
    updatedAt: application.updatedAt
  };

  const rows = [];
  if (isPaid(application.paymentstatus, application.paidamount)) {
    rows.push({
      ...common,
      id: `${common.applicationid}-application`,
      paymenttype: "Application Fee",
      paymentstatus: application.paymentstatus || "",
      paymentrefno: application.paymentrefno || "",
      configuredamount: Number(application.applicationfeeamount || 0),
      paidamount: Number(application.paidamount || application.applicationfeeamount || 0),
      paiddate: getDateValue(application.paiddate, application.updatedAt, application.createdAt),
      paymentdetails: application.paymentdetails || null
    });
  }

  if (isPaid(application.provisionalpaymentstatus, application.provisionalpaidamount)) {
    rows.push({
      ...common,
      id: `${common.applicationid}-provisional`,
      paymenttype: "Provisional Fee",
      paymentstatus: application.provisionalpaymentstatus || "",
      paymentrefno: application.provisionalpaymentrefno || "",
      configuredamount: Number(application.provisionalfeeamount || 0),
      paidamount: Number(application.provisionalpaidamount || application.provisionalfeeamount || 0),
      paiddate: getDateValue(application.provisionalpaiddate, application.updatedAt, application.createdAt),
      paymentdetails: application.provisionalpaymentdetails || null
    });
  }
  return rows;
};

const rowMatchesReportFilters = (row, filters = []) => filters.every((filter) => {
  const field = clean(filter.field);
  if (!allowedReportFields.has(field) || allowedBaseFields.has(field)) return true;
  const value = clean(filter.value);
  if (!value) return true;
  const rowValue = clean(row[field]);
  if (textFields.has(field) || clean(filter.operator) === "contains") {
    return rowValue.toLowerCase().includes(value.toLowerCase());
  }
  return rowValue === value;
});

const countBy = (rows, field) => {
  const map = new Map();
  rows.forEach((row) => {
    const key = clean(row[field]) || "Not specified";
    const item = map.get(key) || { name: key, count: 0, amount: 0 };
    item.count += 1;
    item.amount += Number(row.paidamount || 0);
    map.set(key, item);
  });
  return Array.from(map.values()).sort((a, b) => b.amount - a.amount || b.count - a.count || a.name.localeCompare(b.name));
};

exports.getAdmissionPaymentOptions = async (req, res) => {
  try {
    const colid = toNumber(req.query.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const baseQuery = { colid };
    const entries = await Promise.all(baseFilterFields.map(async ({ field, label }) => {
      const values = await AdmissionApplication.distinct(field, baseQuery);
      return [field, { label, values: values.map(clean).filter(Boolean).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) }];
    }));

    const applications = await AdmissionApplication.find(baseQuery)
      .select("paymentstatus provisionalpaymentstatus paymentrefno provisionalpaymentrefno paidamount provisionalpaidamount applicationfeeamount provisionalfeeamount")
      .lean();
    const paymentRows = applications.flatMap(paymentRowsForApplication);

    res.json({
      success: true,
      fields: reportFilterFields,
      options: {
        ...Object.fromEntries(entries),
        paymenttype: { label: "Payment Type", values: ["Application Fee", "Provisional Fee"] },
        paymentstatus: { label: "Payment Status", values: [...new Set(paymentRows.map((row) => clean(row.paymentstatus)).filter(Boolean))].sort() },
        paymentrefno: { label: "Reference No", values: [...new Set(paymentRows.map((row) => clean(row.paymentrefno)).filter(Boolean))].sort() }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAdmissionPayments = async (req, res) => {
  try {
    const colid = toNumber(req.body.colid);
    if (colid === undefined) return res.status(400).json({ success: false, message: "colid is required" });

    const filters = Array.isArray(req.body.filters) ? req.body.filters : [];
    const query = {
      colid,
      ...buildApplicationQuery(filters)
    };

    const [applications, institution] = await Promise.all([
      AdmissionApplication.find(query).sort({ updatedAt: -1, createdAt: -1 }).lean(),
      Institution.findOne({ colid }).lean()
    ]);

    const data = applications
      .flatMap(paymentRowsForApplication)
      .filter((row) => rowMatchesReportFilters(row, filters))
      .sort((a, b) => new Date(b.paiddate || b.updatedAt || 0) - new Date(a.paiddate || a.updatedAt || 0));

    const totals = data.reduce((sum, row) => ({
      count: sum.count + 1,
      paidamount: sum.paidamount + Number(row.paidamount || 0),
      applicationFeeCount: sum.applicationFeeCount + (row.paymenttype === "Application Fee" ? 1 : 0),
      applicationFeeAmount: sum.applicationFeeAmount + (row.paymenttype === "Application Fee" ? Number(row.paidamount || 0) : 0),
      provisionalFeeCount: sum.provisionalFeeCount + (row.paymenttype === "Provisional Fee" ? 1 : 0),
      provisionalFeeAmount: sum.provisionalFeeAmount + (row.paymenttype === "Provisional Fee" ? Number(row.paidamount || 0) : 0)
    }), { count: 0, paidamount: 0, applicationFeeCount: 0, applicationFeeAmount: 0, provisionalFeeCount: 0, provisionalFeeAmount: 0 });

    res.json({
      success: true,
      data,
      count: data.length,
      totals,
      summary: {
        paymenttype: countBy(data, "paymenttype"),
        program: countBy(data, "program"),
        academicyear: countBy(data, "academicyear"),
        paymentstatus: countBy(data, "paymentstatus")
      },
      institution: institution || null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
