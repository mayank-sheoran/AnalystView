const mongoose = require('mongoose');
const { TRADE_TYPE, TRADE } = require('../enums/journal');

const { Schema } = mongoose;

const JournalData = new Schema({
  userId: { required: true, type: String },
  tradeId: { type: String },
  date: { type: Date, default: new Date() },
  strategiesUsed: { required: true, type: Array },
  tradeType: { required: true, enum: TRADE_TYPE, type: String },
  trade: { required: true, enum: TRADE, type: String },
  pnl: { required: true, type: Number },
  pnlPerc: { required: true, type: Number },
  description: { type: String },
  bookmark: { type: Boolean, default: false },
});

module.exports = mongoose.model('JournalData', JournalData);
