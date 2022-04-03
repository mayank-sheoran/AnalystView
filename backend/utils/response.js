const successResponse = (res, data) => res.send({
  isError: false,
  data,
});

const errorResponse = (res, errMessage) => res.send({
  isError: true,
  errMessage,
});

module.exports = { successResponse, errorResponse };
