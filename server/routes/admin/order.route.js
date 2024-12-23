const express=require('express')
const { 
    getAllOrdersByAdmin, 
    getOrderDetailsByAdmin 
} = require('../../controllers/admin/order.controller')


const router=express.Router()

router.get("/get",getAllOrdersByAdmin)
router.get("/details/:id",getOrderDetailsByAdmin)

module.exports=router