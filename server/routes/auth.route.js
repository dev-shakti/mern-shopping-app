const express = require("express");
const { registerUser, loginUser, logoutUser, verifyUser } = require("../controllers/auth.controller");
const {isAutheticated}=require("../middleware/auth.middleware")
const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/verify",isAutheticated,verifyUser)

module.exports=router