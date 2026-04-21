const mongoose=require('mongoose');

const nn6clubsschema = new mongoose.Schema({
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
club: {
type: String
},
clubtype: {
type: String
},
activity: {
type: String
},
actdate: {
type: Date
},
participants: {
type: Number
},
location: {
type: String
},
doclink: {
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
const nn6clubs=mongoose.model('nn6clubs',nn6clubsschema);

module.exports=nn6clubs;

