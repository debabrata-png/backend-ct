const mongoose=require('mongoose');

const paunprincipalaschema = new mongoose.Schema({
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
    name: {
type: String
},
dob: {
type: Date
},
age: {
type: String
},
fathername: {
type: String
},
degree: {
type: String
},
course: {
type: String
},
classobt: {
type: String
},
phdtitle: {
type: String
},
address: {
type: String
},
city: {
type: String
},
district: {
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
const paunprincipala=mongoose.model('paunprincipala',paunprincipalaschema);

module.exports=paunprincipala;

