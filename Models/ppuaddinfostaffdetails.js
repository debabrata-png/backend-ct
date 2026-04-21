const mongoose=require('mongoose');

const ppuaddinfostaffdetailsschema = new mongoose.Schema({
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
designation: {
type: String
},
quantity: {
type: Number
},
qualiexp: {
type: String
},
toa: {
type: String
},
payscale: {
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
const ppuaddinfostaffdetails=mongoose.model('ppuaddinfostaffdetails',ppuaddinfostaffdetailsschema);

module.exports=ppuaddinfostaffdetails;

