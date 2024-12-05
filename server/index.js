const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv=require("dotenv")
const {connectToDb}=require("./db/db")
dotenv.config()

const app=express()

connectToDb()

const port=process.env.PORT || 3000

//middlewares
app.use(express.json())
app.use(cookieParser)
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
app.get("/",(req,res) => {
    res.json({msg:"Home route loading"})
})

  app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
  })