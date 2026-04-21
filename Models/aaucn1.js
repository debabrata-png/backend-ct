const mongoose=require('mongoose');

const aaucn1schema = new mongoose.Schema({
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
    institution: {
type: String
},
address: {
type: String
},
pincode: {
type: String
},
phone: {
type: String
},
fax: {
type: String
},
website: {
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
const aaucn1=mongoose.model('aaucn1',aaucn1schema);

module.exports=aaucn1;

