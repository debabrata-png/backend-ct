const mongoose=require('mongoose');

const ppuheaddetailsschema = new mongoose.Schema({
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
    headname: {
type: String
},
designation: {
type: String
},
emailphone: {
type: String
},
address: {
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
const ppuheaddetails=mongoose.model('ppuheaddetails',ppuheaddetailsschema);

module.exports=ppuheaddetails;

