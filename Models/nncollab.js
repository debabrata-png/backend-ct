const mongoose=require('mongoose');

const nncollabschema = new mongoose.Schema({
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
title: {
type: String
},
agency: {
type: String
},
participants: {
type: String
},
financesource: {
type: String
},
duration: {
type: String
},
activitynature: {
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
const nncollab=mongoose.model('nncollab',nncollabschema);

module.exports=nncollab;

