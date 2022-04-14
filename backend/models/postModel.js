const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
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
    branch:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required:[true, 'please add the title of the post']
    },
    text:{
        type:String,
    },
    imgHash:{
        type:Array,
    },
    videoHash:{
        type: Array,
    },
    fileHash: [{
            name:String,
            hash:String
        }],
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

module.exports = mongoose.model('Post', postSchema);