const express = require("express");
const { registerUser, loginUser, logoutUser, verifyUser } = require("../controllers/auth.controller");

const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/verify",verifyUser)

module.exports=router