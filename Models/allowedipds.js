const mongoose = require('mongoose');

const allowedIPSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  user: { 
    type: String, 
    required: true 
  },
  empname: {
    type: String,
  },
  empemail: {  
    type: String,
  },
  ipAddress: { 
    type: String, 
    required: true 
  },
  colid: { 
    type: Number, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

const AllowedIPds = mongoose.model('allowedipds', allowedIPSchema);
module.exports = AllowedIPds;
