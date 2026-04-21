const mongoose=require('mongoose');

const tfieldsschema = new mongoose.Schema({
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
    tbl: {
type: String
},
tfield: {
type: String
},
type: {
type: String
},
example: {
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
const tfields=mongoose.model('tfields',tfieldsschema);

module.exports=tfields;

