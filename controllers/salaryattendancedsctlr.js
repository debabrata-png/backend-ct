const AllowedIPds = require('../Models/allowedipds');
const AttendanceRecordds = require('../Models/attendancerecordds');
const SalarySettingds = require('../Models/salarysettingds');
const SalarySlipds = require('../Models/salaryslipds');
const AttendanceSettingds = require('../Models/attendancesettingds');
const leavebalanceds1 = require('../Models/leavebalanceds1');
const User = require('../Models/user'); // Using the existing User model
const os = require('os');

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getClientIP = (req) => {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return '127.0.0.1';
  }
  
  let ip = req.headers['x-forwarded-for'] || 
           req.headers['x-real-ip'] || 
           req.connection.remoteAddress || 
           req.socket.remoteAddress ||
           req.ip ||
           '127.0.0.1';

  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  if (ip.includes('::ffff:')) ip = ip.replace('::ffff:', '');
  
  if ((ip === '::1' || ip === '127.0.0.1' || ip === 'localhost') && process.env.NODE_ENV === 'production') {
    const networkInterfaces = os.networkInterfaces();
    const preferredInterfaces = ['eth0', 'ens33', 'ens160', 'en0', 'wlan0', 'wifi0'];
    
    for (const interfaceName of preferredInterfaces) {
      const networkInterface = networkInterfaces[interfaceName];
      if (networkInterface) {
        for (const network of networkInterface) {
          if (!network.internal && network.family === 'IPv4') {
            return network.address;
          }
        }
      }
    }
    
    for (const interfaceName in networkInterfaces) {
      const networkInterface = networkInterfaces[interfaceName];
      for (const network of networkInterface) {
        if (!network.internal && network.family === 'IPv4') {
          return network.address;
        }
      }
    }
  }
  
  return ip;
};

const calculateWorkingHours = (checkIn, checkOut) => {
  const diffMs = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
};

const isLateArrival = (checkInTime, officeStartTime, gracePeriodMinutes) => {
  const [startHour, startMinute] = officeStartTime.split(':').map(Number);
  const checkIn = new Date(checkInTime);
  const officeStart = new Date(checkIn);
  officeStart.setHours(startHour, startMinute, 0, 0);
  const graceTime = new Date(officeStart.getTime() + (gracePeriodMinutes * 60 * 1000));
  return checkIn > graceTime;
};

const calculateDailySalary = async (email, colid) => {
  try {
    const salarySettings = await SalarySettingds.findOne({ 
      empemail: email, 
      colid: parseInt(colid) 
    });
    
    if (!salarySettings) {
      return { dailySalary: 0, halfDaySalary: 0 };
    }
    
    const basicSalary = parseFloat(salarySettings.basicSalary);
    const hra = (basicSalary * parseFloat(salarySettings.hraPercent || '10')) / 100;
    const transportAllowance = parseFloat(salarySettings.transportAllowance || '0');
    const medicalAllowance = parseFloat(salarySettings.medicalAllowance || '0');
    const specialAllowance = parseFloat(salarySettings.specialAllowance || '0');
    
    const grossSalary = basicSalary + hra + transportAllowance + medicalAllowance + specialAllowance;
    const workingDaysInMonth = 22;
    const dailySalary = grossSalary / workingDaysInMonth;
    const halfDaySalary = dailySalary / 2;
    
    return { dailySalary, halfDaySalary };
  } catch (error) {
    console.error('Error calculating daily salary:', error);
    return { dailySalary: 0, halfDaySalary: 0 };
  }
};

// =============================================================================
// IP MANAGEMENT APIs (Updated for Employee-specific IPs)
// =============================================================================

exports.getuserip = (req, res) => {
  try {
    const ip = getClientIP(req);
    const environment = process.env.NODE_ENV || 'development';
    
    console.log(`Environment: ${environment}, Client IP: ${ip}`);
    
    res.json({ 
      ip,
      environment,
      debug: {
        'x-forwarded-for': req.headers['x-forwarded-for'],
        'x-real-ip': req.headers['x-real-ip'],
        'connection-remote': req.connection?.remoteAddress,
        'socket-remote': req.socket?.remoteAddress,
        'req-ip': req.ip
      }
    });
  } catch (error) {
    console.error('Error in getuserip:', error);
    res.status(500).json({ error: "Failed to get IP address" });
  }
};

exports.getallowedipsds = async (req, res) => {
  try {
    const { colid } = req.query;
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }
    const ips = await AllowedIPds.find({ 
      colid: parseInt(colid)
    }).sort({ createdAt: -1 });
    res.json(ips);
  } catch (error) {
    console.error('Get allowed IPs error:', error);
    res.status(500).json({ error: "Failed to fetch allowed IPs" });
  }
};

