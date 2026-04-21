const mongoose=require('mongoose');

const pauprincipalbschema = new mongoose.Schema({
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
    doj: {
type: Date
},
experience: {
type: String
},
officephn: {
type: String
},
resphn: {
type: String
},
fax: {
type: String
},
mobprsnl: {
type: String
},
email: {
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
const pauprincipalb=mongoose.model('pauprincipalb',pauprincipalbschema);

module.exports=pauprincipalb;

