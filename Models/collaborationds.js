// models/collaboration.js
const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collaborationpostds',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    participants: [{
        user: String,
        colid: Number,
        role: String,
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    chatRoomId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'paused'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastActivity: {
        type: Date,
        default: Date.now
    }
});

const collaborationds = mongoose.model('collaborationds', collaborationSchema);
module.exports = collaborationds;
