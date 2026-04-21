const mongoose=require('mongoose');

const doc652collabschema = new mongoose.Schema({
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
event: {
type: String
},
eventdate: {
type: Date
},
institution: {
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
const doc652collab=mongoose.model('doc652collab',doc652collabschema);

module.exports=doc652collab;

