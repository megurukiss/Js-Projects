const express=require('express')
const router=express.Router()
const Controllers=require('../controllers/main')
const authMiddleware=require('../middleware/auth')

router.get('/dashboard',authMiddleware,Controllers.dashboardController)

router.post('/login',Controllers.loginController);

module.exports=router