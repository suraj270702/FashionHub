const express = require('express')
const app = express()
const middleware = require("./middlewares/error")
const product = require("./routes/productRoute")
const user =require("./routes/userRoute")
const order = require("./routes/orderRoute")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended : true}))
app.use(fileUpload())

//api 
app.use("/api/v1/",product)
app.use("/api/v1/",user)
app.use("/api/v1",order)




module.exports = app;