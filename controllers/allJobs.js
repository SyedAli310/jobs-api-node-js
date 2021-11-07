const AllJob = require("../models/AllJob");
const { BadRequestError, NotFoundError } = require("../errors/index");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const exploreJobs = async (req, res) => {
  const { position, company } = req.query;
  const queryObject = {};
  if (position) {
    queryObject.position = { $regex: position, $options: "i" };
  }
  if (company) {
    queryObject.company = { $regex: company, $options: "i" };
  }
  //console.log(queryObject);
  let result = AllJob.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit= Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const totalHits = await AllJob.countDocuments(queryObject);   //count the total number of hits
  result = result.skip(skip).limit(limit);
  const allJobs = await result;
  if (!allJobs) {
    throw new NotFoundError(`No jobs found`);
  }
  res.status(StatusCodes.OK).json({
    msg: getReasonPhrase(StatusCodes.OK),
    items: allJobs.length,
    totalPages: Math.ceil(totalHits / limit),
    pageNo: page,
    data:allJobs,
  });
};

module.exports = {
  exploreJobs,
};
