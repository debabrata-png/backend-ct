// models/collaborationRequest.js
const mongoose = require('mongoose');

const collaborationRequestSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collaborationpostds',
        required: true
    },
    requesterUser: {
        type: String,
        required: [true, 'Please enter requester user']
    },
    requesterColid: {
        type: Number,
        required: [true, 'Please enter requester colid']
    },
    ownerUser: {
        type: String,
        required: [true, 'Please enter owner user']
    },
    ownerColid: {
        type: Number,
        required: [true, 'Please enter owner colid']
    },
    message: {
        type: String,
        required: [true, 'Please enter request message']
    },
    requestedRole: {
        type: String,
        required: [true, 'Please specify your role']
    },
    proposedContribution: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    requestedAt: {
        type: Date,
        default: Date.now
    },
    respondedAt: {
        type: Date
    }
});

const collaborationrequestds = mongoose.model('collaborationrequestds', collaborationRequestSchema);
module.exports = collaborationrequestds;
