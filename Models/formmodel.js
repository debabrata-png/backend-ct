const mongoose = require("mongoose");

const fieldschema = new mongoose.Schema({ label: String, type: String });
const formschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fields: [fieldschema],
    colid: {type: Number}
  },
  { timestamps: true }
);
const formmodel = mongoose.model("formmodel", formschema);
module.exports = formmodel;