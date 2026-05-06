const mongoose = require("mongoose");

const hostelBedAssignmentMapSchema = new mongoose.Schema(
  {
    buildingid: { type: mongoose.Schema.Types.ObjectId, ref: "hostelbuildingmapds" },
    roomid: { type: mongoose.Schema.Types.ObjectId, ref: "hostelroommapds" },
    buildingname: { type: String, trim: true, required: true },
    hosteltype: { type: String, trim: true },
    guesttype: { type: String, trim: true },
    block: { type: String, trim: true, required: true },
    floor: { type: String, trim: true, required: true },
    roomno: { type: String, trim: true, required: true },
    roomtype: { type: String, trim: true },
    bedno: { type: Number, required: true },
    residenttype: { type: String, trim: true },
    studentid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    student: { type: String, trim: true, required: true },
    studentemail: { type: String, trim: true, required: true },
    studentphone: { type: String, trim: true },
    programcode: { type: String, trim: true },
    program: { type: String, trim: true },
    regno: { type: String, trim: true },
    status: { type: String, trim: true, default: "Active" },
    colid: { type: Number, required: true, index: true },
    user: { type: String, trim: true }
  },
  { timestamps: true }
);

hostelBedAssignmentMapSchema.index({ colid: 1, roomid: 1, bedno: 1, status: 1 });
hostelBedAssignmentMapSchema.index({ colid: 1, studentemail: 1, status: 1 });

module.exports = mongoose.model("hostelbedassignmentmapds", hostelBedAssignmentMapSchema);
