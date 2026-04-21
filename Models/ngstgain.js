const mongoose=require('mongoose');

const ngstgainschema = new mongoose.Schema({
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
client: {
type: String
},
amount: {
type: Number
},
gst: {
type: Number
},
total: {
type: Number
},
paydate: {
type: Date
},
bank: {
type: String
},
refno: {
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
const ngstgain=mongoose.model('ngstgain',ngstgainschema);

module.exports=ngstgain;

