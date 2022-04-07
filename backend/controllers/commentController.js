const asyncHandler = require('express-async-handler')
const User = require("../models/userModel.js")
const Post = require('../models/postModel.js')
const Comment = require('../models/commentModel.js');

// @desc    Get all Comments for a specific post
// @route   GET /comments
// @access   Private

const getComment = asyncHandler(async(req,res) =>{

    const comments = await Comment.find({
        $and: [
            {"postId": req.body.postId},
            {'parent': null}
        ]
    }).sort({_id:-1});

    

     var modifiedComments = await Promise.all(comments.map(async(comment)=>{
          var replies = await Comment.find({'parent' : comment._id}).sort({_id:-1});
          var modifiedReplies = comment.toObject();
          if(replies.length > 0){
              modifiedReplies.replyNums = replies.length;
          }
          else{
              modifiedReplies.replyNums = 0;
          }
          return modifiedReplies;
    }))
   

    var newComments = modifiedComments.map(function(comment) {
        var temComment = comment
        
        if(temComment.upvotedBy.includes(req.user.id)){
            temComment.upvoted = 1;
            temComment.downvoted = 0
        }
        else if(temComment.downvotedBy.includes(req.user.id)){
            temComment.downvoted = 1;
            temComment.upvoted = 0;
        }
        else {
            temComment.upvoted = 0;
            temComment.downvoted = 0;
        }
       
        delete temComment.upvotedBy;
        delete temComment.downvotedBy;
        return temComment;
    })

    res.status(200).json(newComments);
});


// @desc    Get all replies for a Comment of a specific post
// @route   GET /get/reply
// @access   Private



const getReply = asyncHandler(async(req,res) =>{

    const replies = await Comment.find({'parent': req.body.parentId}).sort({_id:-1});

    //  comments.map(async(comment)=>{
    //       var replies = await Comment.find({'parent' : comment._id}).sort({_id:-1});
    //       if(replies.length>0){
    //       console.log(replies)
    //       }
        
    // })

    var newReplies = replies.map(function(comment) {
        var temComment = comment.toObject();
        
        if(temComment.upvotedBy.includes(req.user.id)){
            temComment.upvoted = 1;
            temComment.downvoted = 0
        }
        else if(temComment.downvotedBy.includes(req.user.id)){
            temComment.downvoted = 1;
            temComment.upvoted = 0;
        }
        else {
            temComment.upvoted = 0;
            temComment.downvoted = 0;
        }    
        delete temComment.upvotedBy;
        delete temComment.downvotedBy;
        return temComment;
    })
    
    res.status(200).json(newReplies);
});





// @desc    Create a comment
// @route   CREATE /comments
// @access   Private

const createComment = asyncHandler(async(req,res) =>{
    var parentId;
    if(req.body.parentId) {
        parentId = req.body.parentId;
    }
    else{
        parentId = null;
    }
    const comment = await Comment.create({
        postId : req.body.postId,
        user:    req.user.id,
        username:req.user.username,
        name: req.user.name,
        pfp: req.user.pfp,
        text: req.body.text,
        votes:0,     
        parent:parentId,
    });
    res.status(200).json(comment);
})



// @desc    Update a Comments vote
// @route   UPDATE /comments/:id
// @access   Private

const updateCommentVotes = asyncHandler(async (req,res) => {
    
    const commentId = req.params.id;
    const comment = await Comment.findById(req.params.id)
    if(!comment) {
        res.status(400)
        throw new Error('Comment not found')
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
    var updatedComment;
    if(req.body.vote == "upvote"){
        const comment = await Comment.findById(commentId);
        if(comment.downvotedBy.includes(req.user.id)){
            updatedComment = await Comment.findOneAndUpdate( 
                {_id: commentId},
                {
                    $push:{upvotedBy:req.user.id},
                    $pull: { downvotedBy: req.user.id },
                    $inc: { votes: 2 } 
               },
               {new: true}
                
            )
        }
        else {
            if(comment.upvotedBy.includes(req.user.id))
            {
                throw new Error('Already Upvoted')
            }
            else {
                updatedComment = await Comment.findOneAndUpdate( 
                    {_id: commentId},
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
        const comment = await Comment.findById(commentId);
        if(comment.upvotedBy.includes(req.user.id)){
            updatedComment = await Comment.findOneAndUpdate( 
                {_id: commentId},
                {
                    $push:{downvotedBy:req.user.id},
                    $pull: { upvotedBy: req.user.id },
                    $inc: { votes: -2 } 
                },
                {new: true}
             
            )
        }
        else {
            if(comment.downvotedBy.includes(req.user.id))
            { 
                throw new Error('Already downvoted')

            }
            else {
                updatedComment = await Comment.findOneAndUpdate( 
                    {_id: commentId},
                    {
                        $push:{downvotedBy:req.user.id},
                        $inc: { votes: -1 } 
                    },
                    {new: true}
                )
            }
        }
    }
    updatedComment = modifyVotesArray(updatedComment,req.user.id)
    res.status(200).json(updatedComment)
});

// modify votes array. takes downvotedBy,upvotedBy arrays and returns single result, used to increase speed.
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


module.exports = {
    getComment,
    getReply,
    createComment,
    updateCommentVotes,
};





