const mongoose = require("mongoose");

const conductExamRoomSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  campus: { type: String, required: true, trim: true },
  building: { type: String, required: true, trim: true },
  room: { type: String, required: true, trim: true },
  noofseats: { type: Number, required: true, min: 0 },
  user: { type: String, trim: true }
}, { timestamps: true });

conductExamRoomSchema.index({ colid: 1, campus: 1, building: 1, room: 1 }, { unique: true });

module.exports = mongoose.model("conductexamroomds", conductExamRoomSchema);
