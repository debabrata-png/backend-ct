const mongoose = require("mongoose");

const keiresponseSchema = new mongoose.Schema({

    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"keiquestion"
    },

    question: String,

    score: Number,

    response: String,

    name: String,

    user: String,

    colid: String

});

keiresponseSchema.index({ user:1,colid:1 });

module.exports = mongoose.model(
    "keiresponse",
    keiresponseSchema
);