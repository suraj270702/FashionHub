const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        maxLength : 50,
        minLength : 4
    },
    email :{
        type : String,
        required : true,
        unique:true, //email should be unique in the database
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type : String,
        required : true,
        minLength : [8,"Password length must be greater than 8"],
        select : false
    },
    avatar : {
        publicid:{
            type : String,
            required : true
        },
        url:{
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default:"user"
    },
    resetpasswordToken : String,
    resetpasswordExpire : Date
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN

userSchema.methods.getJwtToken = function(){
      return jwt.sign({id : this._id},process.env.JWT_SECRET,{
         expiresIn : 3
      })
}

//password matching

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
module.exports = mongoose.model("User",userSchema)