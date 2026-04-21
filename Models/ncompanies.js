const mongoose=require('mongoose');

const ncompaniesschema = new mongoose.Schema({
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
    companyname: {
type: String
},
address: {
type: String
},
country: {
type: String
},
hrname: {
type: String
},
hremail: {
type: String
},
hrphone: {
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
const ncompanies=mongoose.model('ncompanies',ncompaniesschema);

module.exports=ncompanies;

