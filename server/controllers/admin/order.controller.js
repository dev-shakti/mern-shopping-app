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

module.exports={
    getAllOrdersByAdmin,
    getOrderDetailsByAdmin
}
