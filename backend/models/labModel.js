// labModel.js
const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  userId :  { type: String, required: true },
  labName: { type: String, required: true },
  labDetails: { type: String, required: true }
});

const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;
