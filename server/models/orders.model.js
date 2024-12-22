const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  cartItems: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
      title: String,
      image: String,
      price: String,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
