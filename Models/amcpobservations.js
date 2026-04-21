const mongoose=require('mongoose');

const amcpobservationsschema = new mongoose.Schema({
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
    collegeid: {
type: Number
},
college: {
type: String
},
year: {
type: String
},
program: {
type: String
},
fiveyear: {
type: String
},
qualification: {
type: String
},
classrooms: {
type: String
},
laboratory: {
type: String
},
labequipments: {
type: String
},
labbooks: {
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
const amcpobservations=mongoose.model('amcpobservations',amcpobservationsschema);

module.exports=amcpobservations;

