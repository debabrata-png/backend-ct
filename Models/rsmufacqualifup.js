const mongoose=require('mongoose');

const rsmufacqualifupschema = new mongoose.Schema({
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
    fname: {
type: String
},
sslcyop: {
type: Date
},
hscyop: {
type: Date
},
dipyop: {
type: Date
},
ugyop: {
type: Date
},
ugspecial: {
type: String
},
pgyop: {
type: Date
},
pgspecial: {
type: String
},
awardmphill: {
type: Date
},
awardphd: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const rsmufacqualifup=mongoose.model('rsmufacqualifup',rsmufacqualifupschema);

module.exports=rsmufacqualifup;

