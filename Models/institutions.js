const mongoose=require('mongoose');

const institutionschema = new mongoose.Schema({
    institutionname: {
        type: String
    },
    institutioncode: {
        type: String
    },
    name: {
        type: String
    },
    user: {
        type: String
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    type: {
        type: String
    },
    logo: {
        type: String
    },
    status: {
        type: String
    },
    comments: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    },
    admincolid: {
        type: Number,
        required: [true,'Please enter admin colid']
    }
})
//
const Institution=mongoose.model('Institution',institutionschema);

module.exports=Institution;

