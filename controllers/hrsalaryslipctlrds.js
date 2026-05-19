const User = require("../Models/user");
const HrSalary = require("../Models/hrsalary");
const HrEmployeeAttendance = require("../Models/hremployeeattendanceds");
const LeaveBalance = require("../Models/hrleavebalanceds");
const Institution = require("../Models/insdetails");

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
      .select("name email phone department role user regno employeeid")
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
