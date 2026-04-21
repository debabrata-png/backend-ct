const mongoose=require('mongoose');

const wspillschema = new mongoose.Schema({
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
    loation: {
type: String
},
type: {
type: String
},
spilldetails: {
type: String
},
spilldate: {
type: Date
},
spilltime: {
type: String
},
actiontaken: {
type: String
},
status: {
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
const wspill=mongoose.model('wspill',wspillschema);

module.exports=wspill;

