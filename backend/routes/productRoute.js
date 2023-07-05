const express = require('express')
const { getAllProducts,createProduct,updateProduct } = require('../controllers/productsControllers')
const router = express.Router()
router.route("/create-product").post(createProduct)
router.route("/products").get(getAllProducts)
router.route("/product/:id").put(updateProduct)
module.exports = router