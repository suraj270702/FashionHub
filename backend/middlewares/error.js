const errorHandler = require('../utils/errorHandler')

module.exports =(err,req,res,next) =>{
    err.statuscode = err.statuscode || 5000;
    err.message = err.message || "Internal Server Error"

    res.status(err.statuscode).json({
        success : false,
        error : err
    })
}