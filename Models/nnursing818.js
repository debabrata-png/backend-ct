const mongoose=require('mongoose');

const nnursing818schema = new mongoose.Schema({
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
faculty: {
type: String
},
committee: {
type: String
},
tenure: {
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
const nnursing818=mongoose.model('nnursing818',nnursing818schema);

module.exports=nnursing818;

