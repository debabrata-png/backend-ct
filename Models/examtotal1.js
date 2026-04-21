const mongoose=require('mongoose');

const examtotal1schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    user: {
        type: String,
        required: [true,'Please enter user'],
        unique: false
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    year: {
type: String
},
examcode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
program: {
type: String
},
programcode: {
type: String
},
course: {
type: String
},
coursecode: {
type: String
},
semester: {
type: String
},
credits: {
type: Number
},
intmarks: {
type: Number
},
extmarks: {
type: Number
},
totalmarks: {
type: Number
},
grade: {
type: String,
enum: ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F', 'Ab']
},
result: {
type: String,
enum: ['Pass', 'Fail', 'Absent']
},
type: {
type: String
},
level: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
}, {
    timestamps: true
}
)
//


// ✅ TOTAL + GRADE + RESULT LOGIC
examtotal1schema.pre('save', function (next) {

    // 1. Total calculation
    this.totalmarks = (this.intmarks || 0) + (this.extmarks || 0);

    // 2. Handle Absent case
    if (this.result === 'Absent') {
        this.grade = 'Ab';
        this.gradepoint = 0;
        return next();
    }

    const total = this.totalmarks;

    // 3. Grade calculation (UGC CBCS)
    if (total >= 90) {
        this.grade = 'O';
        this.gradepoint = 10;
        this.result = 'Pass';
    } else if (total >= 80) {
        this.grade = 'A+';
        this.gradepoint = 9;
        this.result = 'Pass';
    } else if (total >= 70) {
        this.grade = 'A';
        this.gradepoint = 8;
        this.result = 'Pass';
    } else if (total >= 60) {
        this.grade = 'B+';
        this.gradepoint = 7;
        this.result = 'Pass';
    } else if (total >= 50) {
        this.grade = 'B';
        this.gradepoint = 6;
        this.result = 'Pass';
    } else if (total >= 45) {
        this.grade = 'C';
        this.gradepoint = 5;
        this.result = 'Pass';
    } else if (total >= 40) {
        this.grade = 'P';
        this.gradepoint = 4;
        this.result = 'Pass';
    } else {
        this.grade = 'F';
        this.gradepoint = 0;
        this.result = 'Fail';
    }

    next();
});


const examtotal1=mongoose.model('examtotal1',examtotal1schema);

module.exports=examtotal1;

