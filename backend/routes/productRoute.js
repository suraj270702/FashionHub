const express = require('express')
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails, testing, createReviews, getReviews, getAdminProducts } = require('../controllers/productsControllers')
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/authentication')
const router = express.Router()
router.route("/admin/create-product").post(isAuthenticatedUser,authorizedRoles("admin"),createProduct)
router.route("/products").get(getAllProducts)
router.route("/admin/getallproducts").get(isAuthenticatedUser,authorizedRoles("admin"),getAdminProducts)
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizedRoles("admin"),updateProduct)
router.route("/admin/delete-product/:id").delete(isAuthenticatedUser,authorizedRoles("admin"),deleteProduct)
router.route("/productdetail/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser,createReviews)
router.route("/getreviews").get(getReviews)
router.route("/testing").get(testing)
module.exports = router