
const mongoose = require("mongoose");

const jobPostingSchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobDescriptions: {
    // skiils and education requirements
    type: String,
    required: true
  },
  jobType: {
    // full-time, contract, Temporary, internship
    type: String,
    required: true
  },
  experienceLevel: {
    // whether Internship, Entry-level, Associate, mid-senior, director, executive 
    type: String,
    required: true
  },
  jobMode: {
    // remote, onSite, hybrid
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  jobUrl: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  minSalary: {
    type: String
  },
  maxSalary: {
    type: String
  },
  deadline: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
module.exports = mongoose.model("vacancies", jobPostingSchema);