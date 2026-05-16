const mongoose = require('mongoose');

const AiConfigurationSchema = new mongoose.Schema({
  colid: Number,
  type: {
    type: String,
    default: 'ChatGPT'
  },
  apikey: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  active: {
    type: String,
    default: 'Yes'
  },
  default: {
    type: String,
    default: 'No'
  },
  user: {
    type: String,
    default: ''
  }
}, { timestamps: true });

AiConfigurationSchema.index({ colid: 1, type: 1, active: 1, default: 1 });

module.exports = mongoose.model('aiconfigurationds', AiConfigurationSchema);
