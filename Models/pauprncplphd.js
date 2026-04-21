const mongoose=require('mongoose');

const pauprncplphdschema = new mongoose.Schema({
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
    principal: {
type: String
},
mobprsnl: {
type: String
},
email: {
type: String
},
sname: {
type: String
},
sregno: {
type: String
},
university: {
type: String
},
yor: {
type: String
},
yod: {
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
const pauprncplphd=mongoose.model('pauprncplphd',pauprncplphdschema);

module.exports=pauprncplphd;

