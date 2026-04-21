const classnew = require('../Models/classnew');
const attendancenew = require('../Models/attendancenew');
const classenr1 = require('../Models/classenr1');

// Get absent students for supplementary attendance
exports.getabsentstudentsds = async (req, res) => {
  try {
    const { classid, colid } = req.query;
    
    if (!classid || !colid) {
      return res.status(400).json({ 
        success: false, 
        message: 'classid and colid are required' 
      });
    }
    
    // Get absent students (att = 0)
    const absentStudents = await attendancenew.find({ 
      classid, 
      colid: parseInt(colid),
      att: 0  // Only absent students
    }).sort({ student: 1 });
    
    res.json({ success: true, data: absentStudents });
  } catch (error) {
    console.error('Error fetching absent students:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get student's own attendance records
exports.getstudentattendanceds = async (req, res) => {
  try {
    const { colid, regno, coursecode, year, startDate, endDate } = req.query;
    
    if (!colid || !regno) {
      return res.status(400).json({ 
        success: false, 
        message: 'colid and regno are required' 
      });
    }
    
    const filter = { 
      colid: parseInt(colid),
      regno: regno,
      att: 0  // Only absent attendance
    };
    
    if (coursecode) filter.coursecode = coursecode;
    if (year) filter.year = year;
    
    // Date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      filter.classdate = {
        $gte: start,
        $lte: end
      };
    }
    const attendance = await attendancenew.find(filter).sort({ classdate: -1 });
    
    res.json({ success: true, data: attendance });
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get requested attendance for faculty review
exports.getrequestedattendanceds = async (req, res) => {
  try {
    const { classid, colid } = req.query;
    
    if (!classid || !colid) {
      return res.status(400).json({ 
        success: false, 
        message: 'classid and colid are required' 
      });
    }
    
    // Get attendance with type "Requested"
    const requestedAttendance = await attendancenew.find({ 
      classid, 
      colid: parseInt(colid),
      type: 'Requested'
    }).sort({ student: 1 });
    
    res.json({ success: true, data: requestedAttendance });
  } catch (error) {
    console.error('Error fetching requested attendance:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update attendance request (student requesting or faculty approving)
exports.updateattendancerequestds = async (req, res) => {
  try {
    const { attendanceId, type, reason, att } = req.body;
    
    if (!attendanceId) {
      return res.status(400).json({ 
        success: false, 
        message: 'attendanceId is required' 
      });
    }
    
    const updateData = {};
    if (type) updateData.type = type;
    if (reason) updateData.reason = reason;
    if (att !== undefined) updateData.att = att;
    
    const updatedAttendance = await attendancenew.findByIdAndUpdate(
      attendanceId, 
      updateData, 
      { new: true }
    );
    
    res.json({ 
      success: true, 
      message: 'Attendance updated successfully',
      data: updatedAttendance 
    });
  } catch (error) {
    console.error('Error updating attendance request:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark supplementary attendance with reason
exports.marksupplementaryattendanceds = async (req, res) => {
  try {
    const { attendanceId, reason } = req.body;
    
    if (!attendanceId || !reason) {
      return res.status(400).json({ 
        success: false, 
        message: 'attendanceId and reason are required' 
      });
    }
    
    const updatedAttendance = await attendancenew.findByIdAndUpdate(
      attendanceId, 
      { 
        att: 1,  // Mark as present
        type: 'Supplementary',
        reason: reason
      }, 
      { new: true }
    );
    
    res.json({ 
      success: true, 
      message: 'Supplementary attendance marked successfully',
      data: updatedAttendance 
    });
  } catch (error) {
    console.error('Error marking supplementary attendance:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
