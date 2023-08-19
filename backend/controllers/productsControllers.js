const Product = require("../models/productsmodel");
const productsSchema = require("../models/productsmodel");
const ApiFeatures = require("../utils/apiFeatures");
const errorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary")
//create a product
exports.createProduct = async (req, res) => {
  try {
    let images =[]
    if(typeof req.body.images === "string"){
      images.push(req.body.images)
    }
    else{
    images = req.body.images
    }

    const imagesLink=[]
    for(let i=0;i<images.length;i++){
      const result = await cloudinary.v2.uploader.upload(images[i],{folder:"products"})
      imagesLink.push({
        public_id : result.public_id,
        url : result.secure_url
      })
    }
    req.body.images = imagesLink
    const product = await Product.create(req.body);
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
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

exports.getAdminProducts = async (req, res) => {
  try {
    
    const products = await Product.find()
    

    res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ message: "internal Server Error" });
  }
}

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
    let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

    req.body.images = imagesLinks;
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error is ${error}` });
  }
};
//function for deleting a Product
exports.deleteProduct = async (req, res) => {

  const { id } = req.params;

  try {
    const product = await Product.findById(id); // Fetch product details from the database

    // Delete product images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Product Data Deleted Successfully !!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error !!" });
  }
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
    return res.status(500).json({message : "something went wrong"})
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