const mongoose=require('mongoose');

const serbplanschema = new mongoose.Schema({
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
    item: {
type: String
},
s1: {
type: String
},
s2: {
type: String
},
s3: {
type: String
},
s4: {
type: String
},
s5: {
type: String
},
s6: {
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
const serbplan=mongoose.model('serbplan',serbplanschema);

module.exports=serbplan;

