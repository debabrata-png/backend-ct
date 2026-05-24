const mongoose = require("mongoose");

const mentoringMessageSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    workspaceid: { type: mongoose.Schema.Types.ObjectId, ref: "mentoringworkspaceds", required: true, index: true },
    senderrole: { type: String, trim: true, enum: ["Faculty", "Student"], default: "Faculty" },
    sendername: { type: String, trim: true },
    senderemail: { type: String, trim: true },
    regno: { type: String, trim: true },
    itemtype: { type: String, trim: true, enum: ["Message", "Document", "Link"], default: "Message" },
    message: { type: String, trim: true },
    title: { type: String, trim: true },
    url: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("mentoringmessageds", mentoringMessageSchema);
