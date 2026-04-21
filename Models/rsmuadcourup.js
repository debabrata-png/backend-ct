const mongoose=require('mongoose');

const rsmuadcourupschema = new mongoose.Schema({
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
    department: {
type: String
},
degree: {
type: String
},
batch: {
type: String
},
introduction: {
type: Number
},
accredation: {
type: String
},
affiliation: {
type: String
},
sanctioned: {
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
const rsmuadcourup=mongoose.model('rsmuadcourup',rsmuadcourupschema);

module.exports=rsmuadcourup;

