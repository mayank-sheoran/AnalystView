const mongoose = require('mongoose');
const { tradeType, trade } = require('../enums/journal');

const { Schema } = mongoose;

const JournalData = new Schema({
  userId: { required: true, type: String },
  tradeId: { required: true, type: String },
  date: { type: Date, default: new Date() },
  strategy: { required: true, type: String },
  tradeType: { required: true, type: tradeType },
  trade: { required: true, type: trade },
  amount: { required: true, type: Number },
  percentage: { required: true, type: Number },
  description: { required: true, type: String },
  bookmark: { type: Boolean, default: false },
});

module.exports = mongoose.model('JournalData', JournalData);
