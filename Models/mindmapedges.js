const mongoose=require('mongoose');

const mindmapedgesschema = new mongoose.Schema({
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
source: {
type: String
},
target: {
type: String
},
label: {
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
const mindmapedges=mongoose.model('mindmapedges',mindmapedgesschema);

module.exports=mindmapedges;

