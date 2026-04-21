const mongoose=require('mongoose');

const rsmufeduqualifschema = new mongoose.Schema({
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
    Fact_name: {
type: String
},
mail: {
type: String
},
mob: {
type: Number
},
sslc: {
type: Date
},
hsc: {
type: Date
},
dip: {
type: Date
},
degree: {
type: String
},
ug_special: {
type: String
},
college: {
type: String
},
Yop_ug: {
type: Date
},
Percentage_UG: {
type: Number
},
Pg_special: {
type: String
},
university: {
type: String
},
Yop_pg: {
type: Date
},
Percentage_PG: {
type: Number
},
Phd_Date_Awarded: {
type: Date
},
Mphill_Date_Awarded: {
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
const rsmufeduqualif=mongoose.model('rsmufeduqualif',rsmufeduqualifschema);

module.exports=rsmufeduqualif;

