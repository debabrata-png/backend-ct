const mongoose=require('mongoose');

const examroomschema = new mongoose.Schema({
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
examcode: {
type: String
},
seatno: {
type: Number
},
roomno: {
type: String
},
roomseatno: {
type: String
},
programcode: {
type: String
},
coursecode: {
type: String
},
examdate: {
type: Date
},
student: {
type: String
},
regno: {
type: String
},
photo: {
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
const examroom=mongoose.model('examroom',examroomschema);

module.exports=examroom;

