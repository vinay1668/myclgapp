const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    postId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
    },
    parent : {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    username:{
        type: mongoose.Schema.Types.String,
        required:true,
        ref: 'User',
    },
    name:{
        type: mongoose.Schema.Types.String,
        required:true,
        ref: 'User',
    },
    pfp:{
        type: mongoose.Schema.Types.String,
        required:true,
        ref: 'User',
    },
    text:{
        type:String,
    },
    votes: {
        type:Number,
    },
    upvotedBy: {
        type:Array,
    },
    downvotedBy: {
        type: Array,
    }


},{timestamps:true,})

module.exports = mongoose.model('Comment', commentSchema);