const express = require('express')
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUserDetails, getAllUsers, updateUserRole, deleteUser } = require('../controllers/userController')
const router = express.Router()
const {isAuthenticatedUser, authorizedRoles} = require('../middlewares/authentication')

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgotpassword").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/myprofile").get(isAuthenticatedUser,getUserDetails)
router.route("/updatepassword").put(isAuthenticatedUser,updatePassword)
router.route("/updateprofile").put(isAuthenticatedUser,updateProfile)
router.route("/admin/userdetails/:id").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUserDetails)
router.route("/admin/users").get(isAuthenticatedUser,authorizedRoles("admin"),getAllUsers)
router.route("/admin/updateuserrole/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateUserRole)
router.route("/admin/deleteuser/:id").delete(isAuthenticatedUser,authorizedRoles("admin"),deleteUser)
router.route("/logout").get(logout)
module.exports = router