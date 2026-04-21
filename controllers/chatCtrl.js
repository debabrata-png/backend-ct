const ChatMessage = require("../Models/chatag");
const User = require("../Models/user");

exports.sendMessage = async (req, res) => {
  try {
    const {
      senderId,
      senderName,
      senderRole,
      receiverId,
      receiverName,
      receiverRole,
      message,
      colid,
    } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (senderId, receiverId, message)",
      });
    }

    const newMessage = new ChatMessage({
      senderId,
      senderName: senderName || "Unknown",
      senderRole: senderRole || "Student",
      receiverId,
      receiverName: receiverName || "Unknown",
      receiverRole: receiverRole || "Student",
      message,
      colid: colid ? Number(colid) : 0,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: err.message,
    });
  }
};

// ── Existing: requires BOTH userId1 + userId2 (unchanged) ────────────────────
exports.getChatHistory = async (req, res) => {
  try {
    const { userId1, userId2 } = req.query;

    if (!userId1 || !userId2) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters (userId1, userId2)",
      });
    }

    const messages = await ChatMessage.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
      error: err.message,
    });
  }
};

exports.getChatList = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId parameter",
      });
    }

    const conversations = await ChatMessage.aggregate([
      {
        $match: {
          $or: [{ senderId: userId }, { receiverId: userId }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverId",
              "$senderId",
            ],
          },
          otherPersonName: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverName",
              "$senderName",
            ],
          },
          otherPersonRole: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$receiverRole",
              "$senderRole",
            ],
          },
          lastMessage: { $first: "$message" },
          lastMessageTime: { $first: "$createdAt" },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiverId", userId] },
                    { $eq: ["$isRead", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      { $sort: { lastMessageTime: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: conversations,
      count: conversations.length,
    });
  } catch (err) {
    console.error("Error fetching chat list:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat list",
      error: err.message,
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { receiverId, senderId } = req.body;

    if (!receiverId || !senderId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (receiverId, senderId)",
      });
    }

    await ChatMessage.updateMany(
      {
        senderId,
        receiverId,
        isRead: false,
      },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: "Messages marked as read",
    });
  } catch (err) {
    console.error("Error marking messages as read:", err);
    res.status(500).json({
      success: false,
      message: "Failed to mark messages as read",
      error: err.message,
    });
  }
};
 
exports.getMentorChatHistory = async (req, res) => {
  try {
    const { mentorId, colid } = req.query;

    if (!mentorId || !colid) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: mentorId and colid are both required",
      });
    }
 
    const messages = await ChatMessage.find({
      colid: Number(colid),
      $or: [
        { senderId: mentorId },
        { receiverId: mentorId },
      ],
    })
      .select("senderName receiverName senderId receiverId timestamp createdAt")
      .sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (err) {
    console.error("Error fetching mentor chat history:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentor chat history",
      error: err.message,
    });
  }
};