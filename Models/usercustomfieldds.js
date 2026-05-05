const mongoose = require('mongoose');

const userCustomFieldSchema = new mongoose.Schema({
  colid: {
    type: Number,
    required: true
  },
  fieldname: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  page: {
    type: String,
    default: 'Page 1'
  },
  section: {
    type: String,
    default: 'Additional Details'
  },
  type: {
    type: String,
    default: 'text'
  },
  options: [String],
  isrequired: {
    type: String,
    default: 'No'
  },
  isactive: {
    type: String,
    default: 'Yes'
  },
  order: {
    type: Number,
    default: 0
  },
  user: String
}, { timestamps: true });

userCustomFieldSchema.index({ colid: 1, fieldname: 1 }, { unique: true });

module.exports = mongoose.model('usercustomfieldds', userCustomFieldSchema);
