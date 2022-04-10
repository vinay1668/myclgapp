const asyncHandler = require('express-async-handler')
const User = require("../models/userModel.js")
const Post = require('../models/postModel.js')
const Comment = require('../models/commentModel.js');
// @desc    Get all Posts
// @route   GET /posts
// @access   Private

const getPosts = asyncHandler(async (req,res) => {


   //Getting hot posts

    // const hot = await Post.aggregate([
    //     {
    //         $project: {
    //             ratio: { $divide: [ "$votes", {$subtract: [ {"$toLong": "$$NOW" } ,{"$toLong": "$createdAt"}  ] } ]},
    //             text : "$title"
    //         }
    //     },
   
    //     {
    //         $sort: { ratio: -1 },
    //     }
    //     ]).limit(5);

    // console.log(hot);


    // Top filter for month

    // var d = new Date();
    // d.setMonth(d.getMonth() - 1); //1 month ago
    // db.data.find({created:{$gte:d}}); //change "data" for your collection's name

    //Top filter for day 
    
    // var d = new Date();
    // d.setDate(d.getDate() -1);
    
    // const topOfDay = await Post.find({createdAt:{$gte:d}}).sort({_id:-1})
    // console.log(topOfDay)


    //Top filter for the year

    // var d = new Date();
    // d.setDate(d.getDate() -365);
    
   //const topOfYear = await Post.find({createdAt:{$gte:d}}).sort({_id:-1})
    // console.log(d)

    
    

   

    

    const post = await Post.find().sort({ _id: -1 }).limit(req.body.limit).skip(req.body.skip);


    var getCommentCountOfPost = await Promise.all(post.map(async(post)=>{
        var count = await Comment.find({'postId': post._id }).count();
        var modifiedCount = post.toObject();
        modifiedCount.commentCount = count;
        return modifiedCount;
  }))
  

    var newPosts = getCommentCountOfPost.map(function(post) {
        var temPost = post;
        if(temPost.upvotedBy.includes(req.user.id)){
            temPost.upvoted = 1;
            temPost.downvoted = 0
        }
        else if(temPost.downvotedBy.includes(req.user.id)){
            temPost.downvoted = 1;
            temPost.upvoted = 0;
        }
        else {
            temPost.upvoted = 0;
            temPost.downvoted = 0;
        }
        delete temPost.upvotedBy;
        delete temPost.downvotedBy;
        return temPost;
    })

   //return new post
    res.status(200).json(newPosts);
});
// @desc    Create a Post
// @route   CREATE /posts
// @access   Private

const createPost = asyncHandler(async (req,res) => {
    

    if(!req.body.title)  {
        res.status(400)
        throw new Error('please add a title field')
    }
    const post = await Post.create({
        title: req.body.title,
        text: req.body.text,
        imgHash: req.body.imgHash,
        videoHash: req.body.videoHash,
        fileHash:req.body.fileHash,
        votes:0,
        user: req.user.id,
        name: req.user.name,
        username:req.user.username,
        pfp: req.user.pfp,
    })

    res.status(200).json(post);
});

// @desc    Update a Post
// @route   UPDATE /posts/:id
// @access   Private

const updatePostVotes = asyncHandler(async (req,res) => {
    
    const postId = req.params.id;
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
    // if(post.user.toString() !== user.id){
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }
    var updatedPost;
    if(req.body.vote == "upvote"){
        const post = await Post.findById(postId);
        if(post.downvotedBy.includes(req.user.id)){
            updatedPost = await Post.findOneAndUpdate( 
                {_id: postId},
                {
                    $push:{upvotedBy:req.user.id},
                    $pull: { downvotedBy: req.user.id },
                    $inc: { votes: 2 } 
               },
               {new: true}
                
            )
        }
        else {
            if(post.upvotedBy.includes(req.user.id))
            {
                throw new Error('Already Upvoted')
            }
            else {
                updatedPost = await Post.findOneAndUpdate( 
                    {_id: postId},
                    {
                        $push:  {upvotedBy:req.user.id} ,
                        $inc: { votes: 1 } 
                    },
                    {new: true}
    
                ) 
            } 
        }
    }
    if(req.body.vote == "downvote") {
        const post = await Post.findById(postId);
        if(post.upvotedBy.includes(req.user.id)){
            updatedPost = await Post.findOneAndUpdate( 
                {_id: postId},
                {
                    $push:{downvotedBy:req.user.id},
                    $pull: { upvotedBy: req.user.id },
                    $inc: { votes: -2 } 
                },
                {new: true}
             
            )
        }
        else {
            if(post.downvotedBy.includes(req.user.id))
            { 
                throw new Error('Already downvoted')

            }
            else {
                updatedPost = await Post.findOneAndUpdate( 
                    {_id: postId},
                    {
                        $push:{downvotedBy:req.user.id},
                        $inc: { votes: -1 } 
                    },
                    {new: true}
                )
            }
        }
    }
    updatedPost = modifyVotesArray(updatedPost,req.user.id)
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
    var userId;
    if(req.body.id == req.user.id){
        userId = req.user.id;
    }
    else{
        userId = req.body.id;

    }
    console.log(req.body.limit);
    console.log(req.body.skip)
    const post = await Post.find({"user": userId}).sort({ _id: -1 }).limit(req.body.limit).skip(req.body.skip);
    
    var newPosts = post.map(function(post) {
        var temPost = post.toObject();
        if(temPost.upvotedBy.includes(req.user.id)){
            temPost.upvoted = 1;
            temPost.downvoted = 0
        }
        else if(temPost.downvotedBy.includes(req.user.id)){
            temPost.downvoted = 1;
            temPost.upvoted = 0;
        }
        else {
            temPost.upvoted = 0;
            temPost.downvoted = 0;
        }
        delete temPost.upvotedBy;
        delete temPost.downvotedBy;
        return temPost;
    })

   //return new post
    res.status(200).json(newPosts);
    
});




const modifyVotesArray = (post,id) =>{
        var temPost = post.toObject();
        if(temPost.upvotedBy.includes(id)){
            temPost.upvoted = 1;
            temPost.downvoted = 0
        }
        else if(temPost.downvotedBy.includes(id)){
            temPost.downvoted = 1;
            temPost.upvoted = 0;
        }
        else {
            temPost.upvoted = 0;
            temPost.downvoted = 0;
        }
        delete temPost.upvotedBy;
        delete temPost.downvotedBy;
        return temPost;

} 



module.exports ={
    getPosts,
    createPost,
    deletePost,
    updatePostVotes,
    getUserPosts
}
