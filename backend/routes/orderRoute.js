const express = require("express")
const { newOrder, getSingleOrder, myOrders, allOrders, updateOrders, deleteOrder } = require("../controllers/orderControllers")
const router = express.Router()
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/authentication')

router.route("/order").post(isAuthenticatedUser,newOrder)
router.route("/getorder/:id").get(isAuthenticatedUser,getSingleOrder)
router.route("/myorders").get(isAuthenticatedUser,myOrders)
router.route("/admin/allorders").get(isAuthenticatedUser,authorizedRoles("admin"),allOrders)
router.route("/admin/updateorder/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateOrders)
router.route("/admin/deleteorder/:id").delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder)





module.exports = router