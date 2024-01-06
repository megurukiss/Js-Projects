const jwt=require('jsonwebtoken')
require('dotenv').config()
const UnauthenticatedError=require('../errors/index')

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication invalid');
    }
    try{
        const token=req.headers.authorization.split(' ')[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const {id,name}=decoded;
        req.user={id,name};
        next();
    }catch(err){
        throw new UnauthenticatedError('Authentication invalid');
    }
}
module.exports=authMiddleware;