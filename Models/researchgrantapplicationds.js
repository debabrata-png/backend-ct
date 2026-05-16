const mongoose = require("mongoose");

const ResearchGrantComponentSchema = new mongoose.Schema({
  component: String,
  requestedamount: Number
}, { _id: false });

const ResearchGrantDocumentSchema = new mongoose.Schema({
  documenttype: String,
  description: String,
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  bucket: String,
  region: String,
  key: String,
  url: String,
  uploadedAt: Date
}, { _id: false });

const ResearchGrantApprovalSchema = new mongoose.Schema({
  level: Number,
  role: String,
  decision: String,
  comments: String,
  approvedby: String,
  approvedbyname: String,
  approvedAt: Date
}, { _id: false });

const ResearchGrantApplicationSchema = new mongoose.Schema({
  colid: { type: Number, required: true },
  academicyear: String,
  department: String,
  facultyname: String,
  userid: String,
  projecttitle: String,
  description: String,
  fromdate: String,
  todate: String,
  estimatedtotalamount: Number,
  copiinternal: String,
  copiinternalemail: String,
  copiexternal: String,
  requestedcomponents: [ResearchGrantComponentSchema],
  documents: [ResearchGrantDocumentSchema],
  status: { type: String, default: "Applied" },
  currentlevel: { type: Number, default: 1 },
  approvalhistory: [ResearchGrantApprovalSchema],
  name: String,
  user: String
}, { timestamps: true });

ResearchGrantApplicationSchema.index({ colid: 1, academicyear: 1, status: 1 });
ResearchGrantApplicationSchema.index({ colid: 1, department: 1 });
ResearchGrantApplicationSchema.index({ colid: 1, userid: 1 });

module.exports = mongoose.model("researchgrantapplicationds", ResearchGrantApplicationSchema);
