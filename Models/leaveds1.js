const mongoose = require("mongoose");

const leaveappschema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    reason: { type: String },
    leavetype: { type: String },
    from: { type: Date },
    to: { type: Date },
    
    // ADD THIS FIELD
    days: { type: Number, default: 0 },
    
    // Support for half-day leaves
    isHalfDay: { type: Boolean, default: false },
    halfDayPeriod: { 
        type: String, 
        enum: ['morning', 'afternoon'],
        required: function() { return this.isHalfDay; }
    },
    
    currentLevel: { type: Number, enum: [1, 2], default: 1 },
    approvals: [{
        level: { type: Number },
        approvername: { type: String },
        approveremail: { type: String },
        action: { type: String, enum: ['Approved', 'Rejected'] },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    leavestatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    colid: { type: Number }
}, {timestamps: true});

// ADD THIS PRE-SAVE HOOK TO AUTO-CALCULATE DAYS
leaveappschema.pre('save', function(next) {
    if (this.from && this.to) {
        const fromDate = new Date(this.from);
        const toDate = new Date(this.to);
        
        // Calculate difference in milliseconds
        const diffTime = toDate.getTime() - fromDate.getTime();
        
        // Convert to days and add 1 to include both start and end dates
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        // Handle half-day leaves
        if (this.isHalfDay && fromDate.getTime() === toDate.getTime()) {
            diffDays = 0.5;
        }
        
        this.days = diffDays > 0 ? diffDays : 0;
    }
    next();
});

const leaveds1 = mongoose.model("leaveds1", leaveappschema);
module.exports = leaveds1;
