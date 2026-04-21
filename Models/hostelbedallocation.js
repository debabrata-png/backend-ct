const mongoose = require("mongoose");

const bedallocationschema = new mongoose.Schema({
  buildingname: { type: String, required: true },
  roomname: { type: String, required: true },
  bednumber: { type: Number, required: true },
  regno: { type: String, required: true },
  student: {type: String},
  colid: {type: Number}
}, { timestamps: true });

const hostelbedallocation = mongoose.model("hostelbedallocation", bedallocationschema);

module.exports = hostelbedallocation;
