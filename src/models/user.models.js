
const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "enum": ["applicant", "recruiter"],
    required: true
  },
  resetPin: {
    type: Number
  },
  resetPinUsed: {
    type: Boolean,
    default: false,
  },
  dateOfBirth: {
    type: Date
  },
  companyName: {
    type: String
  },
  positionInCompany: {
    type: String
  },
  countryCode: {
    type: Number
  },
  phoneNumber: {
    type: Number
  },
  numberOfEmployees: {
    type: Number
  },
  typeOfIndustry: {
    type: String
  },
  website: {
    type: String
  },
  country: {
    type: String
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  nationality: {
    type: String
  },
  location: {
    type: String
  },
  highestQualification: {
    type: String
  },
  currentJobFunction: {
    type: String
  },
  yearsOfExperience: {
    type: String
  },
  availaility: {
    type: String,
    "enum": ["available", "unavailable"],
    "default": "available"
  }
}, {
  timestamps: true
});
module.exports = Mongoose.model("Users", userSchema);