exports.createallowedipsds = async (req, res) => {
  try {
    const { empname, empemail, ipAddress, location, description, colid } = req.body;
    
    if (!empname || !empemail || !ipAddress || !colid) {
      return res.status(400).json({ 
        error: "Employee name, email, IP address, and colid are required" 
      });
    }

    // Check if IP already exists for this employee
    const existingIP = await AllowedIPds.findOne({
      empemail,
      ipAddress,
      colid: parseInt(colid)
    });

    if (existingIP) {
      return res.status(400).json({ 
        error: `IP address ${ipAddress} is already assigned to ${empname}` 
      });
    }

    const allowedIPData = {
      name: req.body.name || req.body.user,
      user: req.body.user,
      empname,
      empemail,
      ipAddress,
      location: location || '',
      description: description || '',
      colid: parseInt(colid),
      isActive: req.body.isActive !== false,
      addedBy: req.body.name || req.body.user,
      addedAt: new Date()
    };

    const ip = await AllowedIPds.create(allowedIPData);
    res.status(201).json(ip);
  } catch (error) {
    console.error('Create allowed IP error:', error);
    res.status(500).json({ error: "Failed to add IP address" });
  }
};

exports.updateallowedipsds = async (req, res) => {
  try {
    const { id, empname, empemail, ipAddress, location, description, isActive } = req.body;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const updateData = {
      empname: empname || '',
      empemail: empemail || '',
      ipAddress: ipAddress || '',
      location: location || '',
      description: description || '',
      isActive: isActive !== false,
      updatedBy: req.body.user || req.body.name,
      updatedAt: new Date()
    };

    const updatedIP = await AllowedIPds.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedIP) {
      return res.status(404).json({ error: "IP address not found" });
    }

    res.json(updatedIP);
  } catch (error) {
    console.error('Update allowed IP error:', error);
    res.status(500).json({ error: "Failed to update IP address" });
  }
};

exports.removeallowedipsds = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }
    
    const deletedIP = await AllowedIPds.findByIdAndDelete(id);
    if (deletedIP) {
      res.json({ 
        message: "IP address removed successfully",
        deletedIP: {
          empname: deletedIP.empname,
          empemail: deletedIP.empemail,
          ipAddress: deletedIP.ipAddress
        }
      });
    } else {
      res.status(404).json({ error: "IP address not found" });
    }
  } catch (error) {
    console.error('Remove allowed IP error:', error);
    res.status(500).json({ error: "Failed to remove IP address" });
  }
};

exports.checkipallowedds = async (req, res) => {
  try {
    const { ipAddress, empemail, colid } = req.query;
    if (!ipAddress || !empemail || !colid) {
      return res.status(400).json({ 
        error: "IP address, employee email, and colid are required" 
      });
    }
    
    const allowedIP = await AllowedIPds.findOne({ 
      ipAddress, 
      empemail,
      colid: parseInt(colid), 
      isActive: true 
    });
    
    res.json({ 
      isAllowed: !!allowedIP,
      assignedTo: allowedIP ? allowedIP.empname : null
    });
  } catch (error) {
    console.error('Check IP allowed error:', error);
    res.status(500).json({ error: "Failed to check IP address" });
  }
};

// Get IPs for specific employee
exports.getemployeeipsds = async (req, res) => {
  try {
    const { empemail, colid } = req.query;
    
    if (!empemail || !colid) {
      return res.status(400).json({ error: "Employee email and colid are required" });
    }

    const ips = await AllowedIPds.find({
      empemail,
      colid: parseInt(colid)
    }).sort({ createdAt: -1 });

    res.json(ips);
  } catch (error) {
    console.error('Get employee IPs error:', error);
    res.status(500).json({ error: "Failed to fetch employee IP addresses" });
  }
};
// =============================================================================
// USER/EMPLOYEE MANAGEMENT APIs (Using User Model)
// =============================================================================

// Get all users in organization (for search)
exports.getallemployeesds = async (req, res) => {
  try {
    const { colid, search } = req.query;
    
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    let query = { 
      colid: parseInt(colid),
      status: 1 // Only active users
    };
    
    // Add search filter if provided
    if (search && search.length >= 1) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { email: searchRegex },
        { name: searchRegex },
        { role: searchRegex },
        { department: searchRegex }
      ];
    }

    const users = await User.find(query)
      .select('name email role department phone regno')
      .limit(20)
      .sort({ name: 1 });

    // Transform to match expected format
    const employees = users.map(user => ({
      name: user.name,
      email: user.email,
      designation: user.role, // Using role as designation
      department: user.department,
      phone: user.phone,
      regno: user.regno
    }));

    res.json(employees);
  } catch (error) {
    console.error('Get all employees error:', error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// Search users with salary configurations
exports.searchsalaryemployeesds = async (req, res) => {
  try {
    const { colid, search } = req.query;
    
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    let query = { colid: parseInt(colid) };
    
    if (search && search.length >= 1) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { empemail: searchRegex },
        { empname: searchRegex },
        { designation: searchRegex }
      ];
    }

    const employees = await SalarySettingds.find(query)
      .select('empname empemail designation basicSalary createdAt')
      .limit(20)
      .sort({ empname: 1 });

    res.json(employees);
  } catch (error) {
    console.error('Search salary employees error:', error);
    res.status(500).json({ error: "Failed to search salary employees" });
  }
};

