const mongoose=require('mongoose');

const doc312sanctionschema = new mongoose.Schema({
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
faculty: {
type: String
},
project: {
type: String
},
amount: {
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
const doc312sanction=mongoose.model('doc312sanction',doc312sanctionschema);

module.exports=doc312sanction;

