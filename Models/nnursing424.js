const mongoose=require('mongoose');

const nnursing424schema = new mongoose.Schema({
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
    facility: {
type: String
},
status: {
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
const nnursing424=mongoose.model('nnursing424',nnursing424schema);

module.exports=nnursing424;

