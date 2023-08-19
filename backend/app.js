const express = require('express')
const app = express()
const middleware = require("./middlewares/error")
const product = require("./routes/productRoute")
const user =require("./routes/userRoute")
const order = require("./routes/orderRoute")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const payment = require("./routes/paymentRoute")
const dotenv = require("dotenv")

dotenv.config({path : "backend/config/config.env"})
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : true,limit: '10mb'}))
app.use(fileUpload())

//api 
app.use("/api/v1/",product)
app.use("/api/v1/",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)




module.exports = app;