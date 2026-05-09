const mongoose = require('mongoose');

const EmailConfigurationSchema = new mongoose.Schema({
  colid: Number,
  username: String,
  password: String,
  type: String,
  provider: String,
  smtp: {
    type: String,
    default: ''
  },
  smptp: {
    type: String,
    default: ''
  },
  port: {
    type: Number,
    default: 587
  },
  secure: {
    type: String,
    default: 'No'
  },
  default: {
    type: String,
    default: 'No'
  },
  isactive: {
    type: String,
    default: 'Yes'
  }
}, { timestamps: true });

EmailConfigurationSchema.index({ colid: 1, provider: 1, type: 1, isactive: 1 });

module.exports = mongoose.model('emailconfigurationds', EmailConfigurationSchema);
