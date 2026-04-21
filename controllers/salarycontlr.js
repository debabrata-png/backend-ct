const User = require('../Models/user');
const Attendance = require('../Models/attendencej');
const salaryledger = require('../Models/salaryledgerj.js');
const Deduction = require('../Models/deductionsj');
const ipaddress = require('../Models/ipaddressj');
const Salary = require('../Models/salaryj.js');
/*---------------------register------------------------------*/
exports.register = async (req, res) => {
  try {
    const { email, name, phone, password, role, regno, programcode,department, colid, status,
     gender, photo, expotoken, category, address, quota, user,addedby, status1, comments, 
     lastlogin, section, semester, admissionyear} = req.body;

  const newUser = await User.create({
    email,name,phone,password,role,regno,programcode,department,colid,status,gender,
    photo,expotoken,category,address,quota,user,addedby,status1,comments,lastlogin,section,semester,
    admissionyear
  });
    res.status(201).json({
      success: true,
      user: newUser
    });

  } catch (e) {
  }
  
};
//---------------------login------------------------------
exports.loginj = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("Login request body:", req.body); 
    if (!email || !password) {
      return res.status(400).json({ 
      success: false, 
      error: 'Please provide email and password' 
      });
    }
    const user = await User.findOne({ email }).select('+password');
    // Check credentials (plain text — not secure, just for demo)
    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
  // Update lastlogin (field matches your schema)
  user.lastlogin = Date.now();
  await user.save();
  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: {
    name: user.name,
    colid: user.colid,
    email: user.email,
    regno: user.regno,
    role: user.role,
      }
  });
  } 
  catch (e) {
  }
};
/*--------------ipaddress----------------*/

exports.addipj = async (req, res) => {
  try {
    const { ip, email,colid } = req.body;
    if (!ip || !email) {
    return res.status(400).json({ message: 'IP and Email  are required' });
    }
    const newIp = new ipaddress({ ip, email: email ,colid: colid});
    await newIp.save();
    res.status(201).json({ message: 'IP address created', ip: newIp });
  } catch (error) {
  }
},
exports.getallipsj = async (req, res) => {
  try {
    const ips = await ipaddress.find();
    res.status(200).json({ ips });
  } catch (error) {
  }
},

exports.getipbyemailj = async (req, res) => {
  try {
    const { email } = req.params;
    const ip = await ipaddress.findOne({email});
    if (!ip) {
      return res.status(404).json({ message: 'IP address not found' });
    }
    res.status(200).json({ ip });
  } catch (error) {
  }
};

exports.updateipj = async (req, res) => {
  try {
      const { ip, isActive } = req.body;
      if (!ip || typeof isActive !== 'boolean') {
          return res.status(400).json({ message: 'IP ID and isActive (true/false) are required' });
      }
      const updatedIp = await ipaddress.findOneAndUpdate({ ip }, { isActive }, { new: true });
      if (!updatedIp) {
          return res.status(404).json({ message: 'IP address not found' });
      }
      res.status(200).json({ message: 'IP address updated', ip: updatedIp });
  } catch (error) {
  }
};

exports.deleteipj = async (req, res) => {
  try {
      const ip = req.query?.ip;
      if (!ip) {
          return res.status(400).json({ message: 'IP is required' });
      }

      const deletedIp = await ipaddress.findOneAndDelete({ ip });
      if (!deletedIp) {
          return res.status(404).json({ message: 'IP address not found' });
      }

      res.status(200).json({ message: 'IP address deleted', ip: deletedIp });
  } catch (error) {
  }
};



/*--------------ATTENDANCE----------------*/

