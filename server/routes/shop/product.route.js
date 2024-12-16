const express = require("express");
const { 
    getFilterProducts,
     getProductDetail 
    } = require("../../controllers/shop/product.controller");

const router = express.Router();


router.get("/get", getFilterProducts);
router.get("/get/:id", getProductDetail);

module.exports = router;