const User = require('../models/User');
const jwt=require('jsonwebtoken');
const {BadRequestError,NotFoundError,UnauthenticatedError} = require('../errors/index');

const registerController = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.create({name, email, password});
    const token=user.createJWT();
    res.status(201).json({user:{name:user.name,id:user._id},token});
};

const loginController = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const user=await User.findOne({email});
    if(!user){
        throw new NotFoundError('No user found with this email');
    }
    if(!user.isPasswordCorrect(password)){
        throw new UnauthenticatedError('Invalid Credentials');
    }
    const token=user.createJWT();
    res.status(200).json({user:{name:user.name,id:user._id},token});
};


module.exports = {loginController, registerController};