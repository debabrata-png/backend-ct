const mongoose=require('mongoose');

const ppuclgdetailsschema = new mongoose.Schema({
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
    clgnameadrs: {
type: String
},
phone: {
type: String
},
email: {
type: String
},
yoe: {
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
const ppuclgdetails=mongoose.model('ppuclgdetails',ppuclgdetailsschema);

module.exports=ppuclgdetails;

