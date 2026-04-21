const mongoose = require("mongoose");

const keiresponseSchema = new mongoose.Schema({

    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"keiquestion2"
    },

    category: String,

    question: String,

    score: Number,

    response: String,

    name: String,

    user: String,

    year: String,

    colid: Number

});

keiresponseSchema.index({ user:1,colid:1 });

module.exports = mongoose.model(
    "keiresponse2",
    keiresponseSchema
);