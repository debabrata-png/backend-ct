const mongoose = require("mongoose")
const responseschema = new mongoose.Schema(
  {
    formId: { type: mongoose.Schema.Types.ObjectId, ref: "formmodel" },
    data: { type: mongoose.Schema.Types.Mixed},
    colid: {type: Number}
  },
  { timestamps: true }
);
const formresponse = mongoose.model("formresponse", responseschema);
module.exports = formresponse;