const mongoose=require('mongoose');

const libbooksschema = new mongoose.Schema({
    journal: {
        type: String,
        required: [true,'Please enter book']
    },
    edition: {
        type: String,
        required: [true,'Please enter author'],
        unique: false
    },
    accno: {
        type: String,
        required: [true,'Please enter accno'],
        unique: false
    },
    link: {
        type: String
    },
    price: {
        type: Number
    },
    purchasedate: {
        type: Date
    },
    category: {
        type: String
    },
    publisher: {
        type: String
    },
    type: {
        type: String,
        required: [true,'Please enter type'],
        unique: false
    },
    programcode: {
        type: String
    },
    semester: {
        type: String
    },
    academicyear: {
        type: String
    },
    status: {
        type: String
    },
    colid: {
        type: Number,
        required: [true,'Please enter colid']
    }
})
//
const Libbooks=mongoose.model('Libbooks',libbooksschema);

module.exports=Libbooks;

