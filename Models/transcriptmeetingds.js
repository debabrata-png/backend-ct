const mongoose = require('mongoose');

const transcriptMeetingSchema = new mongoose.Schema({
  colid: {
    type: Number,
    required: true
  },
  hostName: String,
  hostEmail: String,
  topic: String,
  description: String,
  meetingLink: String,
  startDateTime: Date,
  endDateTime: Date,
  participants: [{
    name: String,
    email: String,
    role: String,
    department: String
  }],
  participantEmails: [String],
  createdBy: String,
  transcript: String,
  englishTranslation: String,
  summary: String,
  actionItems: String,
  audioFile: mongoose.Schema.Types.Mixed,
  audioUrl: String,
  analyzedAt: Date
}, { timestamps: true });

transcriptMeetingSchema.index({ colid: 1, startDateTime: 1 });
transcriptMeetingSchema.index({ colid: 1, hostEmail: 1 });
transcriptMeetingSchema.index({ colid: 1, participantEmails: 1 });

module.exports = mongoose.model('transcriptmeetingds', transcriptMeetingSchema);
