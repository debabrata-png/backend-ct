const mongoose=require('mongoose');

const emptravelschema = new mongoose.Schema({
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
    employee: {
type: String
},
userid: {
type: String
},
item: {
type: String
},
clientid: {
type: Number
},
client: {
type: String
},
fromdate: {
type: Date
},
todate: {
type: Date
},
mode: {
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
const emptravel=mongoose.model('emptravel',emptravelschema);

module.exports=emptravel;