exports.checkinj = async (req, res) => {
  try {
    const { ip, email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email required' });
    }

    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 2️⃣ IP check
    const ipRecord = await ipaddress.findOne({ ip, email });
    if (!ipRecord) {
      return res.status(403).json({ success: false, message: 'IP address not found for this user' });
    }

    // 3️⃣ Check today's attendance
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const alreadyCheckedIn = await Attendance.findOne({
      email,
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    if (alreadyCheckedIn) {
      return res.status(200).json({
        success: true,
        message: 'Already checked in today',
        status: 'checked_in',
        attendance: alreadyCheckedIn
      });
    }

    // 4️⃣ Check-in logic without deduction
    const now = new Date();
    const checkInLimit = new Date(startOfDay);
    checkInLimit.setHours(8, 30, 0, 0); // official check-in time

    let status = 'Present';
    let remarks = '';
    let remainingLeave = user.remainingLeave || 0;

    if (now > new Date(checkInLimit.getTime() + 15 * 60 * 1000)) {
      status = 'Half Day';
      remarks = 'Late check-in: half-day leave or salary deduction may apply';
    }

    // Save updated leave balance (if leave applied)
    user.remainingLeave = remainingLeave;
    await user.save();

    // Save attendance
    const attendance = new Attendance({
      email,
      date: startOfDay,
      checkInTime: now,
      status,
      workedHours: 0,
      remarks,
      colid: user.colid
    });
    await attendance.save();

    res.status(200).json({
      success: true,
      message: 'Check-in recorded',
      status: 'checked_in',
      attendance
    });

  } catch (error) {
  }
};
//------------------get the ip address of the user------------------//
exports.getipj = async (req, res) => {
  try {
    let ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "Unknown";
  
  // Convert IPv6 localhost (::1) to IPv4 (127.0.0.1)
  if (ip === "::1") ip = "127.0.0.1";

  // Clean "::ffff:" prefix (IPv4 mapped IPv6)
  ip = ip.replace(/^::ffff:/, "");

  // Remove port if present (Azure case: 106.196.6.38:49838)
  if (ip.includes(":") && !ip.startsWith("::")) {
    ip = ip.split(":")[0];
  }
  //console.log("Client IP:", ip);
  
res.json({ ip });
  } catch (error) {
  }
}


exports.checkoutj = async (req, res) => {
  try {
    const { email, ip } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email required' });
    }
    // 1️ Validate user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // 2️ Validate IP (optional: only if stored in user)
     // 2️ IP check with IP model
    const ipRecord = await ipaddress.findOne({ ip, email }); // Or match with colid if needed
    if (!ipRecord) {
      return res.status(403).json({
        success: false,
        message: ' IP address not found for this user'
      });
    }
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    // 3 Find today's attendance
    let attendance = await Attendance.findOne({ email, date: startOfDay });
    if (!attendance || !attendance.checkInTime) {
      return res.status(400).json({ success: false, message: 'Not checked in today' });
    }
    if (attendance.checkOutTime) {
      return res.status(400).json({ success: false, message: 'Already checked out today' });
    }
    // 4️ Record check-out
    const now = new Date();
    attendance.checkOutTime = now;
    attendance.checkOutIP = ip;
    // 5️ Calculate worked hours
    const workedMs = now - new Date(attendance.checkInTime);
    attendance.workedHours = Math.round(workedMs / (1000 * 60 * 60) * 100) / 100; // hours with 2 decimals
    await attendance.save();
    res.status(200).json({
      success: true,
      message: 'Check-out recorded',
      attendance
    });
  } catch (error) {
  }
};
  exports.getallattendancesj = async (req, res) => {
    try {
      const reports = await Attendance.find();
      res.status(200).json({ reports });
    } catch (error) {
    }
  };
exports.getattendancestatusj= async (req, res) => {// status on_checkin always*
  try {
    // Accept from query params or body
    const email = (req.query.email || req.body.email || '').trim();
    const ip = (req.query.ip || req.body.ip || '').trim();

    if (!email || !ip) {
      return res.status(400).json({ message: 'Email and IP address are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Normalize to start of day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance for that user + IP
    const attendance = await Attendance.findOne({ email: user.email, ip, date: today });
    
    if (!attendance) {
      return res.json({ status: 'no_checkin' });
    } else if (!attendance.checkOutTime) {
      return res.json({
        status: 'checked_in',
        checkInTime: attendance.checkInTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      });
    } else {
      return res.json({
        status: 'checked_out',
        checkOutTime: attendance.checkOutTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      });
    }
  } catch (error) {

  }
};

exports.getattendancebyemailj = async (req, res) => {
  try {
    // Try to read from query first, then from body
    let email = req.query.email || req.body.email;
    if (!email) {
      return res.status(400).json({ message: "Email query or body parameter is required" });
    }
    // Trim spaces
    email = email.trim();
    //console.log("Searching for email:", email);
    // Case-insensitive exact match
    const attendance = await Attendance.find({
      email: { $regex: new RegExp(`^${email}$`, "i") }
    });
    //console.log("Query result:", attendance);
    res.status(200).json({ attendance });
  } catch (error) {
  }
};
// ---------------------
// Add Salary
// ---------------------
exports.addsalaryj = async (req, res) => {
  try {
    const salary = await Salary.create(req.body);
    res.status(201).json(salary);
  } catch (e) {
  }
};

// ---------------------
// Get All Salaries
// ---------------------
exports.getsalariesj = async (req, res) => {
  try {
    const salaries = await Salary.find().lean();
    res.json(salaries);
  } catch (e) {
  }
};

// ---------------------
// Get Salary by Email (using query)
// ---------------------
exports.getsalarybyemailj = async (req, res) => {
  try {
    const email = req.query.email || req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email query parameter is required" });
    }

    const salary = await Salary.findOne({ email });

    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }

    res.json(salary);
  } catch (e) {
  }
};
// ---------------------
// Update Salary
// ---------------------
exports.updatesalaryj = async (req, res) => {
  try {
    // First try query param, fallback to body
    const email = req.query.email || req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required (in query or body)" });
    }

    // Remove email from body so it doesn't overwrite
    const updateData = { ...req.body };
    delete updateData.email;

    const salary = await Salary.findOneAndUpdate({ email }, updateData, { new: true });

    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }

    res.json(salary);
  } catch (e) {
  }
};

