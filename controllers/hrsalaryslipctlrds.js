const User = require("../Models/user");
const HrSalary = require("../Models/hrsalary");
const HrEmployeeAttendance = require("../Models/hremployeeattendanceds");
const LeaveBalance = require("../Models/hrleavebalanceds");
const Institution = require("../Models/insdetails");
const HrTdsDeposit = require("../Models/hrtdsdepositds");

const text = (value) => String(value || "").trim();
const number = (value) => {
  const parsed = Number(value || 0);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthNumber = (monthName) => months.findIndex((item) => item.toLowerCase() === text(monthName).toLowerCase()) + 1;

const periodYear = (monthName, academicYear) => {
  const startYear = Number(text(academicYear).split("-")[0]);
  const monthIndex = monthNumber(monthName);
  if (!startYear || !monthIndex) return "";
  return monthIndex >= 4 ? startYear : startYear + 1;
};

const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const salaryRowDate = (row) => {
  if (row.duedate) return toDateInput(row.duedate);
  const monthIndex = monthNumber(row.month);
  const yearText = text(row.year);
  if (!monthIndex || !yearText) return "";
  const year = yearText.includes("-") ? periodYear(row.month, yearText) : Number(yearText);
  if (!year) return "";
  return `${year}-${String(monthIndex).padStart(2, "0")}-01`;
};

const getNestedValue = (object, keys = []) => {
  for (const key of keys) {
    const value = object?.[key] || object?.customFields?.[key] || object?.customfields?.[key];
    if (text(value)) return text(value);
  }
  return "";
};

const dateRangeForMonth = (monthName, academicYear) => {
  const calendarYear = periodYear(monthName, academicYear);
  const monthIndex = monthNumber(monthName);
  if (!calendarYear || !monthIndex) return { fromdate: "", todate: "", totaldays: 0 };
  const fromdate = `${calendarYear}-${String(monthIndex).padStart(2, "0")}-01`;
  const lastDay = new Date(calendarYear, monthIndex, 0).getDate();
  const todate = `${calendarYear}-${String(monthIndex).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { fromdate, todate, totaldays: lastDay };
};

const isStudentRole = (role) => text(role).toLowerCase() === "student";

const employeeFilter = (colid, filters = []) => {
  const query = { colid: Number(colid), role: { $not: /^Student$/i } };
  filters.forEach((item) => {
    const field = text(item.field);
    const value = text(item.value);
    if (!field || !value) return;
    if (["name", "email", "phone", "department", "role", "user"].includes(field)) {
      query[field] = { $regex: value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    }
  });
  return query;
};

exports.getSalarySlipOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const users = await User.find({ colid, role: { $not: /^Student$/i } })
      .select("name email phone department role user")
      .sort({ name: 1 })
      .lean();

    const optionFields = ["department", "name", "email", "phone", "role"];
    const options = optionFields.reduce((acc, field) => {
      acc[field] = [...new Set(users.map((item) => text(item[field])).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b));
      return acc;
    }, {});

    const salaryPeriods = await HrSalary.find({ colid }).select("month year").lean();
    const salaryMonths = [...new Set(salaryPeriods.map((item) => text(item.month)).filter(Boolean))]
      .sort((a, b) => monthNumber(a) - monthNumber(b));
    const salaryYears = [...new Set(salaryPeriods.map((item) => text(item.year)).filter(Boolean))]
      .sort((a, b) => b.localeCompare(a));
    const leaveCycles = await LeaveBalance.distinct("cyclename", { colid, cyclename: { $nin: ["", null] } });

    res.json({
      success: true,
      filterFields: optionFields,
      options,
      months: salaryMonths.length ? salaryMonths : months,
      years: salaryYears,
      leaveCycles: leaveCycles.sort((a, b) => text(b).localeCompare(text(a)))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchSalarySlipEmployees = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });

    const data = await User.find(employeeFilter(colid, Array.isArray(req.body.filters) ? req.body.filters : []))
      .select("name email phone department role user regno employeeid pan designation")
      .sort({ name: 1 })
      .limit(500)
      .lean();

    res.json({
      success: true,
      data: data.filter((item) => !isStudentRole(item.role)).map((item) => ({
        ...item,
        id: String(item._id),
        displayemail: text(item.email || item.user)
      }))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateSalarySlip = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const month = text(req.body.month);
    const year = text(req.body.year);
    const cyclename = text(req.body.cyclename);
    const employeeid = text(req.body.employeeid);
    const employeeemail = text(req.body.employeeemail);
    const requestedEmpid = text(req.body.empid);

    if (!colid || !month || !year || !cyclename) {
      return res.status(400).json({ success: false, message: "colid, month, year and leave cycle are required" });
    }

    const employee = employeeid
      ? await User.findOne({ _id: employeeid, colid }).lean()
      : await User.findOne({
          colid,
          $or: [
            { email: employeeemail || requestedEmpid },
            { user: employeeemail || requestedEmpid },
            { empid: employeeemail || requestedEmpid }
          ]
        }).lean();

    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    const empid = text(requestedEmpid || employee.empid || employee.email || employee.user || employeeemail);
    if (!empid) {
      return res.status(400).json({ success: false, message: "empid is required to load salary records" });
    }

    const salaryRows = await HrSalary.find({
      colid,
      month,
      year,
      empid
    }).sort({ type: 1, component: 1 }).lean();

    if (!salaryRows.length) {
      return res.status(404).json({ success: false, message: "No salary records found for the selected employee and period" });
    }

    const { fromdate, todate, totaldays } = dateRangeForMonth(month, year);
    const emailCandidates = [...new Set([employee.email, employee.user, employeeemail, empid].map(text).filter(Boolean))];
    const attendanceRows = await HrEmployeeAttendance.find({
      colid,
      employeeemail: { $in: emailCandidates },
      date: { $gte: fromdate, $lte: todate }
    }).select("date attendance status").lean();

    const presentDates = new Set();
    const absentDates = new Set();
    attendanceRows.forEach((item) => {
      if (number(item.attendance) === 1) presentDates.add(text(item.date));
      else absentDates.add(text(item.date));
    });

    const earnings = [];
    const deductions = [];
    salaryRows.forEach((row) => {
      const amount = number(row.amount);
      const isDeduction = text(row.type).toLowerCase().includes("deduction") || amount < 0;
      const item = {
        id: String(row._id),
        component: row.component,
        type: row.type,
        amount: Math.abs(amount),
        rawamount: amount,
        level: row.level,
        paystatus: row.paystatus
      };
      if (isDeduction) deductions.push(item);
      else earnings.push(item);
    });

    const totalearning = earnings.reduce((sum, item) => sum + number(item.amount), 0);
    const totaldeduction = deductions.reduce((sum, item) => sum + number(item.amount), 0);
    const netpay = totalearning - totaldeduction;
    const leaveBalances = await LeaveBalance.find({
      colid,
      cyclename,
      employeeemail: { $in: emailCandidates }
    }).sort({ leavetype: 1 }).lean();
    const institution = await Institution.findOne({ colid }).lean();

    res.json({
      success: true,
      data: {
        institution,
        employee: {
          id: String(employee._id),
          name: employee.name,
          email: employee.email || employee.user,
          phone: employee.phone,
          department: employee.department,
          role: employee.role,
          employeeid: employee.employeeid || employee.regno || employee.email
        },
        period: { month, year, cyclename, fromdate, todate },
        attendance: {
          totaldays,
          presentdays: presentDates.size,
          absentdays: absentDates.size,
          unmarkeddays: Math.max(0, totaldays - presentDates.size - absentDates.size)
        },
        earnings,
        deductions,
        leaveBalances,
        totals: {
          totalearning,
          totaldeduction,
          netpay
        },
        generatedon: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.generateForm16 = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const fromdate = text(req.body.fromdate);
    const todate = text(req.body.todate);
    const employeeid = text(req.body.employeeid);
    const employeeemail = text(req.body.employeeemail);
    const requestedEmpid = text(req.body.empid);

    if (!colid || !fromdate || !todate) {
      return res.status(400).json({ success: false, message: "colid, from date and to date are required" });
    }

    const employee = employeeid
      ? await User.findOne({ _id: employeeid, colid }).lean()
      : await User.findOne({
          colid,
          $or: [
            { email: employeeemail || requestedEmpid },
            { user: employeeemail || requestedEmpid },
            { empid: employeeemail || requestedEmpid },
            { regno: requestedEmpid },
            { employeeid: requestedEmpid }
          ]
        }).lean();

    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    const empid = text(requestedEmpid || employee.empid || employee.email || employee.user || employeeemail);
    if (!empid) return res.status(400).json({ success: false, message: "Employee salary id/email is required" });

    const salaryRows = (await HrSalary.find({ colid, empid }).sort({ year: 1, month: 1, component: 1 }).lean())
      .map((row) => ({ ...row, salarydate: salaryRowDate(row) }))
      .filter((row) => row.salarydate && row.salarydate >= fromdate && row.salarydate <= todate);

    if (!salaryRows.length) {
      return res.status(404).json({ success: false, message: "No salary records found for the selected employee and date range" });
    }

    const rows = salaryRows.map((row) => ({
      id: String(row._id),
      date: row.salarydate,
      month: row.month,
      year: row.year,
      component: row.component,
      type: row.type,
      amount: number(row.amount),
      level: row.level,
      paystatus: row.paystatus
    }));

    const tdsRows = rows.filter((row) => /tds|tax deducted|income tax/i.test(text(row.component)));
    const deductionRows = rows.filter((row) => text(row.type).toLowerCase().includes("deduction") || number(row.amount) < 0);
    const earningRows = rows.filter((row) => !deductionRows.some((item) => item.id === row.id) && number(row.amount) > 0);
    const totalSalary = earningRows.reduce((sum, row) => sum + number(row.amount), 0);
    const totalDeductions = deductionRows.reduce((sum, row) => sum + Math.abs(number(row.amount)), 0);
    const totalTds = tdsRows.reduce((sum, row) => sum + Math.abs(number(row.amount)), 0);
    const taxableIncome = Math.max(0, totalSalary - (totalDeductions - totalTds));
    const monthlySummaryMap = new Map();
    rows.forEach((row) => {
      const key = `${row.month || ""} ${row.year || ""}`.trim() || row.date;
      const current = monthlySummaryMap.get(key) || { id: key, period: key, gross: 0, deductions: 0, tds: 0, net: 0 };
      if (tdsRows.some((item) => item.id === row.id)) current.tds += Math.abs(number(row.amount));
      if (deductionRows.some((item) => item.id === row.id)) current.deductions += Math.abs(number(row.amount));
      else current.gross += Math.max(0, number(row.amount));
      current.net = current.gross - current.deductions;
      monthlySummaryMap.set(key, current);
    });

    const institution = await Institution.findOne({ colid }).lean();
    const employeeEmail = text(employee.email || employee.user || employeeemail || empid).toLowerCase();
    const tdsDeposits = await HrTdsDeposit.find({
      colid,
      $or: [{ empid }, { employeeemail: employeeEmail }],
      taxperiod: { $in: tdsRows.map((row) => `${row.month || ""} ${row.year || ""}`.trim() || row.date) }
    }).lean();
    const depositMap = new Map(tdsDeposits.map((item) => [text(item.taxperiod), item]));
    const employeePan = getNestedValue(employee, ["pan", "PAN", "panno", "panNo"]);
    const employerPan = getNestedValue(institution, ["pan", "PAN", "panno", "panNo"]);
    const employerTan = getNestedValue(institution, ["tan", "TAN", "tanno", "tanNo"]);
    const assessmentStart = Number(fromdate.slice(0, 4)) + (Number(fromdate.slice(5, 7)) >= 4 ? 1 : 0);

    res.json({
      success: true,
      data: {
        institution,
        employee: {
          id: String(employee._id),
          name: employee.name,
          email: employee.email || employee.user,
          phone: employee.phone,
          department: employee.department,
          designation: employee.designation,
          employeeid: employee.employeeid || employee.regno || empid,
          pan: employeePan || "Not available",
          address: employee.address || [employee.city, employee.district, employee.state, employee.pincode].filter(Boolean).join(", ")
        },
        employer: {
          name: institution?.institutionname || "",
          address: institution?.address || "",
          pan: employerPan || "Not available",
          tan: employerTan || "Not available"
        },
        period: {
          fromdate,
          todate,
          financialyear: `${fromdate.slice(0, 4)}-${todate.slice(2, 4)}`,
          assessmentyear: assessmentStart ? `${assessmentStart}-${String(assessmentStart + 1).slice(2)}` : ""
        },
        partA: {
          certificate: "Certificate under section 203 of the Income-tax Act, 1961 for tax deducted at source on salary",
          tdsDeducted: totalTds,
          challanDetails: tdsRows.map((row, index) => ({
            id: index + 1,
            period: `${row.month || ""} ${row.year || ""}`.trim() || row.date,
            amount: Math.abs(number(row.amount)),
            bsrCode: depositMap.get(`${row.month || ""} ${row.year || ""}`.trim() || row.date)?.bsrcode || "",
            challanSerialNo: depositMap.get(`${row.month || ""} ${row.year || ""}`.trim() || row.date)?.challanserialno || "",
            depositedDate: depositMap.get(`${row.month || ""} ${row.year || ""}`.trim() || row.date)?.datedeposited || ""
          }))
        },
        partB: {
          grossSalary: totalSalary,
          deductionsOtherThanTds: Math.max(0, totalDeductions - totalTds),
          taxableIncome,
          taxPayable: totalTds,
          tdsDeducted: totalTds,
          balanceTax: 0
        },
        rows,
        earningRows,
        deductionRows,
        tdsRows,
        monthlySummary: Array.from(monthlySummaryMap.values()),
        generatedon: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEmployeePan = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const id = text(req.body.id || req.body.employeeid);
    const pan = text(req.body.pan).toUpperCase();
    if (!colid || !id) return res.status(400).json({ success: false, message: "colid and employee are required" });
    const data = await User.findOneAndUpdate({ _id: id, colid }, { pan }, { new: true }).select("name email phone department designation pan").lean();
    if (!data) return res.status(404).json({ success: false, message: "Employee not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEmployeeTdsLedgerOptions = async (req, res) => {
  try {
    const colid = Number(req.query.colid);
    const employeeid = text(req.query.employeeid);
    const employeeemail = text(req.query.employeeemail);
    if (!colid) return res.status(400).json({ success: false, message: "colid is required" });
    const employee = employeeid
      ? await User.findOne({ _id: employeeid, colid }).lean()
      : await User.findOne({ colid, $or: [{ email: employeeemail }, { user: employeeemail }] }).lean();
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });
    const empid = text(employee.empid || employee.email || employee.user || employeeemail);
    const rows = (await HrSalary.find({ colid, empid }).sort({ year: 1, month: 1 }).lean())
      .filter((row) => /tds|tax deducted|income tax/i.test(text(row.component)));
    const options = rows.map((row) => {
      const period = `${row.month || ""} ${row.year || ""}`.trim() || salaryRowDate(row);
      return {
        id: String(row._id),
        taxperiod: period,
        tdsamount: Math.abs(number(row.amount)),
        component: row.component,
        month: row.month,
        year: row.year
      };
    });
    res.json({ success: true, employee: { ...employee, id: String(employee._id), empid }, options });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.saveTdsDeposit = async (req, res) => {
  try {
    const colid = Number(req.body.colid);
    const employeeemail = text(req.body.employeeemail).toLowerCase();
    const empid = text(req.body.empid || employeeemail);
    const taxperiod = text(req.body.taxperiod);
    if (!colid || !employeeemail || !taxperiod) return res.status(400).json({ success: false, message: "colid, employee and tax period are required" });
    const payload = {
      colid,
      employeeid: text(req.body.employeeid),
      employee: text(req.body.employee),
      employeeemail,
      empid,
      taxperiod,
      tdsamount: number(req.body.tdsamount),
      bsrcode: text(req.body.bsrcode),
      challanserialno: text(req.body.challanserialno),
      datedeposited: req.body.datedeposited || null,
      remarks: text(req.body.remarks),
      user: text(req.body.user)
    };
    const data = req.body.id
      ? await HrTdsDeposit.findOneAndUpdate({ _id: req.body.id, colid }, payload, { new: true, runValidators: true })
      : await HrTdsDeposit.findOneAndUpdate({ colid, empid, taxperiod }, payload, { upsert: true, new: true, runValidators: true });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTdsDeposits = async (req, res) => {
  try {
    const query = { colid: Number(req.query.colid) };
    if (!query.colid) return res.status(400).json({ success: false, message: "colid is required" });
    if (req.query.employeeemail) query.employeeemail = text(req.query.employeeemail).toLowerCase();
    if (req.query.empid) query.empid = text(req.query.empid);
    const data = await HrTdsDeposit.find(query).sort({ taxperiod: -1, employee: 1 }).lean();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTdsDeposit = async (req, res) => {
  try {
    await HrTdsDeposit.deleteOne({ _id: req.body.id, colid: Number(req.body.colid) });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
