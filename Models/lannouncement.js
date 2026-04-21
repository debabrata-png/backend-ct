const mongoose=require('mongoose');

const lannouncementschema = new mongoose.Schema({
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
coursecode: {
type: String
},
coursename: {
type: String
},
announcement: {
type: String
},
dateposted: {
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
const lannouncement=mongoose.model('lannouncement',lannouncementschema);

module.exports=lannouncement;

