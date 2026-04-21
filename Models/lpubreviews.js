const mongoose=require('mongoose');

const lpubreviewsschema = new mongoose.Schema({
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
    articleid: {
type: String
},
peer: {
type: String
},
designation: {
type: String
},
rcomments: {
type: String
},
submitdate: {
type: String
},
peertye: {
type: String
},
commenttype: {
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
const lpubreviews=mongoose.model('lpubreviews',lpubreviewsschema);

module.exports=lpubreviews;

