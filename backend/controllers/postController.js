const asyncHandler = require('express-async-handler')
const User = require("../models/userModel.js")
const Post = require('../models/postModel.js')
const Comment = require('../models/commentModel.js');

// @desc    Get all Posts
// @route   GET /posts
// @access   Private

const getPosts = asyncHandler(async (req,res) => {
    
     
     var branch = req.body.branch;
    
    
    if(req.body.type == "new")
    {
        var post;
         if(branch !== 'ALL') {
             if(req.body.feed == 'faculty') {
                post = await Post.find( {$and:[ {'branch': branch}, { username: {$not: {$regex: /\d/} } } ] } ).sort({ createdAt: -1 }).limit(req.body.limit).skip(req.body.skip);
            }
             else {
                post = await Post.find({'branch': branch}).sort({ createdAt: -1 }).limit(req.body.limit).skip(req.body.skip);
             } 
        }
         else {
             if(req.body.feed == 'faculty') {    
                post = await Post.find( {username: {$not: {$regex: /\d/} } } ).sort({ createdAt: -1 }).limit(req.body.limit).skip(req.body.skip);
             }
             else {
                post = await Post.find().sort({ createdAt: -1 }).limit(req.body.limit).skip(req.body.skip);
             }
            
         }
         
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
 
         res.status(200).json(newPosts);
    }
    
   

   //Getting hot posts
   if(req.body.type == "hot")
   {    
       var hotPosts;
       if(branch !== 'ALL') 
       {
           
           if(req.body.feed == 'faculty')
           {
            hotPosts = await Post.aggregate([
                { $match : {$and: [ { branch : branch }, {username : {$not: {$regex: /\d/} }}  ] } },
                {
                    $project: {
                        ratio: { $divide: [ "$votes", {$subtract: [ {"$toLong": "$$NOW" } ,{"$toLong": "$createdAt"}  ] } ]},
                        _id: "$_id",
                        user:"$user",
                        username:"$username",
                        name:"$name",
                        pfp:"$pfp",
                        title:"$title",
                        text:"$text",
                        branch:"$branch",
                        imgHash:"$imgHash",
                        videoHash:"$videoHash",
                        fileHash:"$fileHash",
                        votes:"$votes",
                        upvotedBy:"$upvotedBy",
                        downvotedBy:"$downvotedBy",
                        createdAt:"$createdAt",
                        
                    }
                },
        
                {
                    $sort: { ratio: -1 },
                    
                },
                ]).skip(req.body.skip).limit(req.body.limit);

           }
           else {
               
                hotPosts = await Post.aggregate([
                    { $match : { branch : branch } },
                    {
                        $project: {
                            ratio: { $divide: [ "$votes", {$subtract: [ {"$toLong": "$$NOW" } ,{"$toLong": "$createdAt"}  ] } ]},
                            _id: "$_id",
                            user:"$user",
                            username:"$username",
                            name:"$name",
                            pfp:"$pfp",
                            title:"$title",
                            text:"$text",
                            branch:"$branch",
                            imgHash:"$imgHash",
                            videoHash:"$videoHash",
                            fileHash:"$fileHash",
                            votes:"$votes",
                            upvotedBy:"$upvotedBy",
                            downvotedBy:"$downvotedBy",
                            createdAt:"$createdAt",
                        }
                    },
            
                    {
                        $sort: { ratio: -1 ,
                           
                        },
                        
                        
                    },
                    ]).skip(req.body.skip).limit(req.body.limit);     
           }



       }
       else {
           if(req.body.feed == 'faculty') { 
             hotPosts = await Post.aggregate([
                {$match: { username :{ $not:{ $regex : /\d/ }}}},
                {
                    $project: {
                        ratio: { $divide: [ "$votes", {$subtract: [ {"$toLong": "$$NOW" } ,{"$toLong": "$createdAt"}  ] } ]},
                        _id: "$_id",
                        user:"$user",
                        username:"$username",
                        name:"$name",
                        pfp:"$pfp",
                        title:"$title",
                        text:"$text",
                        branch:"$branch",
                        imgHash:"$imgHash",
                        videoHash:"$videoHash",
                        fileHash:"$fileHash",
                        votes:"$votes",
                        upvotedBy:"$upvotedBy",
                        downvotedBy:"$downvotedBy",
                        createdAt:"$createdAt",
                    }
                },
        
                {
                    $sort: { ratio: -1 },
                    
                },
                ]).skip(req.body.skip).limit(req.body.limit);

           }
           else { 
             
            hotPosts = await Post.aggregate([
                {
                    
                    $project: {
                        ratio: { $divide: [ "$votes", {$subtract: [ {"$toLong": "$$NOW" } ,{"$toLong": "$createdAt"}  ] } ]},
                        _id: "$_id",
                        user:"$user",
                        username:"$username",
                        name:"$name",
                        pfp:"$pfp",
                        title:"$title",
                        text:"$text",
                        branch:"$branch",
                        imgHash:"$imgHash",
                        videoHash:"$videoHash",
                        fileHash:"$fileHash",
                        votes:"$votes",
                        upvotedBy:"$upvotedBy",
                        downvotedBy:"$downvotedBy",
                        createdAt:"$createdAt",
                    }
                },
        
                {
                    $sort: { ratio: -1 },
                    
                },
                ]).skip(req.body.skip).limit(req.body.limit);

           }
            
        }


            var getCommentCountOfPost = await Promise.all(hotPosts.map(async(post)=>{
                var count = await Comment.find({'postId': post._id }).count();
         
                var modifiedCount = post
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
            res.status(200).json(newPosts);
    }


    if(req.body.type == 'Top') {

        
        var post;
        if(branch !== 'ALL'){
            if(req.body.feed == 'faculty'){
                post = await Post.find( {$and:[ {'branch':branch},  {username : {$not: {$regex : /\d/}} } ]} ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
                post = await Post.find({'branch':branch}).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            
        }
        else{
            if(req.body.feed == 'faculty'){
                post = await Post.find({username : {$not: {$regex : /\d/}} } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
                post = await Post.find().sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            

        }
        
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

        res.status(200).json(newPosts);
    }

    if(req.body.type == "Week"){
        var d = new Date();
        d.setDate(d.getDate() -7);
        var post;
        if(branch !== "ALL"){
            if(req.body.feed = 'faculty'){
                post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:d}}, { username: {$not: {$regex: /\d/} } } ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
               post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:d}} ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }      
        }
        else {
            if(req.body.feed == 'faculty'){
                post = await Post.find( {$and:[ { username: {$not: {$regex: /\d/} } } ,{createdAt:{$gte:d}} ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
                post = await Post.find({createdAt:{$gte:d}}).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);

            }
        }

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

        res.status(200).json(newPosts);
    }

    if(req.body.type == "Month"){
        var d = new Date();
        d.setMonth(d.getMonth() - 1);
        var post;

        if(branch !== "ALL"){
            if(req.body.feed == 'faculty'){
                post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:d}}, { username: {$not: {$regex: /\d/} } }  ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
                post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:d}} ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
        }
        else{
            if(req.body.feed == 'faculty'){
                post = await Post.find( {$and :[ { username: {$not: {$regex: /\d/} } } ,{createdAt:{$gte:d}}  ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
               post = await Post.find({createdAt:{$gte:d}}).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
        }
    
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

        res.status(200).json(newPosts);
        





    }

    if(req.body.type == "Year"){
        var d = new Date();
        d.setDate(d.getDate() - 365);
        var post;
        if(branch !== "ALL"){
            if(req.body.feed == 'faculty') {
                post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:d}}, { username: {$not: {$regex: /\d/} } }  ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
               post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:d}} ] } ).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }       
        }

        else {
            if(req.body.feed  == 'faculty'){
                post = await Post.find(  {$and: [ { username: {$not: {$regex: /\d/} } }  ,{createdAt:{$gte:d}} ] }).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
               post = await Post.find({createdAt:{$gte:d}}).sort({ votes: -1, createdAt:-1 }).limit(req.body.limit).skip(req.body.skip);
            }
        }

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

        res.status(200).json(newPosts);
    }
    // filter by date 
    if(/^[A-Za-z]{4}\d{4}$/.test(req.body.type)){

        var lastFour = req.body.type.substr(req.body.type.length - 4)
        var year = '20'+ lastFour.substr(0,2)
        var month = Number(lastFour.substr(2,4));
        var date = new Date();
        date.setYear(year);
        date.setMonth(month-1);


        var post;
        if(branch !== "ALL"){
            if(req.body.feed == 'faculty') {
                post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:date}}, { username: {$not: {$regex: /\d/} } }  ] } ).sort( { createdAt:1,votes: -1  } ).limit(req.body.limit).skip(req.body.skip);
            }
            else {
                post = await Post.find(  { $and :[ {'branch' :branch} , {createdAt:{$gte:date}} ] } ).sort( { createdAt:1,votes: -1  } ).limit(req.body.limit).skip(req.body.skip);

            }
        }
        else {
            if(req.body.feed == 'faculty') {
                post = await Post.find( {$and:[ {createdAt:{$gte:date}}, { username: {$not: {$regex: /\d/} } }  ]} ).sort({  createdAt:1,votes: -1 }).limit(req.body.limit).skip(req.body.skip);
            }
            else {
                post = await Post.find({createdAt:{$gte:date}}).sort({  createdAt:1,votes: -1 }).limit(req.body.limit).skip(req.body.skip);
            }     
        }

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

        res.status(200).json(newPosts);
        
        
    }

  




   


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
        branch:req.user.branch,
        username:req.user.username,
        pfp: req.user.pfp,
        
    })
    const newUser = await User.findOneAndUpdate( 
        {_id: req.user.id},
        {
            $inc: { postcount: 1 } 
       },
       {new: true}
        
    )
    
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
    var newUser;
    if(req.body.vote == "upvote"){
        const post = await Post.findById(postId);
        if(post.downvotedBy.includes(req.user.id))
        {
            updatedPost = await Post.findOneAndUpdate( 
                {_id: postId},
                {
                    $push:{upvotedBy:req.user.id},
                    $pull: { downvotedBy: req.user.id },
                    $inc: { votes: 2 } 
               },
               {new: true}     
            )
            newUser = await User.findOneAndUpdate( 
                {_id: post.user},
                {
                    $inc: { likecount: 2 } 
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
                newUser = await User.findOneAndUpdate( 
                    {_id: post.user},
                    {
                        $inc: { likecount: 1 } 
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
            newUser = await User.findOneAndUpdate( 
                {_id: post.user},
                {
                    $inc: { likecount: -2 } 
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
                newUser = await User.findOneAndUpdate( 
                    {_id: post.user},
                    {
                        $inc: { likecount: -1 } 
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
    var post;
    
    if(req.body.type == 'New'){
        post = await Post.find({"user": userId}).sort({ _id: -1 }).limit(req.body.limit).skip(req.body.skip);
    }
    if(req.body.type == 'Old'){
        post = await Post.find({"user": userId}).sort({ _id: 1}).limit(req.body.limit).skip(req.body.skip);

    }
    if(req.body.type == 'Top'){
        post = await Post.find({"user": userId}).sort( {votes: -1 } ).limit(req.body.limit).skip(req.body.skip);

    }
    if(/^[A-Za-z]{4}\d{4}$/.test(req.body.type)){

        var lastFour = req.body.type.substr(req.body.type.length - 4)
        var year = '20'+ lastFour.substr(0,2)
        var month = Number(lastFour.substr(2,4));
        var date = new Date();
        date.setYear(year);
        date.setMonth(month-1);

    post = await Post.find(  {createdAt:{$gte:date}} ).sort( { createdAt:1 } ).limit(req.body.limit).skip(req.body.skip);

    }


    
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
