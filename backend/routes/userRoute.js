const express = require('express')
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword } = require('../controllers/userController')
const router = express.Router()
const {isAuthenticatedUser} = require('../middlewares/authentication')

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/myprofile").get(isAuthenticatedUser,getUserDetails)
router.route("/updatepassword").put(isAuthenticatedUser,updatePassword)
router.route("/logout").get(logout)
module.exports = router