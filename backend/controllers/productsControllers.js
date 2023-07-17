const Product = require("../models/productsmodel");
const productsSchema = require("../models/productsmodel");
const ApiFeatures = require("../utils/apiFeatures");
const errorHandler = require("../utils/errorHandler");
//create a product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Serval Error" });
  }
};

//function for fetching products
exports.getAllProducts = async (req, res) => {
  try {
    const productperpage = 5
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter()
    const products = await apiFeature.query
    

    res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ message: "internal Server Error" });
  }
};

//function for updating products
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: true,
        message: "Product Not Found",
      });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Servor Error!!" });
  }
};
//function for deleting a Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  productsSchema
    .findByIdAndDelete(id)
    .then((product) => {
      res.status(200).json({ message: "Product Data Deleted Successfully !!" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error !!" });
    });
};

//function for fetching a single product

exports.getProductDetails = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    return res.status(500).json({ message: "Bad request" });
  }
};


//testing

exports.testing = async(req,res) => {
    try{
      //console.log(req.query)
      //let products = await Product.find()
      const productcount = await Product.countDocuments()
      const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter()
      const products = await apiFeature.query
      let page = parseInt(req.query.page) 
      let limit = parseInt(req.query.limit) 

      let start = (page - 1) * limit
      let end = page * limit

      const productsresult = products.slice(start,end)
      res.status(200).json({productsresult,productcount})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message : "Internal Servor Error"})
    }
}

exports.createReviews = async (req,res) => {
  try{
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numofreviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.rating = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    return res.status(200).json({
      success: true,
    });

  }
  catch(error){
    return res.status(500).json({message : "something went wrong"})
  }
}

exports.getReviews = async (req,res) => {
  try{
   const product = await Product.findById(req.query.id)

   if(!product){
    return res.status(404).json({message : "Product Not Found"})
   }

   return res.status(200).json({success : true,reviews : product.reviews})
  }
  catch(error){
    return res.status(500).json({messgae : "something went wrong"})
  }
}

exports.deleteReviews = async (req,res) => {
  try{
   const product = await Product.findById(req.query.productid)

   if(!product){
    return res.status(404).json({message : "Product Not Found"})
   }
   
   const reviews = product.reviews.filter(rev=> rev._id.toString() !== req.query.id.toString())
   let avg=0;

   reviews.forEach((rev)=>{
    avg+=rev.rating;
   })

   const rating = avg/reviews.length;
   const numofreviews = reviews.length

   await Product.findByIdAndUpdate(req.query.productid,{reviews,rating,numofreviews},{
    new : true,
    runValidators : true,
    useFindAndModify : false
   })
   return res.status(200).json({message : "Reviews Deleted Successfully"})
  }
  catch(error){
    return res.status(500).json({messgae : "something went wrong"})
  }
}