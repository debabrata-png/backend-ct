const mongoose=require('mongoose');

const doc341ethicsminschema = new mongoose.Schema({
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
committee: {
type: String
},
meetingdate: {
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
const doc341ethicsmin=mongoose.model('doc341ethicsmin',doc341ethicsminschema);

module.exports=doc341ethicsmin;

