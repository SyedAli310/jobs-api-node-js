const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getJobsInfo,
} = require("../controllers/jobs");

router.route('/').get(getAllJobs).post(createJob)
router.route('/info').get(getJobsInfo)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router