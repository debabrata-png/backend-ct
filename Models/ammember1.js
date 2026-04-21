const mongoose=require('mongoose');

const ammember1schema = new mongoose.Schema({
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
collegeid: {
type: Number
},
college: {
type: String
},
item: {
type: String
},
compliance: {
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
const ammember1=mongoose.model('ammember1',ammember1schema);

module.exports=ammember1;

