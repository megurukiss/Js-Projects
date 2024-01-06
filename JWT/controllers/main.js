require('dotenv').config();
const jwt = require('jsonwebtoken');

const loginController = (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ msg: 'please provide username and password' })
    }
    //res.send('login route')
    const id = new Date().getDate()
    const token=jwt.sign({id,username},process.env.SECRECT,{expiresIn:'1h'})
    res.status(200).json({msg:'user created',token})
}

const dashboardController = (req, res) => {
    //res.send('dashboard')
    const luckyNumber=Math.floor(Math.random()*100)
    res.status(200).json({msg:`hello ${req.user.username}`,secret:`your lucky number is ${luckyNumber}`})
}

module.exports = {
    loginController,
    dashboardController
}