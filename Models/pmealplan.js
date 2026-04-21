const mongoose=require('mongoose');

const pmealplanschema = new mongoose.Schema({
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
    itemgroup: {
type: String
},
item: {
type: String
},
type: {
type: String
},
category: {
type: String
},
amount: {
type: Number
},
doccomments: {
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
const pmealplan=mongoose.model('pmealplan',pmealplanschema);

module.exports=pmealplan;

