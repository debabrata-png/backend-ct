const mongoose=require('mongoose');

const tbcolumnsallschema = new mongoose.Schema({
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
    tbl: {
type: String
},
fields: {
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
const tbcolumnsall=mongoose.model('tbcolumnsall',tbcolumnsallschema);

module.exports=tbcolumnsall;

