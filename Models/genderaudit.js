const mongoose=require('mongoose');

const genderauditschema = new mongoose.Schema({
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
    student: {
type: String
},
regno: {
type: String
},
filldate: {
type: Date
},
security: {
type: String
},
common: {
type: String
},
sanitation: {
type: String
},
cctv: {
type: String
},
classroom: {
type: String
},
library: {
type: String
},
timing: {
type: String
},
daycare: {
type: String
},
medical: {
type: String
},
hostel: {
type: String
},
icc: {
type: String
},
seminar: {
type: String
},
course: {
type: String
},
icccom: {
type: String
},
discriminated: {
type: String
},
equal: {
type: String
},
grievance: {
type: String
},
safe: {
type: String
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const genderaudit=mongoose.model('genderaudit',genderauditschema);

module.exports=genderaudit;

