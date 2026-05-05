const mongoose = require('mongoose');

const awsFileLibrarySchema = new mongoose.Schema({
  colid: {
    type: Number,
    required: true
  },
  user: String,
  uploadedby: String,
  awsconfigid: String,
  configname: String,
  bucket: String,
  region: String,
  key: String,
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  url: String,
  folder: {
    type: String,
    default: ''
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('awsfilelibraryds', awsFileLibrarySchema);
