const mongoose = require('mongoose');

const knowledgebaseSchema = new mongoose.Schema({
  colid: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  helptext: {
    type: String,
    default: ''
  },
  user: {
    type: String,
    default: ''
  }
}, { timestamps: true });

knowledgebaseSchema.index({ colid: 1, type: 1, level: 1, title: 1 });

module.exports = mongoose.model('knowledgebaseds', knowledgebaseSchema);
