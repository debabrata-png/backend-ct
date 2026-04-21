const mongoose=require('mongoose');

const rnphospitalsschema = new mongoose.Schema({
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
collegehospital: {
type: String
},
parenthospital: {
type: String
},
ownedby: {
type: String
},
hospitalname: {
type: String
},
location: {
type: String
},
noofbeds: {
type: Number
},
opdperday: {
type: Number
},
ipdperday: {
type: Number
},
anyother: {
type: String
},
distance: {
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
const rnphospitals=mongoose.model('rnphospitals',rnphospitalsschema);

module.exports=rnphospitals;

