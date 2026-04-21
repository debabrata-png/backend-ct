const mongoose=require('mongoose');

const doc622egrepschema = new mongoose.Schema({
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
report: {
type: String
},
approvedby: {
type: String
},
approveddate: {
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
const doc622egrep=mongoose.model('doc622egrep',doc622egrepschema);

module.exports=doc622egrep;

