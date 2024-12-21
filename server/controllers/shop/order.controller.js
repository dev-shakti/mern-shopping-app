const Order = require("../../models/order.model");
const Cart = require("../../models/cart.model");
const product = require("../../models/product.model");
const paypal=require("../../helper/paypal");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Construct the PayPal payment JSON
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          items_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    // Create PayPal payment
    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("PayPal Error:", error);

        return res.status(500).json({
          success: false,
          message: "Error while creating paypal payment",
        });
      } else {
        // Extract approval URL
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;

        if (!approvalURL) {
          return res.status(500).json({
            success: false,
            message: "Failed to get PayPal approval URL.",
          });
        }

        // Create new order in the database
        const newOrder = new Order({
          userId,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
        });

        await newOrder.save();

        return res.status(201).json({
          success: true,
          approvalURL,
          orderId: newOrder._id,
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order=await Order.findById(orderId)

    if(!order){
        return res.status(404).json({
            success: false,
            message: "Order not found",
          });
    }

    order.paymentStatus="paid"
    order.orderStatus="confirmed"
    order.paymentId=paymentId
    order.payerId=payerId

    const getCartId=order.cartId
    await Order.findByIdAndDelete(getCartId)

    await order.save()

    return res.status(200).json({
        success: true,
        message: "Order confirmed",
        data: order,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {

    //getting userId from req params
    const {userId}=req.params
    
    //get orders by userId
    const orders=await Order.find({userId})

    //check if orders are present or not
    if(orders.length===0){
        return res.status(404).json({
            success: false,
            message: "No orders found",
          });
    }

    return res.status(200).json({
        success: true,
        data:orders,
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
     //getting orderId from req params
     const {id}=req.params
    
     //get order by orderId
     const order=await Order.findById(id)
 
     //check if order present or not
     if(!order){
         return res.status(404).json({
             success: false,
             message: "No order found",
           });
     }
 
     return res.status(200).json({
         success: true,
         data:order,
       });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports={
    createOrder,
    capturePayment,
    getAllOrdersByUser,
    getOrderDetails
}
