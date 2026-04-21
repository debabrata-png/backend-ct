const mongoose=require('mongoose');

const categorybudgetschema = new mongoose.Schema({
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
category: {
type: String
},
initialbudget: {
type: Number
},
utilized: {
type: Number
},
remaining: {
type: Number
},
type: {
type: String
},
level: {
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
const categorybudget=mongoose.model('categorybudget',categorybudgetschema);

module.exports=categorybudget;

