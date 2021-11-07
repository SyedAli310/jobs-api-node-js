const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors/index");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const validUrl = require("valid-url");

const getAllJobs = async (req, res) => {
  /* todo[x] _completed_ */
  const {status,company,position, sort} = req.query;
  const queryObject = {createdBy: req.user.userId};
  if(status){
    const statusList = status.split(",");
    queryObject.status = {$in:statusList};
  }
  if(company){
    queryObject.company = {$regex:company,$options:"i"};
  }
  if(position){
    queryObject.position = {$regex:position,$options:"i"};
  }

  let result = Job.find(queryObject);
  if(sort){
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
    //console.log(sortList);
  }
  const jobs = await result; 
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
  const {link} = req.body;
  req.body.createdBy = req.user.userId;
  if (!validUrl.isUri(link)) {
    throw new BadRequestError("Invalid link");
  }
  const job = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: getReasonPhrase(StatusCodes.CREATED), job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position, link },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "" || link === "") {
    throw new BadRequestError("Company, position or link field cannot be empty");
  }
  if (!validUrl.isUri(link)) {
    throw new BadRequestError("Invalid link");
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
