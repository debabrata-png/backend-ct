const mongoose=require('mongoose');

const doc514awarenessschema = new mongoose.Schema({
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
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const doc514awareness=mongoose.model('doc514awareness',doc514awarenessschema);

module.exports=doc514awareness;

