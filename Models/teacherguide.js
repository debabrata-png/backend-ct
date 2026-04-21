const mongoose=require('mongoose');

const teacherguideschema = new mongoose.Schema({
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

    fname: {
        type: String,
        required: [true,'Please enter faculty name'],
        unique: false
    },
    qualification: {
        type: String,
        required: [true,'Please enter faculty qualification and year of obtaining degree'],
        unique: false
    },
    
    status: {
        type: String,
        required: [true,'Please enter status of working in the institution'],
        unique: false
    },

    year: {
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
const TeacherGuide=mongoose.model('TeacherGuide',teacherguideschema);

module.exports=TeacherGuide;

