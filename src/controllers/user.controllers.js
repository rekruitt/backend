const userServices = require("../services/user.services");

const signUp = async (req, res) => {
  try {
    const data = await userServices.signUp(req.body);
    if (!data) {
      return res.status(500).json({
        status: "failure",
        message: `Cannot register ${req.body.role}`,
      });
    }
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = await userServices.login(req.body);

    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(error?.statusCode).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const data = await userServices.forgotPassword(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const data = await userServices.resetPassword(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = await userServices.updateProfile(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: error?.message,
    });
  }
};

const postJob = async (req, res) => {
  try {
    const data = await userServices.postJob(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      // message: "Unable to post job",
      // status: "failure",
      status: "failure",
      message: error?.message,
    })
  }
};

const searchJob = async (req, res) => {
  try {
    const data = await userServices.searchJob(req.query);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error?.message,
    })
  }
};

module.exports = {
  signUp,
  login,
  forgotPasswordController,
  resetPasswordController,
  updateProfile,
  searchJob,
  postJob 
};

