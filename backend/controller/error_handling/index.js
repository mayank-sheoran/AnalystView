const moment = require('moment');
const { successResponse, errorResponse } = require('../../utils/response');
const ErrorDB = require('../../db/errors');

exports.saveError = (req, res) => {
  const { userId, phone, errorMessage } = req.body;
  const date = moment().format();
  const error = new ErrorDB({
    userId, phone, errorMessage, date,
  });
  error
    .save()
    .then(() => {
      successResponse(res, 'Error saved successfully.');
    })
    .catch(() => errorResponse(res, 'Failed to save the error'));
};
