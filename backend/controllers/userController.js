const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler');
const { use } = require('../routes/postRoutes.js');

// @desc    Registering User
// @route   POST /users
// @access  Public
const register = asyncHandler(async(req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400)
        throw new Error("please add the required fields")
    }
    // check if user exists
    const userExists = await User.findOne({username})
    if(userExists) {
        res.status(400)
        throw new Error('Username already exists')
    }
    //Hashing password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    
    // create user
    const user = await User.create({
        username: username,
        password: hashedPassword
    })
    if(user){
        res.status(201).json({
            id:user.id,
            username:user.username,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400).json({message:"invalid user data"})
    
    }
})

// @desc    Logging in User
// @route   POST /users/login
// @access  Public
const login = asyncHandler(async(req,res) => {
    const {username, password} = req.body;
    // check for username
    const user = await User.findOne({username})
    if(user && await bcrypt.compare(password, user.password)){
        res.status(201).json({
            id:user.id,
            username:user.username,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400).json({message:'Invalid credentials'})
    }
})

// @desc    Getting my details
// @route   GET /users/me
// @access  Private/Public
const getMe = asyncHandler(async(req,res) => {
    res.status(200).json({
        id: req.user.id,
        username: req.user.username,
    })
})

// @desc    Getting any user details by Id
// @route   GET /users/user/:id
// @access  Private/Public

const getUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id)
    if(!user) {
        res.status(400)
        throw new Error('user not found')
    }
    else {
        res.status(200).json({
            id: user._id,
            username: user.username,
        })
    }
})


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {
    register,
    login,
    getMe,
    getUser

}