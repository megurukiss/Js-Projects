const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        const decoded=jwt.verify(token,process.env.SECRECT)
        const {id,username}=decoded
        req.user={id,username}
        next()
    }catch(error){
        return res.status(401).json({msg:'token expired'})
    }
}

module.exports=authMiddleware