const mongoose=require('mongoose');

const ppulectureroomsschema = new mongoose.Schema({
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
noofclsroom: {
type: Number
},
nooflabroom: {
type: Number
},
floorspace: {
type: String
},
reqfurniture: {
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
const ppulecturerooms=mongoose.model('ppulecturerooms',ppulectureroomsschema);

module.exports=ppulecturerooms;

