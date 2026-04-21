const mongoose=require('mongoose');

const classnewschema = new mongoose.Schema({
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
program: {
type: String
},
programcode: {
type: String
},
course: {
type: String
},
coursecode: {
type: String
},
semester: {
type: String
},
section: {
type: String
},
classdate: {
type: Date
},
classtime: {
type: String
},
topic: {
type: String
},
module: {
type: String
},
link: {
type: String
},
classtype: {
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
const classnew=mongoose.model('classnew',classnewschema);

module.exports=classnew;

