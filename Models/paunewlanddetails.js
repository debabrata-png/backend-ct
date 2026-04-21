const mongoose=require('mongoose');

const paunewlanddetailsschema = new mongoose.Schema({
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
    type: {
type: String
},
location: {
type: String
},
district: {
type: String
},
taluk: {
type: String
},
village: {
type: String
},
place: {
type: String
},
pincode: {
type: String
},
landext: {
type: String
},
docno: {
type: String
},
dol: {
type: Date
},
surveyno: {
type: String
},
extent: {
type: String
},
totalextland: {
type: String
},
totalextbuilt: {
type: String
},
deficiency: {
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
const paunewlanddetails=mongoose.model('paunewlanddetails',paunewlanddetailsschema);

module.exports=paunewlanddetails;

