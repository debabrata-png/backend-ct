const mongoose=require('mongoose');

const nnursing515schema = new mongoose.Schema({
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
guidelines: {
type: String
},
committee: {
type: String
},
meetings: {
type: String
},
actiontaken: {
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
const nnursing515=mongoose.model('nnursing515',nnursing515schema);

module.exports=nnursing515;

