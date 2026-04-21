const mongoose=require('mongoose');

const pauntermlanwanschema = new mongoose.Schema({
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
    course: {
type: String
},
intake: {
type: Number
},
reqnoofterm: {
type: Number
},
availnoofterm: {
type: Number
},
defnoofterm: {
type: Number
},
reqnooftermlan: {
type: Number
},
availnooftermlan: {
type: Number
},
defnooftermlan: {
type: Number
},
reqnoofprinters: {
type: Number
},
availnoofprinters: {
type: Number
},
defnoofprinters: {
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
const pauntermlanwan=mongoose.model('pauntermlanwan',pauntermlanwanschema);

module.exports=pauntermlanwan;

