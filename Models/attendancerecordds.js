const mongoose = require('mongoose');
const leavebalanceds1 = require('./leavebalanceds1');

const attendanceRecordSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  colid: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Present', 'Absent', 'Late', 'Half Day'],
    required: true 
  },
  ipAddress: { 
    type: String, 
    default: null 
  },
  checkInTime: { 
    type: String, 
    default: null 
  },
  checkOutTime: { 
    type: String, 
    default: null 
  },
  workingHours: { 
    type: String, 
    default: '0' 
  },
  isLate: { 
    type: Boolean, 
    default: false 
  },
  gracePeriodMissed: {
    type: Boolean,
    default: false
  },
  leaveDeducted: { 
    type: String, 
    default: '0' 
  },
  salaryDeducted: { 
    type: String, 
    default: '0' 
  },
  deductionType: {
    type: String,
    enum: ['none', 'half_day_leave', 'half_day_salary'],
    default: 'none'
  }
}, { timestamps: true });

// Pre-save hook to handle grace period and deduction logic
attendanceRecordSchema.pre('save', async function(next) {
  if (this.isLate && this.gracePeriodMissed) {
    const currentYear = new Date().getFullYear().toString();
    
    // Check if employee has available half-day leave
    const leaveBalance = await leavebalanceds1.findOne({
      email: this.email,
      colid: this.colid,
      year: currentYear,
      leaveType: 'Casual Leave'
    });

    if (leaveBalance && leaveBalance.remaining >= 0.5) {
      // Deduct half day leave
      leaveBalance.used += 0.5;
      leaveBalance.remaining -= 0.5;
      await leaveBalance.save();
      
      this.leaveDeducted = '0.5';
      this.deductionType = 'half_day_leave';
    } else {
      // Deduct half day salary
      const halfDayAmount = '833.33';
      this.salaryDeducted = halfDayAmount;
      this.deductionType = 'half_day_salary';
    }
  }
  next();
});

const AttendanceRecordds = mongoose.model('attendancerecordds', attendanceRecordSchema);
module.exports = AttendanceRecordds;
