const mongoose=require('mongoose')

const orderSchema= new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
     cartId: {
        type: String,
        required: true,
      },
      cartItems:[
        {
           productId:{type:String,required:true},
           title:String,
           image:String,
           price:String,
           quantity:Number,
          }
      ] ,
     addressInfo:{
        addressId:{type:String,required:true},
        address:String,
        city:String,
        pincode:String,
        phone:String,
        notes:String,
     },
     orderStatus:String,
     paymentMethod:String,
     paymentStatus:String,
     totalAmount:Number,
     orderDate:Date,
     orderUpdateDate:Date,
     paymentId: String, 
     payerId: String 
    },
  );
  

const Order=mongoose.model("Order",orderSchema)

module.exports=Order