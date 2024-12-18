const mongoose=require('mongoose')

const addressSchema = new mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pincode: {
        type: String, 
        required: true,
      },
      phone: {
        type: String, 
        required: true,
      },
      notes: {
        type: String,
        default: '', 
      },
    },
    { timestamps: true }
  );
  

const Address=mongoose.model("Address",addressSchema)

module.exports=Address