const Product = require("../../models/product.model");

const getFilterProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      return res.status(200).json({
        success: true,
        data:products,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  const getProductDetail = async (req, res) => {

    //get productId from req params
    const productId=req.params.id

    try {
      //check if product exist or not
      const product = await Product.findById(productId);
      if(!product){
        return res.status(404).json({
          success: false,
          message:"Product not found"
        });
      }
      return res.status(200).json({
        success: true,
        data:product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

module.exports={getFilterProducts,getProductDetail }