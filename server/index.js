const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDb } = require("./db/db");
const authRoute = require("./routes/auth.route");
const adminProductRoute=require("./routes/admin/product.route")
const shopProductRoute=require("./routes/shop/product.route")
const cartRoute=require("./routes/shop/cart.route")
dotenv.config();

const app = express();

connectToDb();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

//routes
app.use("/api/auth", authRoute);
app.use("/api/admin/products", adminProductRoute);
app.use("/api/shop/products", shopProductRoute);
app.use("/api/shop/cart", cartRoute);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
