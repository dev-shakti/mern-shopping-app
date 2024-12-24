const Order = require("../../models/orders.model");
const ProductReview = require("../../models/review.model");
const Product = require("../../models/product.model");

const addProductReview = async (req, res) => {
  try {
    const { userId, productId, userName, reviewMessage, reviewValue } =
      req.body;
      
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase product to review it.",
      });
    }

    const checkExistingReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product!",
      });
    }

    const newReview = new ProductReview({
      userId,
      productId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();
    console.log(newReview.userName)
    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId,{averageReview},{new:true})

    res.status(201).json({
      success: true,
      data: newReview,
      message:"Reviews added successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
   const { productId } = req.params;

   const reviews=await ProductReview.find({productId})

   if(reviews.length===0){
      return res.status(400).json({
         success: false,
         message: "Reviews not found",
       });
   }

   return res.status(200).json({
      success: true,
      data:reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addProductReview,
  getProductReviews,
};
