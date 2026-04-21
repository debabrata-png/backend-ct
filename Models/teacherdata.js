const mongoose=require('mongoose');

const teacherdataschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    fname: {
        type: String,
        required: [true,'Please enter faculty name'],
        unique: false
    },
    department: {
        type: String,
        required: [true,'Please enter faculty department'],
        unique: false
    },
    pan: {
        type: String,
        required: [true,'Please enter faculty PAN card details'],
        unique: false
    },
    designation: {
        type: String,
        required: [true,'Please enter faculty designation'],
        unique: false
    },
    yoa: {
        type: String,
        required: [true,'Please enter faculty year of appointment'],
        unique: false
    },
    yoeinstitution: {
        type: String
    },
    type: {
        type: String,
        required: [true,'Please enter nature of appointment'],
        unique: false
    },
    yoe: {
        type: String,
        required: [true,'Please enter faculty total years of exeperience'],
        unique: false
    },
    status: {
        type: String,
        required: [true,'Please enter faculty service status'],
        unique: false
    },
    lastyear: {
        type: String,
        required: [true,'Please enter last year of service'],
        unique: false
    },

    status1: {
        type: String,
        required: [true,'Please enter the status'],
        unique: false
    },

    comments: {
        type: String,
        required: [true,'Please enter the comments'],
        unique: false
    }
})
//
const TeacherData=mongoose.model('TeacherData',teacherdataschema);

module.exports=TeacherData;

