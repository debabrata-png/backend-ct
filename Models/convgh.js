const mongoose=require('mongoose');

const convghschema = new mongoose.Schema({
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
convid: {
type: String
},
convocation: {
type: String
},
guesthouse: {
type: String
},
room: {
type: String
},
roomtype: {
type: String
},
guest: {
type: String
},
clogin: {
type: String
},
checkin: {
type: Date
},
checkout: {
type: Date
},
type: {
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
const convgh=mongoose.model('convgh',convghschema);

module.exports=convgh;

