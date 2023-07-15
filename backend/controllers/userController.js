const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
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

    //const token = user.getJwtToken()
    //res.status(200).json({
        //success : true,
        //token
    //})
    sendToken(user,200,res)
} 
catch(error){
    return res.status(500).json({error})
}
}

exports.logout = async(req,res) => {
    try{

        res.cookie("token",null,{
            expires : new Date(Date.now()),
            httpOnly : true
        })


        return res.status(200).json({
            message : "Logged Out Successfully"
        })
    }
    catch(error){
        return res.status(500).json({error})
    }
    
}

//Reset Password 

exports.forgotPassword = async(req,res,next) => {
    
    try{
        const user = await User.findOne({email : req.body.email})
    if(!user){
        return res.status(404).json({message : "User Not Found"})
    }
    const resetToken = user.resetPasswordToken()
    await user.save({validateBeforeSave : false})
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset link is \n\n ${resetPasswordUrl} \n\n If you have not requested then kindly ignore it`
       await sendEmail({
        email : user.email,
        subject : `FashionHub Account password reset`,
        message
       })
       return res.status(200).json({message : "Email sent successfully"})
    }
    catch(error){
        user.resetpasswordToken = undefined
        user.resetpasswordExpire = undefined
        await user.save({validateBeforeSave : false})
        return res.status(500).json({error})
    }
}

exports.resetPassword = async(req,res,next)=>{
try{
const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
const user = await User.findOne({
    resetpasswordToken : resetPasswordToken,
    resetpasswordExpire : {$gt:Date.now()}
})
if(!user){
    return res.status(400).json({message : "Reset password link is invalid or expired"})
}
if(req.body.password != req.body.confirmPassword){
    return res.status(400).json({message : "Both Passwords must be same"})
}
user.password = req.body.password
user.resetpasswordToken = undefined
user.resetpasswordExpire = undefined

await user.save()

sendToken(user,200,res)
}
catch(error){
    return res.status(500).json({error})
}
}

exports.getUserDetails = async(req,res,next) =>{
    try{
    const user = await User.findById(req.user.id)
    return res.status(200).json({user})
    }
    catch(error){
        return res.status(403).json({message : "Please Login to manage your account"})
    }
}

exports.updatePassword = async(req,res,next) => {
    try{
       const user = await User.findById(req.user.id).select("+password")

       const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

       if(!isPasswordMatched){
        return res.status(400).json({message : "password is incorrect"})
       }
       if(req.body.newPassword !== req.body.confirmPassword){
        return res.status(400).json({message : "Both passwords must be same"})
       }
       user.password = req.body.newPassword
      await user.save()

       sendToken(user,200,res)

    }
    catch(error){
        return res.status(500).json({error,message:"Something went wrong"})
    }
}