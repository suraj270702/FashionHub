const mongoose = require ('mongoose')
const { type } = require('os')

const productsSchema = mongoose.Schema({
    name:{
        type : String,
        required: [true,"please enter a name"],
        trim : true
    },
    description:{
        type : String,
        required: [true,"please enter a descripption"]
    },
    price:{
        type : Number,
        required: [true,"please enter a price"],
        maxLength : [8,"please a enter a valid price"]
    },
    rating:{
        type : Number,
        default : 0
    },
    images:[
        {
        public_id:{
            type :String,
            required : true
        },
        url:{
            type :String,
            required : true
        }
    }

    ],
    category : {
        type : String,
        required : [true,"please enter a string"]
    },
    stock:{
        type : Number,
        required : [true,"Please enter a stocks"],
        maxLength : [4,"please check your stock number"],
        default : 1
    },
    numofreviews : {
        type : Number,
        default : 0
},
reviews : [
    {  user:{
         type : mongoose.Schema.ObjectId,
         role : "user",
         required : true
    },
        name:{
            type : String,
            required : true
        },
        rating : {
            type : Number,
            required : true
        },
        comment : {
            type : String,
            required: true
        }
    }
],
createdAt:{
    type : Date,
    default : Date.now
}

})
module.exports = mongoose.model("product",productsSchema)