const mongoose=require('mongoose');

const pstatusnewschema = new mongoose.Schema({
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
    client: {
type: String
},
criteria: {
type: String
},
metric: {
type: String
},
documents: {
type: String
},
providedby: {
type: String
},
docstatus: {
type: String
},
remarks: {
type: String
},
updatedate: {
type: Date
},
link: {
type: String
},
owner: {
type: String
},
email: {
type: String
},
phone: {
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
const pstatusnew=mongoose.model('pstatusnew',pstatusnewschema);

module.exports=pstatusnew;

