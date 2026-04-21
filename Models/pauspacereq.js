const mongoose=require('mongoose');

const pauspacereqschema = new mongoose.Schema({
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
    degree: {
type: String
},
course: {
type: String
},
labstudio: {
type: String
},
labname: {
type: String
},
arealabreq: {
type: Number
},
arealabavail: {
type: Number
},
deficiency: {
type: Number
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const pauspacereq=mongoose.model('pauspacereq',pauspacereqschema);

module.exports=pauspacereq;

