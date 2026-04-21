const mongoose = require('mongoose');

const ipAddressSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: [true, 'Please enter IP address'],
  },
  email:{
    type: String,
    required: [true, 'Please enter email'],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  colid: {
    type: Number,
    required: [true,'Please enter colid']
  }
});

module.exports = mongoose.model('IPAddress', ipAddressSchema);
