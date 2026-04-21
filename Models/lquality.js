const mongoose=require('mongoose');

const lqualityschema = new mongoose.Schema({
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
auditaction: {
type: String
},
conference: {
type: String
},
instnameact: {
type: String
},
orientact: {
type: String
},
partstatus: {
type: String
},
other: {
type: String
},
disableaudit: {
type: String
},
scholarname: {
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
const lquality=mongoose.model('lquality',lqualityschema);

module.exports=lquality;

