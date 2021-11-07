const mongoose = require("mongoose");

const AllJobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: [true, "Please provide a job position"],
    },
    url: {
      type: String,
      required: [true, "Please provide a job url"],
    },
    company: {
      type: String,
      required: [true, "Please provide a company"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AllJob", AllJobSchema);
