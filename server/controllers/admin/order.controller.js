const Order = require("../../models/orders.model");

const getAllOrdersByAdmin = async (req, res) => {
  try {
    //get orders for all users
    const orders = await Order.find();

    //check if orders are present or not
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetailsByAdmin = async (req, res) => {
  try {
    //getting orderId from req params
    const { id } = req.params;

    //get order by orderId
    const order = await Order.findById(id);

    //check if order present or not
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }

    return res.status(200).json({
      success: true,
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


const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const {orderStatus}=req.body;

     // Find the order by ID
     const order = await Order.findById(id);

     // Check if the order exists
     if (!order) {
       return res.status(404).json({
         success: false,
         message: "No order found",
       });
     }
 
     // Update the order status
     order.orderStatus = orderStatus;
 
     // Save the updated order
     await order.save();

    return res.status(200).json({
      success: true,
      data:order,
      message:"Order status updated successfully"
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
    getAllOrdersByAdmin,
    getOrderDetailsByAdmin,
    updateOrderStatus
}