// =============================================================================
// ATTENDANCE MANAGEMENT APIs
// =============================================================================

exports.checkinds = async (req, res) => {
  try {
    const { email, name, colid } = req.body;
    if (!email || !name || !colid) {
      return res.status(400).json({ error: "Email, name, and colid are required" });
    }

    const clientIP = getClientIP(req);
    
    // Check if this IP is allowed for this specific employee
    const isAllowed = await AllowedIPds.findOne({ 
      ipAddress: clientIP, 
      empemail: email,
      colid: parseInt(colid), 
      isActive: true 
    });
    
    if (!isAllowed) {
      return res.status(403).json({ 
        error: `IP address ${clientIP} is not authorized for ${name}. Please contact admin to add your IP address.` 
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const existingRecord = await AttendanceRecordds.findOne({
      email,
      colid: parseInt(colid),
      date: today
    });
    
    if (existingRecord) {
      return res.status(400).json({ error: "Already checked in today" });
    }

    const checkInTime = new Date();
    const settings = await AttendanceSettingds.findOne({ colid: parseInt(colid) });
    const officeStartTime = settings?.officeStartTime || '09:00';
    const gracePeriodMinutes = settings?.gracePeriodMinutes || 15;
    
    const isLate = isLateArrival(checkInTime, officeStartTime, gracePeriodMinutes);
    const gracePeriodMissed = isLate && isLateArrival(checkInTime, officeStartTime, 0);
    
    const recordData = {
      email,
      name,
      colid: parseInt(colid),
      date: today,
      checkInTime: checkInTime.toISOString(),
      checkOutTime: null,
      ipAddress: clientIP,
      status: isLate ? 'Late' : 'Present',
      workingHours: '0',
      isLate,
      gracePeriodMissed,
      leaveDeducted: '0',
      salaryDeducted: '0',
      deductionType: 'none'
    };

    if (gracePeriodMissed) {
      const currentYear = new Date().getFullYear().toString();
      
      const leaveBalance = await leavebalanceds1.findOne({
        email,
        colid: parseInt(colid),
        year: currentYear,
        leaveType: 'Casual Leave'
      });

      if (leaveBalance && leaveBalance.remaining >= 0.5) {
        leaveBalance.used += 0.5;
        leaveBalance.remaining -= 0.5;
        await leaveBalance.save();
        
        recordData.leaveDeducted = '0.5';
        recordData.deductionType = 'half_day_leave';
      } else {
        const { halfDaySalary } = await calculateDailySalary(email, colid);
        recordData.salaryDeducted = halfDaySalary.toString();
        recordData.deductionType = 'half_day_salary';
      }
    }

    const record = await AttendanceRecordds.create(recordData);
    res.status(201).json(record);
  } catch (error) {
    console.error('Check-in error:', error);
    res.status(500).json({ error: "Check-in failed" });
  }
};

exports.checkoutds = async (req, res) => {
  try {
    const { email, colid } = req.body;
    if (!email || !colid) {
      return res.status(400).json({ error: "Email and colid are required" });
    }

    const today = new Date().toISOString().split('T')[0];
    const existingRecord = await AttendanceRecordds.findOne({
      email,
      colid: parseInt(colid),
      date: today
    });
    
    if (!existingRecord) {
      return res.status(400).json({ error: "No check-in record found for today" });
    }

    if (existingRecord.checkOutTime) {
      return res.status(400).json({ error: "Already checked out today" });
    }

    const checkOutTime = new Date();
    const workingHours = calculateWorkingHours(existingRecord.checkInTime, checkOutTime);

    const updatedRecord = await AttendanceRecordds.findByIdAndUpdate(
      existingRecord._id,
      {
        checkOutTime: checkOutTime.toISOString(),
        workingHours: workingHours.toString(),
      },
      { new: true }
    );

    res.json(updatedRecord);
  } catch (error) {
    console.error('Check-out error:', error);
    res.status(500).json({ error: "Check-out failed" });
  }
};

exports.gettodayattendanceds = async (req, res) => {
  try {
    const { email, colid } = req.query;
    
    if (!email || !colid) {
      return res.status(400).json({ error: "Email and colid are required" });
    }

    const today = new Date().toISOString().split('T')[0];
    const record = await AttendanceRecordds.findOne({
      email,
      colid: parseInt(colid),
      date: today
    });

    res.json(record || null);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch today's attendance" });
  }
};

exports.getattendancerecordsds = async (req, res) => {
  try {
    const { email, colid, fromDate, toDate } = req.query;
    
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    let query = { colid: parseInt(colid) };

    if (email) {
      query.email = email;
    }

    if (fromDate || toDate) {
      query.date = {};
      if (fromDate) query.date.$gte = fromDate;
      if (toDate) query.date.$lte = toDate;
    }

    const records = await AttendanceRecordds.find(query).sort({ date: -1, checkInTime: -1 });
    res.json(records);
  } catch (error) {
    console.error('Get attendance records error:', error);
    res.status(500).json({ error: "Failed to fetch attendance records" });
  }
};

exports.getattendancestatsds = async (req, res) => {
  try {
    const { email, colid, month } = req.query;
    const monthToUse = month || new Date().toISOString().substr(0, 7);
    
    if (!email || !colid) {
      return res.status(400).json({ error: "Email and colid are required" });
    }

    const records = await AttendanceRecordds.find({
      email,
      colid: parseInt(colid),
      date: { $regex: `^${monthToUse}` }
    });

    const stats = {
      totalPresent: 0,
      totalLate: 0,
      totalAbsent: 0,
      totalHours: 0,
      halfDayLeaveDeducted: 0,
      halfDaySalaryDeducted: 0,
      fullDaySalaryDeducted: 0
    };

    records.forEach(record => {
      if (record.status === 'Present') stats.totalPresent++;
      else if (record.status === 'Late') stats.totalLate++;
      else if (record.status === 'Absent') stats.totalAbsent++;
      
      stats.totalHours += parseFloat(record.workingHours || '0');
      
      if (record.deductionType === 'half_day_leave') {
        stats.halfDayLeaveDeducted += parseFloat(record.leaveDeducted || '0');
      } else if (record.deductionType === 'half_day_salary') {
        stats.halfDaySalaryDeducted += parseFloat(record.salaryDeducted || '0');
      } else if (record.deductionType === 'full_day_salary') {
        stats.fullDaySalaryDeducted += parseFloat(record.salaryDeducted || '0');
      }
    });

    res.json(stats);
  } catch (error) {
    console.error('Get attendance stats error:', error);
    res.status(500).json({ error: "Failed to fetch attendance statistics" });
  }
};

exports.markabsentds = async (req, res) => {
  try {
    const { email, colid, date, reason } = req.body;
    
    if (!email || !colid || !date) {
      return res.status(400).json({ error: "Email, colid, and date are required" });
    }

    const existingRecord = await AttendanceRecordds.findOne({
      email,
      colid: parseInt(colid),
      date
    });
    
    if (existingRecord) {
      return res.status(400).json({ error: "Attendance record already exists for this date" });
    }

    const { dailySalary } = await calculateDailySalary(email, colid);

    // Get user name from User model
    const user = await User.findOne({ email, colid: parseInt(colid) });

    const recordData = {
      email,
      name: user?.name || 'Unknown',
      colid: parseInt(colid),
      date,
      checkInTime: null,
      checkOutTime: null,
      ipAddress: 'admin_marked',
      status: 'Absent',
      workingHours: '0',
      isLate: false,
      gracePeriodMissed: false,
      leaveDeducted: '0',
      salaryDeducted: dailySalary.toString(),
      deductionType: 'full_day_salary',
      reason: reason || 'Marked absent by admin'
    };

    const record = await AttendanceRecordds.create(recordData);
    res.status(201).json(record);
  } catch (error) {
    console.error('Mark absent error:', error);
    res.status(500).json({ error: "Failed to mark employee as absent" });
  }
};

exports.getattendancesummaryds = async (req, res) => {
  try {
    const { colid, date } = req.query;
    const dateToUse = date || new Date().toISOString().split('T')[0];
    
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    const records = await AttendanceRecordds.find({
      colid: parseInt(colid),
      date: dateToUse
    }).sort({ checkInTime: 1 });

    const summary = {
      totalEmployees: records.length,
      present: records.filter(r => r.status === 'Present').length,
      late: records.filter(r => r.status === 'Late').length,
      absent: records.filter(r => r.status === 'Absent').length,
      records
    };

    res.json(summary);
  } catch (error) {
    console.error('Get attendance summary error:', error);
    res.status(500).json({ error: "Failed to fetch attendance summary" });
  }
};

// =============================================================================
// SALARY MANAGEMENT APIs
// =============================================================================

exports.getsalarysettingsds = async (req, res) => {
  try {
    const { empemail, colid } = req.query;
    
    if (!empemail || !colid) {
      return res.status(400).json({ error: "Employee email and colid are required" });
    }

    const settings = await SalarySettingds.findOne({ 
      empemail, 
      colid: parseInt(colid) 
    });

    res.json(settings || null);
  } catch (error) {
    console.error('Get salary settings error:', error);
    res.status(500).json({ error: "Failed to fetch salary settings" });
  }
};

exports.createsalarysettingsds = async (req, res) => {
  try {
    const { empemail, colid } = req.body;
    
    if (!empemail || !colid) {
      return res.status(400).json({ error: "Employee email and colid are required" });
    }
    
    const existingSettings = await SalarySettingds.findOne({ 
      empemail, 
      colid: parseInt(colid) 
    });

    if (existingSettings) {
      const updatedSettings = await SalarySettingds.findOneAndUpdate(
        { empemail, colid: parseInt(colid) },
        { 
          ...req.body, 
          colid: parseInt(req.body.colid)
        },
        { new: true }
      );
      res.json(updatedSettings);
    } else {
      const settingsData = {
        ...req.body,
        colid: parseInt(req.body.colid)
      };

      const newSettings = await SalarySettingds.create(settingsData);
      res.status(201).json(newSettings);
    }
  } catch (error) {
    console.error('Salary settings error:', error);
    res.status(500).json({ error: "Failed to save salary settings" });
  }
};

exports.calculatesalaryds = async (req, res) => {
  try {
    const { empemail, colid, month } = req.body;
    
    if (!empemail || !colid || !month) {
      return res.status(400).json({ error: "Employee email, colid, and month are required" });
    }

    const salarySettings = await SalarySettingds.findOne({ 
      empemail, 
      colid: parseInt(colid) 
    });

    if (!salarySettings) {
      return res.status(404).json({ error: "Salary settings not found for this employee" });
    }

    const attendanceSettings = await AttendanceSettingds.findOne({ 
      colid: parseInt(colid) 
    });

    const records = await AttendanceRecordds.find({
      email: empemail,
      colid: parseInt(colid),
      date: { $regex: `^${month}` }
    });

    const stats = {
      totalPresent: 0,
      totalLate: 0,
      totalAbsent: 0,
      totalHours: 0,
      halfDaySalaryDeducted: 0,
      fullDaySalaryDeducted: 0
    };

    records.forEach(record => {
      if (record.status === 'Present') stats.totalPresent++;
      else if (record.status === 'Late') stats.totalLate++;
      else if (record.status === 'Absent') stats.totalAbsent++;
      
      stats.totalHours += parseFloat(record.workingHours || '0');
      
      if (record.deductionType === 'half_day_salary') {
        stats.halfDaySalaryDeducted += parseFloat(record.salaryDeducted || '0');
      } else if (record.deductionType === 'full_day_salary') {
        stats.fullDaySalaryDeducted += parseFloat(record.salaryDeducted || '0');
      }
    });

    const basicSalary = parseFloat(salarySettings.basicSalary);
    const hra = (basicSalary * parseFloat(salarySettings.hraPercent || '10')) / 100;
    const transportAllowance = parseFloat(salarySettings.transportAllowance || '0');
    const medicalAllowance = parseFloat(salarySettings.medicalAllowance || '0');
    const specialAllowance = parseFloat(salarySettings.specialAllowance || '0');
    
    const grossSalary = basicSalary + hra + transportAllowance + medicalAllowance + specialAllowance;
    
    const pf = (basicSalary * parseFloat(salarySettings.pfPercent || '12')) / 100;
    const esi = (grossSalary * parseFloat(salarySettings.esiPercent || '0.75')) / 100;
    const professionalTax = parseFloat(salarySettings.professionalTax || '200');
    
    const workingDaysInMonth = attendanceSettings?.workingDaysPerMonth || 22;
    const dailySalary = grossSalary / workingDaysInMonth;
    const halfDaySalary = dailySalary / 2;
    
    const totalDeductions = pf + esi + professionalTax + stats.halfDaySalaryDeducted + stats.fullDaySalaryDeducted;
    const netSalary = grossSalary - totalDeductions;

    const calculationResult = {
      empname: salarySettings.empname,
      empemail: salarySettings.empemail,
      designation: salarySettings.designation,
      basicSalary,
      hra,
      transportAllowance,
      medicalAllowance,
      specialAllowance,
      grossSalary,
      pf,
      esi,
      professionalTax,
      attendanceDeduction: stats.halfDaySalaryDeducted + stats.fullDaySalaryDeducted,
      lateDeduction: stats.halfDaySalaryDeducted,
      absentDeduction: stats.fullDaySalaryDeducted,
      totalDeductions,
      netSalary,
      workingDays: workingDaysInMonth,
      presentDays: stats.totalPresent,
      lateDays: stats.totalLate,
      absentDays: stats.totalAbsent,
      totalWorkingHours: stats.totalHours,
      dailySalary: dailySalary.toFixed(2),
      halfDaySalary: halfDaySalary.toFixed(2)
    };

    res.json(calculationResult);
  } catch (error) {
    console.error('Salary calculation error:', error);
    res.status(500).json({ error: "Failed to calculate salary" });
  }
};

exports.createsalaryslipds = async (req, res) => {
  try {
    const { empemail, colid, month, year } = req.body;
    
    if (!empemail || !colid || !month || !year) {
      return res.status(400).json({ error: "Employee email, colid, month, and year are required" });
    }
    
    const salarySettings = await SalarySettingds.findOne({ 
      empemail, 
      colid: parseInt(colid) 
    });
    
    if (!salarySettings) {
      return res.status(404).json({ error: "Salary settings not found for this employee" });
    }
    
    const existingSlip = await SalarySlipds.findOne({
      empemail,
      colid: parseInt(colid),
      month,
      year
    });
    
    if (existingSlip) {
      return res.status(400).json({ error: "Salary slip already exists for this month and year" });
    }
    
    const slipData = {
      ...req.body,
      colid: parseInt(req.body.colid),
      empname: salarySettings.empname,
      empemail: salarySettings.empemail,
      designation: salarySettings.designation,
      generatedAt: new Date().toISOString()
    };

    const slip = await SalarySlipds.create(slipData);
    res.status(201).json(slip);
  } catch (error) {
    console.error('Salary slip creation error:', error);
    res.status(500).json({ error: "Failed to generate salary slip" });
  }
};

exports.getsalaryslipsds = async (req, res) => {
  try {
    const { empemail, colid } = req.query;
    
    if (!empemail || !colid) {
      return res.status(400).json({ error: "Employee email and colid are required" });
    }

    const slips = await SalarySlipds.find({ 
      empemail, 
      colid: parseInt(colid) 
    }).sort({ year: -1, month: -1, createdAt: -1 });

    res.json(slips);
  } catch (error) {
    console.error('Get salary slips error:', error);
    res.status(500).json({ error: "Failed to fetch salary slips" });
  }
};

exports.getallsalaryslipsds = async (req, res) => {
  try {
    const { colid } = req.query;
    
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    const slips = await SalarySlipds.find({ 
      colid: parseInt(colid) 
    }).sort({ year: -1, month: -1, createdAt: -1 });

    res.json(slips);
  } catch (error) {
    console.error('Get all salary slips error:', error);
    res.status(500).json({ error: "Failed to fetch salary slips" });
  }
};

exports.getsalaryslipds = async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    const slip = await SalarySlipds.findById(id);
    
    if (!slip) {
      return res.status(404).json({ error: "Salary slip not found" });
    }
    
    res.json(slip);
  } catch (error) {
    console.error('Get salary slip error:', error);
    res.status(500).json({ error: "Failed to fetch salary slip" });
  }
};

exports.getsalaryemployeesds = async (req, res) => {
  try {
    const { colid } = req.query;
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    const employees = await SalarySettingds.find({ 
      colid: parseInt(colid) 
    }).select('empname empemail designation basicSalary createdAt').sort({ empname: 1 });

    res.json(employees);
  } catch (error) {
    console.error('Get salary employees error:', error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// =============================================================================
// ATTENDANCE SETTINGS APIs
// =============================================================================

exports.getattendancesettingsds = async (req, res) => {
  try {
    const { colid } = req.query;
    if (!colid) {
      return res.status(400).json({ error: "colid is required" });
    }

    const settings = await AttendanceSettingds.findOne({ 
      colid: parseInt(colid) 
    });

    res.json(settings || null);
  } catch (error) {
    console.error('Get attendance settings error:', error);
    res.status(500).json({ error: "Failed to fetch attendance settings" });
  }
};

exports.createattendancesettingsds = async (req, res) => {
  try {
    const { colid } = req.body;
    
    const existingSettings = await AttendanceSettingds.findOne({ 
      colid: parseInt(colid) 
    });

    if (existingSettings) {
      const updatedSettings = await AttendanceSettingds.findOneAndUpdate(
        { colid: parseInt(colid) },
        { 
          ...req.body, 
          colid: parseInt(colid)
        },
        { new: true }
      );
      res.json(updatedSettings);
    } else {
      const settingsData = {
        ...req.body,
        colid: parseInt(req.body.colid)
      };

      const newSettings = await AttendanceSettingds.create(settingsData);
      res.status(201).json(newSettings);
    }
  } catch (error) {
    console.error('Attendance settings error:', error);
    res.status(500).json({ error: "Failed to save attendance settings" });
  }
};

// Add these new functions to the existing controller file

// Update/Edit salary settings
exports.updatesalarysettingsds = async (req, res) => {
  try {
    const { id, empemail, colid } = req.body;
    
    if (!id && (!empemail || !colid)) {
      return res.status(400).json({ error: "ID or (Employee email and colid) are required" });
    }
    
    let query = {};
    if (id) {
      query._id = id;
    } else {
      query = { empemail, colid: parseInt(colid) };
    }
    
    const updatedSettings = await SalarySettingds.findOneAndUpdate(
      query,
      { 
        ...req.body, 
        colid: parseInt(req.body.colid),
        updatedAt: new Date(),
        updatedBy: req.body.user || req.body.name
      },
      { new: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({ error: "Salary settings not found" });
    }

    res.json(updatedSettings);
  } catch (error) {
    console.error('Update salary settings error:', error);
    res.status(500).json({ error: "Failed to update salary settings" });
  }
};

// Delete salary settings
exports.deletesalarysettingsds = async (req, res) => {
  try {
    const { id, empemail, colid } = req.body;
    
    if (!id && (!empemail || !colid)) {
      return res.status(400).json({ error: "ID or (Employee email and colid) are required" });
    }
    
    let query = {};
    if (id) {
      query._id = id;
    } else {
      query = { empemail, colid: parseInt(colid) };
    }
    
    const deletedSettings = await SalarySettingds.findOneAndDelete(query);

    if (!deletedSettings) {
      return res.status(404).json({ error: "Salary settings not found" });
    }

    res.json({ 
      message: "Salary settings deleted successfully",
      deletedEmployee: {
        name: deletedSettings.empname,
        email: deletedSettings.empemail
      }
    });
  } catch (error) {
    console.error('Delete salary settings error:', error);
    res.status(500).json({ error: "Failed to delete salary settings" });
  }
};

// Get single salary setting by ID
exports.getsalarysettingbyidds = async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const settings = await SalarySettingds.findById(id);

    if (!settings) {
      return res.status(404).json({ error: "Salary settings not found" });
    }

    res.json(settings);
  } catch (error) {
    console.error('Get salary setting by ID error:', error);
    res.status(500).json({ error: "Failed to fetch salary settings" });
  }
};

// Create or update salary settings with new structure
exports.createsalarysettingds = async (req, res) => {
  try {
    const { 
      empname, 
      empemail, 
      designation,
      fixedComponents = {},
      deductionComponents = {},
      variableComponents = []
    } = req.body;

    const { name, user, colid } = req.body;

    // Validate required fields
    if (!empname || !empemail || !designation) {
      return res.status(400).json({
        success: false,
        message: 'Employee name, email, and designation are required'
      });
    }

    // Check if salary setting already exists for this employee
    const existingSetting = await SalarySettingds.findOne({ 
      empemail, 
      colid 
    });

    if (existingSetting) {
      return res.status(409).json({
        success: false,
        message: 'Salary setting already exists for this employee'
      });
    }

    // Create new salary setting
    const newSalarySetting = new SalarySettingds({
      name: name || 'Admin',
      user: user || empemail,
      colid,
      empname,
      empemail,
      designation,
      fixedComponents: {
        basicSalary: fixedComponents.basicSalary || '0',
        hra: fixedComponents.hra || '0',
        conveyanceAllowance: fixedComponents.conveyanceAllowance || '0',
        telephoneAllowance: fixedComponents.telephoneAllowance || '0',
        carAllowance: fixedComponents.carAllowance || '0',
        fuelAllowance: fixedComponents.fuelAllowance || '0',
        medicalAllowance: fixedComponents.medicalAllowance || '0'
      },
      deductionComponents: {
        pf: deductionComponents.pf || '0',
        esi: deductionComponents.esi || '0',
        incomeTax: deductionComponents.incomeTax || '0'
      },
      variableComponents: variableComponents || []
    });

    const savedSetting = await newSalarySetting.save();

    res.status(201).json({
      success: true,
      message: 'Salary setting created successfully',
      data: savedSetting
    });

  } catch (error) {
    console.error('Error creating salary setting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create salary setting',
      error: error.message
    });
  }
};

// Update existing salary settings
exports.updatesalarysettingds = async (req, res) => {
  try {
    const { id } = req.query;
    const { 
      fixedComponents,
      deductionComponents,
      variableComponents,
      designation
    } = req.body;

    const updatedSetting = await SalarySettingds.findByIdAndUpdate(
      id,
      {
        designation,
        fixedComponents,
        deductionComponents,
        variableComponents
      },
      { new: true, runValidators: true }
    );

    if (!updatedSetting) {
      return res.status(404).json({
        success: false,
        message: 'Salary setting not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Salary setting updated successfully',
      data: updatedSetting
    });

  } catch (error) {
    console.error('Error updating salary setting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update salary setting',
      error: error.message
    });
  }
};

// Get salary calculation preview
exports.getSalaryCalculation = async (req, res) => {
  try {
    const { 
      fixedComponents = {},
      deductionComponents = {},
      variableComponents = []
    } = req.body;

    // Calculate totals
    const totalFixed = Object.values(fixedComponents).reduce((sum, value) => {
      return sum + (parseFloat(value) || 0);
    }, 0);

    const totalVariable = variableComponents.reduce((sum, component) => {
      return sum + (parseFloat(component.amount) || 0);
    }, 0);

    const totalDeductions = Object.values(deductionComponents).reduce((sum, value) => {
      return sum + (parseFloat(value) || 0);
    }, 0);

    const grossSalary = totalFixed + totalVariable;
    const netSalary = grossSalary - totalDeductions;

    // Calculate CTC (including employer contributions)
    const employerPF = parseFloat(deductionComponents.pf) || 0;
    const employerESI = parseFloat(deductionComponents.esi) || 0;
    const ctc = grossSalary + employerPF + employerESI;

    const calculation = {
      fixedComponents: {
        ...fixedComponents,
        total: totalFixed.toFixed(2)
      },
      variableComponents: {
        components: variableComponents,
        total: totalVariable.toFixed(2)
      },
      deductionComponents: {
        ...deductionComponents,
        total: totalDeductions.toFixed(2)
      },
      summary: {
        grossSalary: grossSalary.toFixed(2),
        totalDeductions: totalDeductions.toFixed(2),
        netSalary: netSalary.toFixed(2),
        ctc: ctc.toFixed(2),
        employerContributions: {
          pf: employerPF.toFixed(2),
          esi: employerESI.toFixed(2),
          total: (employerPF + employerESI).toFixed(2)
        }
      }
    };

    res.status(200).json({
      success: true,
      data: calculation
    });

  } catch (error) {
    console.error('Error calculating salary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate salary',
      error: error.message
    });
  }
};

// Get all salary settings for organization
exports.getsalarysettingds = async (req, res) => {
  try {
    const { colid } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'Organization ID (colid) is required'
      });
    }

    const salarySettings = await SalarySettingds.find({ colid })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: salarySettings,
      count: salarySettings.length
    });

  } catch (error) {
    console.error('Error fetching salary settings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch salary settings',
      error: error.message
    });
  }
};

