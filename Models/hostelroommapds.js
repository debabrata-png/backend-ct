const mongoose = require("mongoose");

const hostelRoomMapSchema = new mongoose.Schema(
  {
    buildingid: { type: mongoose.Schema.Types.ObjectId, ref: "hostelbuildingmapds" },
    buildingname: { type: String, trim: true, required: true },
    hosteltype: { type: String, trim: true },
    guesttype: { type: String, trim: true },
    block: { type: String, trim: true, required: true },
    floor: { type: String, trim: true, required: true },
    roomno: { type: String, trim: true, required: true },
    roomtype: { type: String, trim: true, required: true },
    roomrentpermonth: { type: Number, default: 0 },
    noofbeds: { type: Number, default: 1 },
    residenttype: { type: String, trim: true },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

hostelRoomMapSchema.index({ colid: 1, buildingname: 1, block: 1, floor: 1, roomno: 1 });

module.exports = mongoose.model("hostelroommapds", hostelRoomMapSchema);
