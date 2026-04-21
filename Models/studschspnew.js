const mongoose=require('mongoose');

const studschspnewschema = new mongoose.Schema({
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
scheme: {
type: String
},
noofgovstud: {
type: String
},
amountgov: {
type: Number
},
noofinststud: {
type: String
},
amountinst: {
type: Number
},
noofngostud: {
type: Number
},
amountngo: {
type: Number
},
ngoagencyname: {
type: String
},
noofinsdustrystud: {
type: Number
},
amountindustry: {
type: Number
},
industry: {
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
const studschspnew=mongoose.model('studschspnew',studschspnewschema);

module.exports=studschspnew;

