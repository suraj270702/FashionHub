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