const mongoose=require('mongoose');

const departmentschema = new mongoose.Schema({
    user: {
        type: String,
        required: [true,'Please enter email'],
        unique: false
    },
    name: {
        type: String,
        required: [true,'Please enter name']
    },
    department: {
        type: String,
        required: [true,'Please enter department']
    },
    hodname: {
        type: String,
        required: [true,'Please enter hodname']
    },
    hodemail: {
        type: String
    },
    hodphone: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Department=mongoose.model('Department',departmentschema);

module.exports=Department;

