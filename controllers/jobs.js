const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors/index");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res
    .status(StatusCodes.OK)
    .json({ msg: getReasonPhrase(StatusCodes.OK), count: jobs.length, jobs });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job with Id: ${jobId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: getReasonPhrase(StatusCodes.OK), job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: getReasonPhrase(StatusCodes.CREATED), job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or position field cannot be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with Id: ${jobId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: getReasonPhrase(StatusCodes.OK), job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({
    _id: jobId,
    creadetBy: userId,
  });
  if (!job) {
    throw new NotFoundError(`No job with Id: ${jobId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: getReasonPhrase(StatusCodes.OK)});
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
