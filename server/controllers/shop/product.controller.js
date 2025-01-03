const Product = require("../../models/product.model");

const getFilterProducts = async (req, res) => {
    try {
      const { category = "", brand = "", sortBy = "price-lowtohigh" } = {
        category: req.query.Category || "",
        brand: req.query.Brand || "",
        sortBy: req.query.sortBy || "price-lowtohigh",
      };

      let filters = {};

      if (category.length) {
        filters.category = { $in: category.split(",") };
      }
  
      if (brand.length) {
        filters.brand = { $in: brand.split(",") };
      }
      
      let sort = {};

      switch (sortBy) {
        case "price-lowtohigh":
          sort.price = 1;
  
          break;
        case "price-hightolow":
          sort.price = -1;
  
          break;
        case "title-atoz":
          sort.title = 1;
  
          break;
  
        case "title-ztoa":
          sort.title = -1;
  
          break;
  
        default:
          sort.price = 1;
          break;
      }

      const products = await Product.find(filters).sort(sort);
      
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