const mongoose=require('mongoose');

const ppufdrdetailsschema = new mongoose.Schema({
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
    branch: {
type: String
},
amount: {
type: String
},
dom: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const ppufdrdetails=mongoose.model('ppufdrdetails',ppufdrdetailsschema);

module.exports=ppufdrdetails;

