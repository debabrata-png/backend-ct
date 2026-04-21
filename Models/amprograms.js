const mongoose=require('mongoose');

const amprogramsschema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
nature: {
type: String
},
subject: {
type: String
},
fees: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const amprograms=mongoose.model('amprograms',amprogramsschema);

module.exports=amprograms;

