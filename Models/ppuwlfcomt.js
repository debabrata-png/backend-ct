const mongoose=require('mongoose');

const ppuwlfcomtschema = new mongoose.Schema({
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
    isfunct: {
type: String
},
normsavl: {
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
const ppuwlfcomt=mongoose.model('ppuwlfcomt',ppuwlfcomtschema);

module.exports=ppuwlfcomt;

