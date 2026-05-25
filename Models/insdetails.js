const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
  colid: Number,
  institutionname: String,
  logolink: String,
  address: String,
  presidentname: String,
  vcname: String,
  registrarname: String,
  tandclink: String,
  contactusdetails: String,
  privacypolicylink: String,
  refundpolicylink: String
});

module.exports = mongoose.model('insdetails', InstitutionSchema);
