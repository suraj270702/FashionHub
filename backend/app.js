const express = require('express')
const app = express()
const middleware = require("./middlewares/error")
const product = require("./routes/productRoute")
app.use(express.json())

//api 
app.use("/api/v1/",product)

//middleware


module.exports = app;