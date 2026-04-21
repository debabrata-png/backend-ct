const mongoose=require('mongoose');

const acadperfschema = new mongoose.Schema({
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
programname: {
type: String
},
programcode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
marks: {
type: Number
},
semester: {
type: String
},
result: {
type: String
},
repeat: {
type: String
},
isfinal: {
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
const acadperf=mongoose.model('acadperf',acadperfschema);

module.exports=acadperf;

