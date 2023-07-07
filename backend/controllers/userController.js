const User = require('../models/userModel')

exports.registerUser = async(req,res) => {
    try{
    const {name,email,password} = req.body

    const user = await User.create({
        name,email,password,
        avatar : {
            publicid : "sample id",
            url : "sample url"
        }
    })
    const token = user.getJwtToken()
    res.status(200).json({success : true,token})
        
    }
    catch(err){
        res.status(500).json({err})
    }
}
exports.loginUser = async(req,res) => {
    try{
    const {email,password} = req.body
    if(!email ||!password ){
        return  res.status(401).json({message : "Email Or password is missing"})
    }
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({message : "Invalid Email or Password"})
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return res.status(401).json({message :"Incorrect Eamil or Password!"});
    }

    const token = user.getJwtToken()
    res.status(200).json({
        success : true,
        token
    })
} 
catch(error){
    return res.status(500).json({error})
}
}