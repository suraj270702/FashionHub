const Order = require("../models/OrderModel")
const Product = require("../models/productsmodel")

exports.newOrder = async(req,res) => {
    try{
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
          } = req.body;
        
          const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
          });
        

      return res.status(200).json({order})
    }
    catch(error){
        return res.status(500).json({ error})
    }
}

exports.getSingleOrder = async(req,res) => {
    try{
    const order = await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return res.status(404).json({message : "order does not exist"})
    }
    return res.status(200).json({order})
    }
    catch(error){
        return res.status(500).json({message : "something went wrong"})
    }
}

exports.myOrders = async(req,res) => {
    try{
    const orders = await Order.find({user :req.user._id})
    
    return res.status(200).json({orders})
    }
    catch(error){
        return res.status(500).json({message : "something went wrong"})
    }
}

//admin 

exports.allOrders = async(req,res) => {
    try{
    const orders = await Order.find()
    let totalamount = 0;
    orders.forEach(order=>{
        totalamount+=order.totalPrice
    })
    return res.status(200).json({orders,totalamount})
    }
    catch(error){
        return res.status(500).json({message : "something went wrong"})
    }
}

//admin order status
exports.updateOrders = async(req,res) => {
    try{
        const order = await Order.findById(req.params.id)
        if(!order){
            return res.status(404).json({message : "order does not eist"})
         }
    
    if(order.orderStatus==="Delivered"){
        return res.status(400).json({message : "Product is already delivered"})
    }
    if(req.body.status==="Shipped"){
    order.orderItems.forEach(async (order)=>{
         await updateStock(order.product,order.quantity)
    })
}

    order.orderStatus = req.body.status
    if(req.body.status==="Delivered"){
        order.deliveredAt = Date.now()
    }
    await order.save({validateBeforeSave : false})
    return res.status(200).json({success:true})
    }
    catch(error){
        return res.status(500).json({message : `something went wrong error is ${error}`})
    }
}

updateStock = async(id,quantity)=>{
const product = await Product.findById(id)
product.stock = product.stock - quantity
await product.save({validateBeforeSave : false})
}

exports.deleteOrder = async(req,res) => {
    try{
     const order = await Order.findByIdAndDelete(req.params.id)
     if(!order){
        return res.status(404).json({message : "order does not eist"})
     }
    }
    catch(error){
        return res.status(500).json({message : "something went wrong"})
    }
}
