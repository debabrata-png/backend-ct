const mongoose = require('mongoose');

const RecruitmentInterviewScheduleSchema = new mongoose.Schema({
  colid: { type: Number, required: true, index: true },
  jobid: { type: String, required: true, index: true },
  jobtitle: { type: String, default: '' },
  panelid: { type: String, required: true, index: true },
  panelname: { type: String, default: '' },
  applicationid: { type: String, default: '', index: true },
  applicationno: { type: String, default: '' },
  candidate: { type: String, default: '' },
  candidateemail: { type: String, default: '' },
  candidatephone: { type: String, default: '' },
  interviewdate: Date,
  interviewtime: { type: String, default: '' },
  mode: { type: String, default: 'Offline' },
  venue: { type: String, default: '' },
  meetinglink: { type: String, default: '' },
  status: { type: String, default: 'Scheduled' },
  remarks: { type: String, default: '' },
  user: { type: String, default: '' }
}, { timestamps: true });

RecruitmentInterviewScheduleSchema.index({ colid: 1, jobid: 1, applicationid: 1, panelid: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('recruitmentinterviewscheduleds', RecruitmentInterviewScheduleSchema);
