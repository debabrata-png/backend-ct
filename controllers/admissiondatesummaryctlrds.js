const AdmissionApplication = require("../Models/admissionapplicationdynamic");

const parseDate = (value, endOfDay = false) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  if (endOfDay) date.setHours(23, 59, 59, 999);
  else date.setHours(0, 0, 0, 0);
  return date;
};

const isPaid = (status, amount) => String(status || "").toUpperCase() === "SUCCESS" || Number(amount || 0) > 0;

const getDateValue = (...values) => {
  for (const value of values) {
    if (!value) continue;
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date;
  }
  return null;
};

const inRange = (date, startDate, endDate) => {
  if (!date) return false;
  if (startDate && date < startDate) return false;
  if (endDate && date > endDate) return false;
  return true;
};

const programKey = (application) => {
  const program = application.programapplied || application.program || "Not specified";
  const programcode = application.programcode || "";
  return `${program}||${programcode}`;
};

const addToSummary = (map, application, amountField = null, fallbackAmountField = null) => {
  const key = programKey(application);
  const current = map.get(key) || {
    id: key,
    program: application.programapplied || application.program || "Not specified",
    programcode: application.programcode || "",
    count: 0,
    amount: 0
  };
  current.count += 1;
  if (amountField) {
    const amount = Number(application[amountField] || 0) || Number(application[fallbackAmountField] || 0) || 0;
    current.amount += amount;
  }
  map.set(key, current);
};

const sortSummary = (rows) => rows.sort((a, b) => b.count - a.count || String(a.program).localeCompare(String(b.program)));

exports.getAdmissionDateSummary = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ message: "colid is required" });

    const startDate = parseDate(req.query.startdate);
    const endDate = parseDate(req.query.enddate, true);
    const broadQuery = { colid };

    if (startDate || endDate) {
      broadQuery.$or = [
        { createdAt: { ...(startDate ? { $gte: startDate } : {}), ...(endDate ? { $lte: endDate } : {}) } },
        { paiddate: { ...(startDate ? { $gte: startDate } : {}), ...(endDate ? { $lte: endDate } : {}) } },
        { provisionalpaiddate: { ...(startDate ? { $gte: startDate } : {}), ...(endDate ? { $lte: endDate } : {}) } },
        { updatedAt: { ...(startDate ? { $gte: startDate } : {}), ...(endDate ? { $lte: endDate } : {}) } }
      ];
    }

    const applications = await AdmissionApplication.find(broadQuery).lean();
    const applicationMap = new Map();
    const applicationFeeMap = new Map();
    const provisionalFeeMap = new Map();

    applications.forEach((application) => {
      if (inRange(getDateValue(application.createdAt), startDate, endDate)) {
        addToSummary(applicationMap, application);
      }

      const applicationPaidDate = getDateValue(application.paiddate, application.updatedAt, application.createdAt);
      if (isPaid(application.paymentstatus, application.paidamount) && inRange(applicationPaidDate, startDate, endDate)) {
        addToSummary(applicationFeeMap, application, "paidamount", "applicationfeeamount");
      }

      const provisionalPaidDate = getDateValue(application.provisionalpaiddate, application.updatedAt, application.createdAt);
      if (isPaid(application.provisionalpaymentstatus, application.provisionalpaidamount) && inRange(provisionalPaidDate, startDate, endDate)) {
        addToSummary(provisionalFeeMap, application, "provisionalpaidamount", "provisionalfeeamount");
      }
    });

    const total = (rows, field) => rows.reduce((sum, row) => sum + Number(row[field] || 0), 0);
    const totalApplications = sortSummary(Array.from(applicationMap.values()));
    const applicationFeesPaid = sortSummary(Array.from(applicationFeeMap.values()));
    const provisionalFeesPaid = sortSummary(Array.from(provisionalFeeMap.values()));

    res.json({
      totalApplications,
      applicationFeesPaid,
      provisionalFeesPaid,
      totals: {
        applications: total(totalApplications, "count"),
        applicationFeeCount: total(applicationFeesPaid, "count"),
        applicationFeeAmount: total(applicationFeesPaid, "amount"),
        provisionalFeeCount: total(provisionalFeesPaid, "count"),
        provisionalFeeAmount: total(provisionalFeesPaid, "amount")
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Unable to load admission datewise summary" });
  }
};
