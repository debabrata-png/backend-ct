const mongoose=require('mongoose');

const seedaddschema = new mongoose.Schema({
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
    faculty: {
type: String
},
project: {
type: String
},
year: {
type: String
},
disbursed: {
type: Number
},
sanctioned: {
type: Number
},
manpower: {
type: Number
},
equipments: {
type: Number
},
consumables: {
type: Number
},
contingency: {
type: Number
},
purchased: {
type: String
},
refno: {
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
const seedadd=mongoose.model('seedadd',seedaddschema);

module.exports=seedadd;

