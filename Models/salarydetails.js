const mongoose=require('mongoose');

const salarydetailsschema = new mongoose.Schema({
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
    staff: {
type: String
},
staffemail: {
type: String
},
item: {
type: String
},
type: {
type: String
},
amount: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const salarydetails=mongoose.model('salarydetails',salarydetailsschema);

module.exports=salarydetails;

