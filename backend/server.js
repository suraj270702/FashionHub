

const app = require('./app')


const dotenv = require("dotenv")
const { db } = require('./config/db')


dotenv.config({path : "backend/config/config.env"})

//Database conection
db()
app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
})