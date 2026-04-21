const mongoose=require('mongoose');

const anmstudnewschema = new mongoose.Schema({
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
    univid: {
        type: Number
    },
    collegecode: {
type: String
},
college: {
type: String
},
coldistrict: {
type: String
},
coltype: {
type: String
},
admissionyear: {
type: String
},
photo: {
type: String
},
email: {
type: String
},
regno: {
type: String
},
rollno: {
type: String
},
student: {
type: String
},
dateofbirth: {
type: Date
},
gender: {
type: String
},
religion: {
type: String
},
category: {
type: String
},
caste: {
type: String
},
state: {
type: String
},
nationality: {
type: String
},
mobile: {
type: String
},
aadhar: {
type: String
},
blood: {
type: String
},
department: {
type: String
},
programcode: {
type: String
},
program: {
type: String
},
duration: {
type: String
},
stream: {
type: String
},
medium: {
type: String
},
shift: {
type: String
},
section: {
type: String
},
admissiondate: {
type: Date
},
joiningdate: {
type: Date
},
counselling: {
type: String
},
studstatus: {
type: String
},
admmode: {
type: String
},
lateral: {
type: String
},
father: {
type: String
},
fincome: {
type: String
},
foccu: {
type: String
},
mother: {
type: String
},
mincome: {
type: String
},
moccu: {
type: String
},
guardian: {
type: String
},
pmobile: {
type: String
},
orphan: {
type: String
},
annualinc: {
type: String
},
cardtype: {
type: String
},
cardno: {
type: String
},
diffable: {
type: String
},
diffabtype: {
type: String
},
diffpercent: {
type: String
},
udidno: {
type: String
},
firstgrad: {
type: String
},
spcat: {
type: String
},
emisno: {
type: String
},
hscboard: {
type: String
},
hscregno: {
type: String
},
language: {
type: String
},
hscmarks: {
type: Number
},
hscscholarship: {
type: String
},
lastschol: {
type: String
},
school: {
type: String
},
govtschool: {
type: String
},
tamil: {
type: String
},
address: {
type: String
},
village: {
type: String
},
studdistrict: {
type: String
},
pin: {
type: String
},
prevprog: {
type: String
},
lastyear: {
type: String
},
prevregn: {
type: String
},
prevyear: {
type: String
},
prevpercent: {
type: String
},
previnscode: {
type: String
},
previnscode: {
type: String
},
qualmode: {
type: String
},
hostel: {
type: String
},
hjoindate: {
type: String
},
hleavedate: {
type: String
},
hosteltype: {
type: String
},
bank: {
type: String
},
account: {
type: String
},
accname: {
type: String
},
acctype: {
type: String
},
ifsc: {
type: String
},
branch: {
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
const anmstudnew=mongoose.model('anmstudnew',anmstudnewschema);

module.exports=anmstudnew;

