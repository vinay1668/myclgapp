const mongoose = require('mongoose')
const { post } = require('../routes/postRoutes')
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required:[true, 'please add the title of the post']
    },
    text:{
        type:String,
    }
},{timestamps:true,})

module.exports = mongoose.model('Post', postSchema);