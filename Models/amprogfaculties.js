const mongoose=require('mongoose');

const amprogfacultiesschema = new mongoose.Schema({
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
    program: {
type: String
},
programcode: {
type: String
},
faculty: {
type: String
},
dob: {
type: Date
},
doj: {
type: Date
},
designation: {
type: String
},
qualification: {
type: String
},
salary: {
type: Number
},
phdmonyr: {
type: String
},
isqualified: {
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
const amprogfaculties=mongoose.model('amprogfaculties',amprogfacultiesschema);

module.exports=amprogfaculties;

