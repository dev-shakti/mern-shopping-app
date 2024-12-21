const express=require('express')
const { 
    createOrder, 
    capturePayment, 
    getAllOrdersByUser, 
    getOrderDetails 
} = require('../../controllers/shop/order.controller')


const router=express.Router()

router.post("/create",createOrder)
router.post("/capture",capturePayment)
router.get("/get/:userId",getAllOrdersByUser)
router.get("/update/:id",getOrderDetails)

module.exports=router