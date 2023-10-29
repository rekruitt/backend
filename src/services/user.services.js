const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user.models");
const responses = require("../utils/response");
const generateResetPin = require("../utils/generateRestPin")
const sendMail = require("../utils/sendMail");
const vacantPosition = require("../models/jobPosting.models");
dotenv = require("dotenv");
dotenv.config();



const signUp = async (payload) => {
  const foundEmail = await user.findOne({ email: payload.email });
  if (foundEmail) {
    return responses.buildFailureResponse("Email already exists", 400);
  }
  payload.password = await bcrypt.hash(payload.password, 10);
  role = payload.role;

  const savedApplicant = await user.create(payload);
  return responses.buildSuccessResponse(
    "Registration Successful",
    201,
    savedApplicant
  );
};


const login = async (payload) => {
  const foundUser = await user.findOne({ email: payload.email });

  if (!foundUser) {
    return responses.buildFailureResponse("User not found", 404);
  }

  const foundPassword = await bcrypt.compare(
    payload.password,
    foundUser.password
  );
  if (!foundPassword) {
    return responses.buildFailureResponse("Password incorrect", 400);
  }

  const token = jwt.sign(
    {
      _id: foundUser._id,
      
    },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
  foundUser.token = token;
  return responses.buildSuccessResponse("Login Successful", 200, foundUser, token);
};

const forgotPassword = async (payload) => {
  const userEmail = await user.findOne({ email: payload.email });
  if (!userEmail) {
    return responses.buildFailureResponse("Invalid Email", 400);
  }

  // Check if the resetPin has already been used.
  if (userEmail.resetPin) {
    return responses.buildFailureResponse("Reset Pin has already been used", 400);
  }

  const resetPin = generateResetPin();
  const updatedUser = await user.findByIdAndUpdate(
    { _id: userEmail._id },
    { resetPin: resetPin },
    { new: true }
  );

  const forgotPasswordPayload = {
    to: updatedUser.email,
    subject: "RESET PASSWORD",
    pin: resetPin,
  };

  sendMail.sendForgotPasswordMail(forgotPasswordPayload);

  return responses.buildSuccessResponse("Reset Pin sent successfully", 200, updatedUser);
};


const resetPassword = async (payload) => {
  const userAndPin = await user.findOne({
    email: payload.email,
    resetPin: payload.resetPin,
  });

  if (!userAndPin) {
    return responses.buildFailureResponse("Invalid Pin", 400);
  }

  // Check if the resetPin has already been used.
  if (!userAndPin.resetPin) {
    return responses.buildFailureResponse("Reset Pin has already been used", 400);
  }

  // Hash the new password
  const saltRounds = 10;
  const generatedSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);

  // Update the user's password and mark the resetPin as used.
  const updatedUser = await user.findByIdAndUpdate(
    { _id: userAndPin._id },
    { password: hashedPassword, resetPin: null }, // Nullify the resetPin to mark it as used.
    { new: true }
  );

  return responses.buildSuccessResponse("Password Reset Successful", 200, updatedUser);
};






// to update  profile
const updateProfile = async (payload) => {
  const userProfile = await user.findOne({ _id: payload._id });
  if (!userProfile) {
    return responses.buildFailureResponse("User Id not found", 400);
  }
  const saltRounds = 10;
  const generatedSalt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);
  const updatedProfile = await user.findByIdAndUpdate(
    { _id: userProfile._id },
    { password: hashedPassword },
    payload,
    { new: true }
  );
  //   console.log(updatedProfile);
  return responses.buildSuccessResponse(
    "Profile updated Successfully",
    200,
    updatedProfile
  );
};

const postJob = async (payload) => {
  const foundUser = await user.findOne(payload.user)
  if(foundUser.token && foundUser.role !== 'recruiter') {
    return res.status(400).json({
        message: "Only recruiters are Allowed",
        status: "failure"
    })
  };
    const postedJob = await vacantPosition.create(payload);
    return responses.buildSuccessResponse("job posted successfully", 200, postedJob);
};


async function searchJob(query) {
  try {
    const searchedJob = query.search
      ? {
        $or: [
          { jobTitle: { $regex: query.search, $options: "i" } },
          { location: { $regex: query.search, $options: "i" } },
        ],
      }
        : {};
      const foundJob = await vacantPosition.find(searchedJob);
      return responses.buildSuccessResponse("Successfully fetched job", 200, foundJob);
    } catch (error) {
      return responses.buildFailureResponse("Failed to fetch job", 500);
    }
  }
  
  


module.exports = {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  postJob,
  searchJob
};
