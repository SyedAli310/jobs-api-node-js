const express = require("express");

const router = express.Router();

const { exploreJobs } = require("../controllers/allJobs");

router.route("/jobs").get(exploreJobs)


module.exports = router;