// ---------------------
// Delete Salary
// ---------------------
exports.deletesalaryj = async (req, res) => {
  try {
    const { email } = req.params;
    const salary = await Salary.findOneAndDelete({ email });
    if (!salary) {
      return res.status(404).json({ message: "Salary not found" });
    }
    res.json({ message: "Salary deleted", salary });
  } catch (e) {
  }
};


//----------------------
// Deductions
//----------------------
// Add a new deduction

exports.adddeductionj = async (req, res) => {
  try {
    const deduction = await Deduction.create(req.body);
    res.status(201).json(deduction);
  } catch (e) {
  }
};
// Get all deductions
exports.getalldeductionsj = async (req, res) => {
  try {
    const deductions = await Deduction.find().lean();
    res.json(deductions);
  } catch (e) {
  }
};
//get deduction by email
exports.getdeductionbyemailj = async (req, res) => {
  try {
    const email = (req.query.email || req.body.email || "").toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const deductions = await Deduction.find({ email });

    if (!deductions || deductions.length === 0) {
      return res.status(404).json({ message: "No deductions found" });
    }

    res.json({ deductions });
  } catch (e) {
  }
};

// Update a deduction
exports.updatedeductionj = async (req, res) => {
  try {
    const { email } = req.params;
    const deduction = await Deduction.findOneAndUpdate({email}, req.body, { new: true });
    if (!deduction) {
      return res.status(404).json({ message: "Deduction not found" });
    }
    res.json(deduction);
  } catch (e) {
  }
};
// Delete a deduction
exports.deletedeductionj = async (req, res) => {
  try {
    const { email } = req.params|| req.body.email;
    const deduction = await Deduction.findOneAndDelete({email});
    if (!deduction) {
      return res.status(404).json({ message: "Deduction not found" });
    }
    res.json({ message: "Deduction deleted", deduction });
  } catch (e) {
  }
};


// ---------------------
// Calculate Salary & Generate Slip
// ---------------------

exports.calculatesalaryandslipj = async (req, res) => {
  try {
    const { email, month, year } = req.body;

    if (!email || !month || !year) {
      return res.status(400).json({ message: "email, month, and year are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const salaryData = await Salary.findOne({ email, month, year });
    if (!salaryData) {
      return res.status(404).json({ message: "No salary record found for this month/year" });
    }

    const baseSalary = salaryData.basicPay || 0;
    const allowances = salaryData.allowances || 0;
    const bonus = salaryData.transactionType === "bonus" ? (salaryData.amount || 0) : 0;
    const deductionReasons = [];
    const companyDeductionsList = await Deduction.find({ email: email /*, add month/year if relevant*/ });
    const companyDeductions = companyDeductionsList.reduce((sum, d) => sum + d.deductionAmount, 0);

    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);

    const attendance = await Attendance.find({
      email,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });

    const totalWorkingDays = 22;
    const dailyRate = baseSalary / totalWorkingDays;

    const attendanceDeductions = attendance.reduce((total, day) => {
      if (day.status === "Absent") {
        deductionReasons.push(`Absent on ${day.date.toLocaleDateString()}`);
        return total + dailyRate;
      }
      if (day.status === "Half Day") {
        deductionReasons.push(`Half Day on ${day.date.toLocaleDateString()}`);
        return total + dailyRate / 2;
      }
      return total;
    }, 0);

    const grossSalary = baseSalary + allowances;
    const otherDeductions =companyDeductions + salaryData.deductions || 0;
    const totalDeductions = attendanceDeductions + otherDeductions;
    const netSalary = grossSalary + bonus - totalDeductions;

    if (otherDeductions > 0) {
      deductionReasons.push(`Other deductions recorded: ₹${otherDeductions}`);
    }

    // Save in ledger
    await salaryledger.create({
      name: user.name,
      email,
      month,
      year,
      basicPay: baseSalary,
      allowances,
      bonus,
      grossSalary,
      attendanceDeductions,
      otherDeductions,
      totalDeductions,
      netSalary,
      deductionReasons,
    });

    // Return JSON only (no PDF here)
    res.json({
      message: "Salary calculated successfully",
      employee: {
        name: user.name,
        email: user.email,
        designation: user.designation || "N/A"
      },
      salary: {
        basicPay: baseSalary,
        allowances,
        bonus,
        grossSalary,
        deductions: totalDeductions,
        deductionReasons,
        netSalary,
      }
    });

  } catch (error) {
  }
};
