const mongoose=require('mongoose');

const amchemicalsschema = new mongoose.Schema({
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
    subject: {
type: String
},
type: {
type: String
},
chemical: {
type: String
},
lab: {
type: String
},
total: {
type: Number
},
purchasedate: {
type: Date
},
ifexcess: {
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
const amchemicals=mongoose.model('amchemicals',amchemicalsschema);

module.exports=amchemicals;

