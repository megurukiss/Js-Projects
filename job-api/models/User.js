const mongoose = require('mongoose');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        maxlength:[50,'Name cannot be more than 50 characters'],
    },
    email:{
        type:String,
        required:[true,'Please provide a email'],
        unique:true,
        // maxlength:[50,'Email cannot be more than 50 characters'],
        match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email'],
    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:[6,'Password cannot be less than 6 characters'],
        maxlength:[50,'Password cannot be more than 50 characters'],
    },
})

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

UserSchema.methods.createJWT=function(){
    const token=jwt.sign({id:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}

UserSchema.methods.isPasswordCorrect=async function(inputPassword){
    const isMatch=await bcrypt.compare(inputPassword,this.password);
    return isMatch;
}
module.exports = mongoose.model('User',UserSchema);