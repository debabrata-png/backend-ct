const mongoose=require('mongoose');

const paumngdeclarationschema = new mongoose.Schema({
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
    declaration: {
type: String
},
place: {
type: String
},
dos: {
type: Date
},
status1: {
        type: String
    },
    comments: {
        type: String
    }
})
//
const paumngdeclaration=mongoose.model('paumngdeclaration',paumngdeclarationschema);

module.exports=paumngdeclaration;

