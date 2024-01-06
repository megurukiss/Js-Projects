const controllers=require('../controllers/products');
const express=require('express');
const router=express.Router();

router.get('/',controllers.getAllProducts);
router.get('/static',controllers.getAllProductsStatic);

module.exports=router;