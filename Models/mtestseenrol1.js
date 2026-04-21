const mongoose=require('mongoose');

const mtestseenrol1schema = new mongoose.Schema({
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
test: {
type: String
},
sessionslot: {
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
const mtestseenrol1=mongoose.model('mtestseenrol1',mtestseenrol1schema);

module.exports=mtestseenrol1;

