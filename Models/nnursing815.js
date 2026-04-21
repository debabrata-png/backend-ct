const mongoose=require('mongoose');

const nnursing815schema = new mongoose.Schema({
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
    accreditation: {
type: String
},
status: {
type: String
},
year: {
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
const nnursing815=mongoose.model('nnursing815',nnursing815schema);

module.exports=nnursing815;

