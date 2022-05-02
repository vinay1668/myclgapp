const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    chatName:{type: String, trim:true},
    isGroupChat:{type:Boolean, default: false},
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',

        },
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },
 
    groupAdmin :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    pfp: {
        type:String,
    },
    // notification:[
    //     {
    //     Id:{type:mongoose.Schema.Types.ObjectId},
    //     count:{type:Number,default:0},
    //     }
    // ]
}
,{ timestamps: true})

const Chat = mongoose.model('Chat', chatModel);

module.exports = Chat;
