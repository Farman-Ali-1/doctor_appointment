const mongoose = require('mongoose');

// Define history schema
const historySchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  labassistantId: { type: String,default: ''},
  appointmentId: { type: String, required: true},
  type: { type: String, enum: ['prescription', 'lab'], required: true },
  data: { type: String, required: true }, 
  report:{ type: String, default: ''},
  timestamp: { type: Date, default: Date.now }
});

// Create history model
const History = mongoose.model('History', historySchema);

module.exports = History;
