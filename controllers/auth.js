const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({
      msg: getReasonPhrase(StatusCodes.CREATED),
      user: { name: user.name, email: user.email },
      token,
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password.");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password)
  //verify passwords
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({
      msg: getReasonPhrase(StatusCodes.OK),
      user: { name: user.name, email: user.email },
      token,
    });
};

module.exports = {
  register,
  login,
};
