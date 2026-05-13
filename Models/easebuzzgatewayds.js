const mongoose = require('mongoose');

const easebuzzgatewaydsschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name']
  },
  user: {
    type: String,
    required: [true, 'Please enter user']
  },
  colid: {
    type: Number,
    required: [true, 'Please enter colid']
  },
  merchantid: {
    type: String,
    required: [true, 'Please enter Merchant Key (Key)']
  },
  salt: {
    type: String,
    required: [true, 'Please enter Salt']
  },
  environment: {
    type: String,
    enum: ['test', 'prod'],
    default: 'test'
  },
  isactive: {
    type: Boolean,
    default: true
  },
  returnurl: {
    type: String,
  },
  notes: {
    type: String
  }
}, { timestamps: true });

easebuzzgatewaydsschema.index({ colid: 1 });
easebuzzgatewaydsschema.index({ colid: 1, isactive: 1 });

const easebuzzgatewayds = mongoose.models.easebuzzgatewayds || mongoose.model('easebuzzgatewayds', easebuzzgatewaydsschema);
module.exports = easebuzzgatewayds;
