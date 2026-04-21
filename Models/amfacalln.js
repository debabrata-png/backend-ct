const mongoose=require('mongoose');

const amfacallnschema = new mongoose.Schema({
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
    facid: {
type: Number
},
inscode: {
type: Number
},
institution: {
type: String
},
faculty: {
type: String
},
designation: {
type: String
},
department: {
type: String
},
qualification: {
type: String
},
mphildate: {
type: Date
},
phddate: {
type: Date
},
netdate: {
type: Date
},
eligdate: {
type: Date
},
dateofbirth: {
type: Date
},
type: {
type: String
},
tservicedate: {
type: Date
},
regservicedate: {
type: Date
},
dstaffdate: {
type: Date
},
pinsdate: {
type: Date
},
ifqualaff: {
type: String
},
ifpg: {
type: String
},
ugteaching: {
type: Number
},
pgteaching: {
type: Number
},
email: {
type: String
},
mobile: {
type: String
},
retirementdate: {
type: Date
},
account: {
type: Number
},
bank: {
type: String
},
branch: {
type: String
},
ifsc: {
type: String
},
pan: {
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
const amfacalln=mongoose.model('amfacalln',amfacallnschema);

module.exports=amfacalln;

