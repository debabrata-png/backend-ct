const mongoose=require('mongoose');

const ppuexistprogschema = new mongoose.Schema({
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
    department: {
type: String
},
degree: {
type: String
},
progname: {
type: String
},
prevsancstrngth: {
type: Number
},
admtdstud: {
type: Number
},
minstaprvnodate: {
type: String
},
univafflnodate: {
type: String
},
yob: {
type: Number
},
yoi: {
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
const ppuexistprog=mongoose.model('ppuexistprog',ppuexistprogschema);

module.exports=ppuexistprog;

