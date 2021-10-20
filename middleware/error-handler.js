const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later!",
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === "ValidationError") {
    customError.msg = `Please provide ${Object.keys(err.errors)}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.msg = `No item found for the Id:${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `The email ${err.keyValue.email} is already in use.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
