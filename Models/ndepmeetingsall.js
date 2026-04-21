const mongoose=require('mongoose');

const ndepmeetingsallschema = new mongoose.Schema({
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
    department: {
type: String
},
year: {
type: String
},
host: {
type: String
},
hostemail: {
type: String
},
hostphone: {
type: String
},
meetingdate: {
type: Date
},
details: {
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
const ndepmeetingsall=mongoose.model('ndepmeetingsall',ndepmeetingsallschema);

module.exports=ndepmeetingsall;

