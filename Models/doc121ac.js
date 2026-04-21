const mongoose=require('mongoose');

const doc121acschema = new mongoose.Schema({
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
    mdata: {
type: Date
},
meeting: {
type: String
},
members: {
type: String
},
year: {
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
const doc121ac=mongoose.model('doc121ac',doc121acschema);

module.exports=doc121ac;

