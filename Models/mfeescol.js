const mongoose=require('mongoose');

const mfeescolschema = new mongoose.Schema({
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
programcode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
feegroup: {
type: String
},
feeitem: {
type: String
},
semester: {
type: String
},
feecategory: {
type: String
},
paydate: {
type: Date
},
amount: {
type: Number
},
paymode: {
type: String
},
payref: {
type: String
},
paystatus: {
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
const mfeescol=mongoose.model('mfeescol',mfeescolschema);

module.exports=mfeescol;

