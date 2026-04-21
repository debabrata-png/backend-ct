const mongoose=require('mongoose');

const nnursing814schema = new mongoose.Schema({
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
studentsadmitted: {
type: Number
},
immunizedno: {
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
const nnursing814=mongoose.model('nnursing814',nnursing814schema);

module.exports=nnursing814;

