const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
  userId: { required: true, type: String },
  currencySymbol: { required: true, type: String },
  phone: { required: true, type: String },
});

module.exports = mongoose.model('User', User);
