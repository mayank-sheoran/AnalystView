const mongoose = require('mongoose');
const { tradeType, trade } = require('../enums/journal');

const { Schema } = mongoose;

const JournalData = new Schema({
  userId: { required: true, type: String },
  tradeId: { required: true, type: String },
  date: { type: Date, default: new Date() },
  strategiesUsed: { required: true, type: Array },
  tradeType: { required: true, enum: tradeType, type: String },
  trade: { required: true, enum: trade, type: String },
  pnl: { required: true, type: Number },
  pnlPerc: { required: true, type: Number },
  description: { required: true, type: String },
  bookmark: { type: Boolean, default: false },
});

module.exports = mongoose.model('JournalData', JournalData);
