export const successResponse = (res, data) => res.send({
  isError: false,
  data,
});

export const errorResponse = (res, errMessage) => res.send({
  isError: true,
  errMessage,
});
