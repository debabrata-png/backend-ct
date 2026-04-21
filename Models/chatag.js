const { Schema, model } = require("mongoose");

const chatMessageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderRole: {
      type: String,
      enum: ["Student", "Faculty", "PE", "Admin", "Alumni"],
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    receiverRole: {
      type: String,
      enum: ["Student", "Faculty", "PE", "Admin", "Alumni"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    colid: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
chatMessageSchema.index({ senderId: 1, receiverId: 1 });
chatMessageSchema.index({ colid: 1 });
chatMessageSchema.index({ createdAt: -1 });

const ChatMessage = model("chat_message", chatMessageSchema);

module.exports = ChatMessage;
