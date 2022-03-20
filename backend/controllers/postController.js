const asyncHandler = require('express-async-handler')
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
    })
    res.status(200).json({post})
});

// @desc    Update a Post
// @route   UPDATE /posts/:id
// @access   Private

const updatePost = asyncHandler(async (req,res) => {
    
    const post = Post.findById(req.params.id)
    if(!post) {
        res.status(400)
        throw new Error('Post not found')
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
    await post.remove()
    res.status(200).json({id: req.params.id})
});

module.exports ={
    getPosts,
    createPost,
    deletePost,
    updatePost
}
