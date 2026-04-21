const mongoose=require('mongoose');

const mindmapnodesschema = new mongoose.Schema({
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
    mapid: {
type: String
},
nodeid: {
type: Number
},
data: {
type: String
},
position: {
type: String
},
type: {
type: String
},
type1: {
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
const mindmapnodes=mongoose.model('mindmapnodes',mindmapnodesschema);

module.exports=mindmapnodes;

