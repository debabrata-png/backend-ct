const classnew = require('../Models/classnew');
const attendancenew = require('../Models/attendancenew');
const classenr1 = require('../Models/classenr1');
const User = require('../Models/user');

// Get all classes with filters (without date restriction)
exports.getallclasses = async (req, res) => {
  try {
    const { colid, programcode, coursecode, year, semester, section } = req.query;
    const filter = {};
    
    if (colid) filter.colid = parseInt(colid);
    if (programcode) filter.programcode = programcode;
    if (coursecode) filter.coursecode = coursecode;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (section) filter.section = section;
    
    const classes = await classnew.find(filter).sort({ classdate: -1 });
    res.json(classes);
  } catch (error) {
  }
};

// Get classes by date range (FIXED)
exports.getclassesbydate = async (req, res) => {
  try {
    const { colid, startDate, endDate, programcode, coursecode, year, semester, section } = req.query;
    
    const filter = { colid: parseInt(colid) };
    
    // Apply other filters
    if (programcode) filter.programcode = programcode;
    if (coursecode) filter.coursecode = coursecode;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (section) filter.section = section;
    
    // Apply date range filter - THIS WAS THE BUG
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Set end date to end of day for single date selection
      end.setHours(23, 59, 59, 999);
      
      filter.classdate = {
        $gte: start,
        $lte: end
      };
    }
    
    const classes = await classnew.find(filter).sort({ classdate: -1, classtime: 1 });
    
    console.log("Classes found:", classes.length); // Debug log
    
    res.json(classes);
  } catch (error) {}
};
// Create new class
exports.createclass = async (req, res) => {
  try {
    const classData = await classnew.create(req.body);
    res.status(201).json({ success: true, data: classData });
  } catch (error) {
  }
};

// Update class
exports.updateclass = async (req, res) => {
  try {
    const { id } = req.query;
    const updatedClass = await classnew.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedClass);
  } catch (error) {
  }
};

// Delete class
exports.deleteclass = async (req, res) => {
  try {
    const { id } = req.query;
    await classnew.findByIdAndDelete(id);
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
  }
};

// Get single class details
exports.getsingleclass = async (req, res) => {
  try {
    const { id } = req.query;
    const classData = await classnew.findById(id);
    res.json(classData);
  } catch (error) {
  }
};

// Get enrolled students by class criteria
exports.getenrolledstudentsbyclass = async (req, res) => {
  try {
    const { colid, programcode, coursecode, year, semester } = req.query;
    
    const filter = {
      colid: parseInt(colid),
      active: "Yes"
    };
    
    if (programcode) filter.programcode = programcode;
    if (coursecode) filter.coursecode = coursecode;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    
    const students = await classenr1.find(filter).sort({ student: 1 });
    res.json(students);
  } catch (error) {
  }
};

// Create enrollment
exports.createenrollment = async (req, res) => {
  try {
    const enrollmentData = await classenr1.create(req.body);
    res.status(201).json({ success: true, data: enrollmentData });
  } catch (error) {
  }
};

exports.markclassattendance = async (req, res) => {
  try {
    const { classid, attendanceList } = req.body;
    const promises = attendanceList.map(async (attendance) => {
      
      // Create unique filter including date
      const filter = {
        colid: parseInt(attendance.colid),
        classid: classid,
        regno: attendance.regno,
        classdate: new Date(attendance.classdate) // Ensure proper date format
      };
      
      return attendancenew.findOneAndUpdate(filter, attendance, { 
        new: true, 
        upsert: true 
      });
    });

    const results = await Promise.all(promises);
    
    res.status(201).json({ 
      success: true, 
      count: results.length,
      message: `Attendance recorded for ${results.length} students` 
    });
  } catch (error) {
  }
};


// Get attendance for a specific class
exports.getattendancebyclass = async (req, res) => {
  try {
    const { classid, colid } = req.query;
    const attendance = await attendancenew.find({ 
      classid, 
      colid: parseInt(colid) 
    });
    res.json(attendance);
  } catch (error) {
  }
};

exports.searchstudentbyregno = async (req, res) => {
  try {
    const { regno, colid } = req.query;
    const student = await User.findOne({ regno: regno.trim(), colid: parseInt(colid) });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    return res.status(200).json({ success: true, data: student });
  } catch (err) {    
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.password !== password) return res.status(401).json({ message: 'Incorrect password' });
    const { colid, name, email: userEmail, regno, role } = user;
    res.json({ colid, name, email: userEmail, regno, role });
  } catch (e) {
  }
};