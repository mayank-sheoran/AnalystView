const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserStrategies = new Schema({
  userId: { required: true, type: String },
  strategies: { required: true, type: Array, default: [] },
});

module.exports = mongoose.model('UserStrategies', UserStrategies);