// Get salary slips
exports.getsalaryslips = async (req, res) => {
  try {
    const { colid, month, year, empemail } = req.query;

    if (!colid) {
      return res.status(400).json({
        success: false,
        message: 'Organization ID is required'
      });
    }

    let query = { colid: parseInt(colid) };
    
    if (month) query.month = month;
    if (year) query.year = year;
    if (empemail) query.empemail = empemail;

    const salarySlips = await SalarySlipds.find(query)
      .sort({ year: -1, month: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: salarySlips,
      count: salarySlips.length
    });

  } catch (error) {
    console.error('Error fetching salary slips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch salary slips',
      error: error.message
    });
  }
};

// Delete salary setting
exports.deletesalarysettingds = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedSetting = await SalarySettingds.findByIdAndDelete(id);

    if (!deletedSetting) {
      return res.status(404).json({
        success: false,
        message: 'Salary setting not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Salary setting deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting salary setting:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete salary setting',
      error: error.message
    });
  }
};

// Generate salary slip with upsert functionality
exports.generateSalarySlip = async (req, res) => {
  try {
    const { 
      empname, 
      empemail, 
      month, 
      year, 
      workingDays, 
      presentDays 
    } = req.body;
    
    const { name, user, colid } = req.body;

    const salarySettings = await SalarySettingds.findOne({ 
      empemail, 
      colid 
    });

    if (!salarySettings) {
      return res.status(404).json({
        success: false,
        message: 'Salary settings not found for this employee'
      });
    }

    const absentDays = workingDays - presentDays;
    const dailySalary = parseFloat(salarySettings.grossSalary) / workingDays;
    const absentDeduction = absentDays * dailySalary;

    const attendanceRecords = await AttendanceRecordds.find({
      email: empemail,
      colid,
      date: {
        $regex: `${year}-${month.padStart(2, '0')}`
      }
    });

    const lateDays = attendanceRecords.filter(record => record.isLate).length;
    const lateDeduction = lateDays * (dailySalary * 0.1);

    const attendanceRatio = presentDays / workingDays;
    
    const proRatedFixed = {};
    Object.keys(salarySettings.fixedComponents).forEach(key => {
      proRatedFixed[key] = (parseFloat(salarySettings.fixedComponents[key]) * attendanceRatio).toFixed(2);
    });

    const proRatedVariable = salarySettings.variableComponents.map(component => ({
      componentName: component.componentName,
      amount: (parseFloat(component.amount) * attendanceRatio).toFixed(2)
    }));

    const totalFixedEarnings = Object.values(proRatedFixed).reduce((sum, val) => sum + parseFloat(val), 0);
    const totalVariableEarnings = proRatedVariable.reduce((sum, comp) => sum + parseFloat(comp.amount), 0);
    const grossEarnings = totalFixedEarnings + totalVariableEarnings;

    const totalStatutoryDeductions = Object.values(salarySettings.deductionComponents).reduce((sum, val) => sum + parseFloat(val), 0);
    const totalAttendanceDeductions = absentDeduction + lateDeduction;
    const totalDeductions = totalStatutoryDeductions + totalAttendanceDeductions;

    const netSalary = grossEarnings - totalDeductions;

    const salarySlipData = {
      name: name || 'Admin',
      user: user || empemail,
      empname,
      empemail,
      colid,
      designation: salarySettings.designation,
      month,
      year,
      workingDays,
      presentDays,
      absentDays,
      lateDays,
      
      fixedComponents: proRatedFixed,
      variableComponents: proRatedVariable,
      
      deductionComponents: salarySettings.deductionComponents,
      attendanceDeductions: {
        absentDeduction: absentDeduction.toFixed(2),
        lateDeduction: lateDeduction.toFixed(2),
        leaveDeduction: '0.00'
      },
      
      grossSalary: grossEarnings.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      netSalary: netSalary.toFixed(2),
      ctc: salarySettings.ctc,
      
      status: 'processed'
    };

    // Use upsert to update existing or create new salary slip
    const upsertedSlip = await SalarySlipds.findOneAndUpdate(
      {
        empemail: empemail,
        colid: colid,
        month: month,
        year: year
      },
      salarySlipData,
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: upsertedSlip.isNew ? 'Salary slip generated successfully' : 'Salary slip updated successfully',
      data: upsertedSlip
    });

  } catch (error) {
    console.error('Error generating salary slip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate salary slip',
      error: error.message
    });
  }
};
