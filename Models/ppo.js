const mongoose = require('mongoose');

const POSchema = new mongoose.Schema({
  colid: Number,

  rfpid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfp' },
  vendorid: { type: mongoose.Schema.Types.ObjectId, ref: 'prfpvendor' },
  categoryid: { type: mongoose.Schema.Types.ObjectId, ref: 'pcategory' },

  items: [
    {
      itemname: String,
      quantity: Number,
      price: Number
    }
  ],

  status: {
    type: String,
    default: 'REGISTRAR_PENDING'
  }

}, { timestamps: true });

module.exports = mongoose.model('ppo', POSchema);