// models/notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipientUser: {
        type: String,
        required: [true, 'Please enter recipient user']
    },
    recipientColid: {
        type: Number,
        required: [true, 'Please enter recipient colid']
    },
    type: {
        type: String,
        enum: [
            'collaboration_request', 
            'request_accepted', 
            'request_rejected',
            'new_message',
            'collaboration_started',
            'new_post'
        ],
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please enter notification title']
    },
    message: {
        type: String,
        required: [true, 'Please enter notification message']
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    referenceType: {
        type: String,
        enum: ['CollaborationPost', 'CollaborationRequest', 'Collaboration'],
        required: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    senderUser: {
        type: String
    },
    senderColid: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add index for better query performance
notificationSchema.index({ recipientUser: 1, recipientColid: 1, createdAt: -1 });

const notificationds = mongoose.model('notificationds', notificationSchema);
module.exports = notificationds;
