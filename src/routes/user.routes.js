const express = require("express");
const userControllers = require("../controllers/user.controllers");
const userValidation = require("../middlewares/user.validations");
const authmiddleware = require("../middlewares/auth")
const router = express.Router();

router.post("/signup", userValidation, userControllers.signUp);
router.post("/login", userControllers.login);
router.post("/forgot-password", userControllers.forgotPasswordController);
router.post("/reset-password", userControllers.resetPasswordController);

router.put("/profileUpdate", userControllers.updateProfile);
router.post('/postJob', authmiddleware.authenticate, userControllers.postJob);
router.get('/searchJobs',authmiddleware.authenticate, userControllers.searchJob);


module.exports = router; 