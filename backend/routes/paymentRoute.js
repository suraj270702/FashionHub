const express = require("express")
const router = express.Router()
const {isAuthenticatedUser} = require("../middlewares/authentication")
const { processPayment, sendStripeApiKey, verifyPaymentId } = require("../controllers/paymentController")



router.route("/paymentprocess").post(isAuthenticatedUser,processPayment)
router.get("/getstripeapikey").get(isAuthenticatedUser,sendStripeApiKey)
router.route("/verify-payment").get(isAuthenticatedUser,verifyPaymentId)
module.exports = router