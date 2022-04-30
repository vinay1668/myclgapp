const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
     username:{
        type: String,
        required: [true,'Please add a name'],
        unique:true
     },
     password: {
        type: String,
         required:[true, 'Please add password']
     },
     name:{
        type: String,
        required:[true, 'Please add name']

     },
     pfp: {
        type: String,
        required:[true, 'Please add link to pfp']

     },
     branch: {
        type:String,
     },
     description :{
        type:String,
        default: 'guitarist'
     },
     postcount:{
        type:Number,
        default:0
     },
     likecount:{
        type:Number,
        default:0
     },

},{timestamps:true})

module.exports = mongoose.model('User', userSchema)