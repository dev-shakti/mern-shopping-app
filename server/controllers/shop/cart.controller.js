const User = require("../../models/user.model");
const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    //validation
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      // Add the product to the cart
      cart.items.push({ productId, quantity });
    } else {
      // Update the quantity
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Fetch the user's cart and populate product details
    const cart = await Cart.find({ userId }).populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    //validation
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid data provided." });
    }

    // Ensure the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present !",
      });
    }

    cart.items[findCurrentProductIndex].quantity+=quantity

    await cart.save()
    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: cart,
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    //validation
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    //find cart by userId
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Filter out the product from the cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
