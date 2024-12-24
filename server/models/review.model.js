const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: String,
  reviewMessage: String,
  reviewValue: Number,
});

const ProductReview = mongoose.model("ProductReview ", productReviewSchema);
module.exports = ProductReview;