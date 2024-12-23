const express=require('express')
const { 
    getAllOrdersByAdmin, 
    getOrderDetailsByAdmin,
    updateOrderStatus, 
    
} = require('../../controllers/admin/order.controller')


const router=express.Router()

router.get("/get",getAllOrdersByAdmin)
router.get("/details/:id",getOrderDetailsByAdmin)
router.put("/update/:id", updateOrderStatus)

module.exports=router