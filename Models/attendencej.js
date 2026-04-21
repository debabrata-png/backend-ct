const mongoose = require('mongoose');

const attendanceschema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter email']
  },
  date: {
    type: Date,
    required: [true, 'Please enter date']
  },
  checkInTime: {
    type: Date
    
  },
  checkOutTime: {
    type: Date
    
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'On Leave', 'Half Day', 'Late','Holiday'],
    default: 'Absent'
  },
  workedHours: {
    type: Number, // in hours
    default: 0
  },
  remarks: {
    type: String
  },
  colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
}, {
  timestamps: true
});

module.exports = mongoose.model('attendance', attendanceschema);
