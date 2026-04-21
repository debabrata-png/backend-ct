const mongoose=require('mongoose');

const nenrollmentschema = new mongoose.Schema({
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
    item: {
type: String
},
firstyear: {
type: Number
},
secondyear: {
type: Number
},
thirdyear: {
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
const nenrollment=mongoose.model('nenrollment',nenrollmentschema);

module.exports=nenrollment;

