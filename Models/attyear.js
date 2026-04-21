const mongoose=require('mongoose');

const attyearschema = new mongoose.Schema({
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
coursecode: {
type: String
},
co: {
type: String
},
attained: {
type: Number
},
total: {
type: Number
},
pattained: {
type: Number
},
level1: {
type: Number
},
level2: {
type: Number
},
level3: {
type: Number
},
target: {
type: Number
},
fleveln: {
type: Number
},
flevel: {
type: String
},
doclink: {
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
const attyear=mongoose.model('attyear',attyearschema);

module.exports=attyear;

