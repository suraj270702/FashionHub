const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
exports.isAuthenticatedUser = async(req,res,next) => {
    try{
        const {token} = req.cookies;
        //console.log(token)
        if(!token){
            return res.status(401).json({message : "Please Login to Continue"})
        }
        
        const decodedData =  jwt.verify(token,process.env.JWT_SECRET)

        req.user = await User.findById(decodedData.id)

        next()

    }
    catch(error){
        return res.status(500).json({error});
    }
}

exports.authorizedRoles = (...roles) => {
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({message : `${req.user.role} is not allowed to access resource`})
        }
        next()
    }
}