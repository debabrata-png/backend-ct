const mongoose=require('mongoose');

const paunewidetailsschema = new mongoose.Schema({
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
    college: {
type: String
},
address: {
type: String
},
pincode: {
type: String
},
year: {
type: String
},
insttype: {
type: String
},
category: {
type: String
},
clgtype: {
type: String
},
ifauto: {
type: String
},
isfunct: {
type: String
},
mobile: {
type: String
},
landline: {
type: String
},
other: {
type: String
},
fax: {
type: String
},
email: {
type: String
},
website: {
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
const paunewidetails=mongoose.model('paunewidetails',paunewidetailsschema);

module.exports=paunewidetails;

