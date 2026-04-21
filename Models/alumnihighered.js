const mongoose=require('mongoose');

const alumnihigheredschema = new mongoose.Schema({
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
    institute: {
type: String
},
doj: {
type: String
},
hprogram: {
type: String
},
hregno: {
type: String
},
dol: {
type: String
},
instaddress: {
type: String
},
instcountry: {
type: String
},
programname: {
type: String
},
batch: {
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
const alumnihighered=mongoose.model('alumnihighered',alumnihigheredschema);

module.exports=alumnihighered;

