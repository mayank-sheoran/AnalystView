const { successResponse, errorResponse } = require('../../utils/response');
const { API_RESPONSE } = require('../../enums/response');
const UserDB = require('../../db/user');

exports.saveUser = (req, res) => {
  const { userId, phone, currencySymbol } = req.body;
  UserDB.findOne({ userId }, (err, user) => {
    if (user) {
      successResponse(res, user);
    } else {
      const userData = new UserDB({ userId, phone, currencySymbol });
      userData
        .save()
        .then(() => {
          successResponse(res, API_RESPONSE.NEW_USER_ADDED);
        })
        .catch(() => errorResponse(res, 'Failed to add new user'));
    }
  });
};

exports.getUser = (req, res) => {
  const { userId } = req.body;
  UserDB.findOne({ userId }, (err, user) => {
    if (user) {
      successResponse(res, user);
    } else {
      errorResponse(res, 'User does not exist');
    }
  });
};
