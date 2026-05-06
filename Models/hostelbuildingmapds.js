const mongoose = require("mongoose");

const hostelBuildingMapSchema = new mongoose.Schema(
  {
    buildingname: { type: String, trim: true, required: true },
    hosteltype: { type: String, enum: ["Boys", "Girls", "Mixed"], required: true },
    guesttype: { type: String, enum: ["Student", "Faculty", "Guests", "Mixed"], required: true },
    blocks: [{ type: String, trim: true }],
    floors: [{ type: String, trim: true }],
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

hostelBuildingMapSchema.index({ colid: 1, buildingname: 1 });

module.exports = mongoose.model("hostelbuildingmapds", hostelBuildingMapSchema);
