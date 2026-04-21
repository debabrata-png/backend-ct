const mongoose=require('mongoose');

const nnursing812schema = new mongoose.Schema({
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
    teacher: {
type: String
},
degreeyear: {
type: String
},
institution: {
type: String
},
yearofjoining: {
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
const nnursing812=mongoose.model('nnursing812',nnursing812schema);

module.exports=nnursing812;

