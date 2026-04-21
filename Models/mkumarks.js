const mongoose=require('mongoose');

const mkumarksschema = new mongoose.Schema({
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
    department: {
type: String
},
deptcode: {
type: String
},
student: {
type: String
},
regno: {
type: String
},
exam: {
type: String
},
pubdate: {
type: Date
},
coursecode: {
type: String
},
course: {
type: String
},
credit: {
type: Number
},
maxia: {
type: Number
},
maxes: {
type: Number
},
maxtot: {
type: Number
},
marksia: {
type: Number
},
markses: {
type: Number
},
markstot: {
type: Number
},
gp: {
type: Number
},
lg: {
type: String
},
nstatus: {
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
const mkumarks=mongoose.model('mkumarks',mkumarksschema);

module.exports=mkumarks;

