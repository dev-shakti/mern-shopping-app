const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDb } = require("./db/db");
const authRoute = require("./routes/auth.route");
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

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
