const express = require('express')
const app = express()
const middleware = require("./middlewares/error")
const product = require("./routes/productRoute")
const user =require("./routes/userRoute")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

//api 
app.use("/api/v1/",product)
app.use("/api/v1/",user)




module.exports = app;