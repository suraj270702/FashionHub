

const app = require('./app')

const cloudinary = require("cloudinary")
const dotenv = require("dotenv")
const { db } = require('./config/db')


dotenv.config({path : "backend/config/config.env"})

//Database conection
db()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET_KEY
})
app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
})