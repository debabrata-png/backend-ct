const mongoose=require('mongoose');

const nluteacherdataschema = new mongoose.Schema({
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
facultyname: {
type: String
},
billdetails: {
type: String
},
capacity: {
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
const nluteacherdata=mongoose.model('nluteacherdata',nluteacherdataschema);

module.exports=nluteacherdata;

