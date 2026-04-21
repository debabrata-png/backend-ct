const mongoose=require('mongoose');

const mtestseenrolschema = new mongoose.Schema({
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
    testid: {
type: String
},
sessionid: {
type: String
},
student: {
type: String
},
regno: {
type: String
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
const mtestseenrol=mongoose.model('mtestseenrol',mtestseenrolschema);

module.exports=mtestseenrol;

