const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDb } = require("./db/db");
const authRoute = require("./routes/auth.route");
const adminProductRoute=require("./routes/admin/product.route")
const adminOrderRoute=require("./routes/admin/order.route")

const shopProductRoute=require("./routes/shop/product.route")
const cartRoute=require("./routes/shop/cart.route")
const addressRoute=require("./routes/shop/address.route")
const orderRoute=require("./routes/shop/order.route")
const reviewRoute=require("./routes/shop/productReview.route")
const searchRoute=require("./routes/shop/searchProducts.route")
dotenv.config();

const app = express();

connectToDb();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === "production";

const corsOrigin = isProduction
  ? process.env.CLIENT_BASE_URL_PROD
  : process.env.CLIENT_BASE_URL_DEV;

app.use(
  cors({
    origin:corsOrigin,
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
app.use("/api/admin/orders", adminOrderRoute);

app.use("/api/shop/products", shopProductRoute);
app.use("/api/shop/cart", cartRoute);
app.use("/api/shop/address", addressRoute);
app.use("/api/shop/order", orderRoute);
app.use("/api/shop/review", reviewRoute);
app.use("/api/shop/search", searchRoute);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
