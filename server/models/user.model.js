const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
    {
      userName: {
        type: String,
        required: [true, "Username must be at least 3 characters long."],
        minlength: [3, "Username must be at least 3 characters long."],
        unique: true,
      },
      email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [6, "Password must be at least 6 characters long."],
      },
      role: {
        type: String,
        default: "user",
      },
    },
    { timestamps: true }
  );

const User=mongoose.model("User",userSchema)
module.exports=User