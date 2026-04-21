const mongoose=require('mongoose');

const pautrustschema = new mongoose.Schema({
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
    hod: {
type: String
},
trustname: {
type: String
},
address: {
type: String
},
city: {
type: String
},
district: {
type: String
},
regno: {
type: String
},
dor: {
type: Date
},
chairman: {
type: String
},
father: {
type: String
},
email: {
type: String
},
mobprsnl: {
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
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const pautrust=mongoose.model('pautrust',pautrustschema);

module.exports=pautrust;

