const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler');
// const { use } = require('../routes/postRoutes.js');


// @desc    Registering User
// @route   POST /users
// @access  Public
const register = asyncHandler(async(req,res) => {
    const {username, password, name, pfp, branch} = req.body;
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
        password: hashedPassword,
        name: name,
        pfp: pfp,
        branch: branch,
    })
    if(user){
        res.status(201).json({
            id:user.id,
            username:user.username,
            name: user.name,
            pfp: user.pfp,
            branch: user.branch,
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
            name: user.name,
            pfp: user.pfp,
            branch: user.branch,
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
        name: req.user.name,
        pfp: req.user.pfp,
        branch: req.user.branch,
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
            name: req.user.name,
            pfp: req.user.pfp,
            branch: req.user.branch,
        })
    }
})


// @desc    Getting all users that matches the lettes using regex
// @route   GET /users/allUsers
    //       /users/allUsers?search=19X55A0501
// @access  Private/Public

const getAllUsers = asyncHandler(async(req,res) =>{
    const keyword = req.query.search ?
    {
        $or:[ 
            {name: {$regex :req.query.search , $options : "i"}},
            {username : {$regex: req.query.search, $options : "i"}},
        ],
    } :
    {};

    const user =  await User.find(keyword).find({_id:{$ne: req.user._id}}).select("-password").select("-createdAt").select("-updatedAt")
    res.status(200).send(user)
});


const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}

module.exports = {
    register,
    login,
    getMe,
    getUser,
    getAllUsers,

}