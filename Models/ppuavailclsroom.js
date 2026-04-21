const mongoose=require('mongoose');

const ppuavailclsroomschema = new mongoose.Schema({
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
    ifroomavl: {
type: String
},
planroom: {
type: String
},
floorspcefurn: {
type: String
},
funds: {
type: String
},
reason: {
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
const ppuavailclsroom=mongoose.model('ppuavailclsroom',ppuavailclsroomschema);

module.exports=ppuavailclsroom;

