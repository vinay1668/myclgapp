const asyncHandler = require('express-async-handler')
const User = require("../models/userModel.js")
const Post = require('../models/postModel.js')
// @desc    Get all Posts
// @route   GET /posts
// @access   Private

const getPosts = asyncHandler(async (req,res) => {
    const post = await Post.find();
    res.status(200).json(post)
});
// @desc    Create a Post
// @route   CREATE /posts
// @access   Private

const createPost = asyncHandler(async (req,res) => {
    if(!req.body.text)  {
        res.status(400)
        throw new Error('please add a text field')
    }
    const post = await Post.create({
        title: req.body.title,
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json({post})
});

// @desc    Update a Post
// @route   UPDATE /posts/:id
// @access   Private

const updatePost = asyncHandler(async (req,res) => {
    
    const post = await Post.findById(req.params.id)
    if(!post) {
        res.status(400)
        throw new Error('Post not found')
    }
    
    const user = await User.findById(req.user.id)
    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the goal User
    if(post.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedPost)
});

// @desc    Delete a Post
// @route   DELETE /posts/:id
// @access   Private

const deletePost = asyncHandler(async (req,res) => {

    const post = await Post.findById(req.params.id)
    if(!post) {
        res.status(400)
        throw new Error("Post not found")
    }
    const user = await User.findById(req.user.id)
    //check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the goal User
    if(post.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await post.remove()
    res.status(200).json({id: req.params.id})
});

// @desc    Get specified User Posts by Id
// @route   GET /posts/:id
// @access   Private Public


const getUserPosts = asyncHandler(async (req,res) => {
    user = req.params.id;
    const post = await Post.find({user});
    res.status(200).json(post)
});



module.exports ={
    getPosts,
    createPost,
    deletePost,
    updatePost,
    getUserPosts
}
