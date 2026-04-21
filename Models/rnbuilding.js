const mongoose=require('mongoose');

const rnbuildingschema = new mongoose.Schema({
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
    year: {
type: String
},
type: {
type: String
},
owner: {
type: String
},
courtcase: {
type: String
},
allcourses: {
type: String
},
noofrooms: {
type: Number
},
nooflabs: {
type: Number
},
safewater: {
type: String
},
auditorium: {
type: String
},
officefacilities: {
type: String
},
seatingcapacity: {
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
const rnbuilding=mongoose.model('rnbuilding',rnbuildingschema);

module.exports=rnbuilding;

