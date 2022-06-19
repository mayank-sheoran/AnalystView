const mongoose = require('mongoose');

const { Schema } = mongoose;

const ErrorSchema = new Schema({
  userId: { required: true, type: String },
  phone: { required: true, type: String },
  errorMessage: { required: true, type: String },
  date: { required: true, type: String },
});

module.exports = mongoose.model('ERRORS', ErrorSchema);
