const mongoose=require('mongoose');

const massetsschema = new mongoose.Schema({
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
assettype: {
type: String
},
asset: {
type: String
},
category: {
type: String
},
purchasedate: {
type: Date
},
vendorid: {
type: String
},
poid: {
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
const massets=mongoose.model('massets',massetsschema);

module.exports=massets;

