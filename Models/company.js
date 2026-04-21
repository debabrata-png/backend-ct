const mongoose=require('mongoose');

const companyschema = new mongoose.Schema({
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
        type: String,
        required: [true,'Please enter academic year'],
        unique: false
    },
    contactname: {
        type: String,
        required: [true,'Please enter name of contact person in the company'],
        unique: false
    },
    contactdetails: {
        type: String,
        required: [true,'Please enter contact details of the contact person in the company'],
        unique: false
    },
    employername: {
        type: String,
        required: [true,'Please enter name of employer'],
        unique: false
    },
    profile: {
        type: String,
        required: [true,'Please enter profile of employer'],
        unique: false
    },
    website: {
        type: String,
        required: [true,'Please enter website of employer'],
        unique: false
    },
    empcontactdetails: {
        type: String,
        required: [true,'Please enter contact details of employer'],
        unique: false
    },
    comments: {
        type: String,
        required: [true,'Please enter comments'],
        unique: false
    }
})
//
const Company=mongoose.model('Company',companyschema);

module.exports=Company;

