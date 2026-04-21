const mongoose=require('mongoose');

const nvworkorderschema = new mongoose.Schema({
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
    vendor: {
type: String
},
workorder: {
type: String
},
workorderid: {
type: String
},
details: {
type: String
},
duedate: {
type: Date
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
const nvworkorder=mongoose.model('nvworkorder',nvworkorderschema);

module.exports=nvworkorder;

