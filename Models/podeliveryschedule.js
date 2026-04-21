const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  colid: Number,

  poid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ppo'
  },

  stages: [
    {
      stage: String, // e.g. Advance / Delivery / Final

      description: String,

      percentage: Number,   // optional
      amount: Number,       // optional

      duedate: Date,

      type: {
        type: String, // ADVANCE / DELIVERY / PAYMENT
        default: 'DELIVERY'
      },

      status: {
        type: String,
        default: 'PENDING'
      }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('podeliveryschedule', ScheduleSchema);