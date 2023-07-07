const express = require('express')
const app = express()
const middleware = require("./middlewares/error")
const product = require("./routes/productRoute")
const user =require("./routes/userRoute")
app.use(express.json())

//api 
app.use("/api/v1/",product)
app.use("/api/v1/",user)




module.exports = app;