const mongoose = require('mongoose');

const mealpollsdsschema = new mongoose.Schema({
  buildingname: { type: String, required: true },
  colid: { type: Number, required: true },
  polldate: { type: Date, required: true },
  mealtype: { 
    type: String, 
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'], 
    required: true 
  },
  options: [{ 
    optionname: { type: String, required: true },
    votes: { type: Number, default: 0 },
    votedstudents: [{ type: String }] // array of regno
  }],
  pollstatus: { 
    type: String, 
    enum: ['Active', 'Closed'], 
    default: 'Active' 
  },
  createdby: { type: String }, // mess manager email
  createdbyname: { type: String }
}, { timestamps: true });

const mealpollsds = mongoose.model('mealpollsds', mealpollsdsschema);

module.exports = mealpollsds;
