const express = require('express')
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails } = require('../controllers/productsControllers')
const router = express.Router()
router.route("/create-product").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").put(updateProduct)
router.route("/delete-product/:id").delete(deleteProduct)
router.route("/productdetail/:id").get(getProductDetails)
module.exports = router