const Product = require('../models/productsmodel')
const productsSchema = require('../models/productsmodel')
//create a product 
exports.createProduct = async(req,res)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success : true,
        product
    })
}

//function for fetching products
exports.getAllProducts = async (req,res) =>{
    const products = await Product.find()
    res.status(200).json({success : true,products})
}

//function for updating products
exports.updateProduct = async (req,res) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : true,
            message : "Product Not Found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators:true,useFindAndModify : false})
    res.status(200).json({
        success : true,
        product
    })

}
//function for deleting a Product
exports.deleteProduct = async(req,res) =>{
    const {id} = req.params;
    productsSchema.findByIdAndDelete(id).then((product)=>{
        res.status(200).json({message : "Income Data Deleted Successfully !!"})
    }).catch((error)=>{
        res.status(500).json({message : "Server Error !!"})
    })
}

//function for fetching a single product

exports.getProductDetails = async(req,res) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success : true,
            message : "Product Not Found"
        })
    }
    res.status(200).json({success:true,message : "product found successfully"})
}