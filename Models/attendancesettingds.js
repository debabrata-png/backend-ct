const mongoose = require('mongoose');

const attendanceSettingSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  colid: { 
    type: Number, 
    required: true,
    unique: true 
  },
  officeStartTime: { 
    type: String, 
    default: '09:00' 
  },
  officeEndTime: { 
    type: String, 
    default: '18:00' 
  },
  gracePeriodMinutes: { 
    type: Number, 
    default: 15 
  },
  halfDayHours: { 
    type: String, 
    default: '4' 
  },
  autoDeductLeave: { 
    type: Boolean, 
    default: true 
  },
  deductSalaryIfNoLeave: { 
    type: Boolean, 
    default: true 
  },
  dailyDeductionAmount: { 
    type: String, 
    default: '1666.67' 
  },
  halfDayDeductionAmount: {
    type: String,
    default: '833.33'
  }
}, { timestamps: true });

const AttendanceSettingds = mongoose.model('attendancesettingds', attendanceSettingSchema);
module.exports = AttendanceSettingds;
