const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /message/:chatId
//@access          Protected

const allMessages = asyncHandler(async (req, res) => {

  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name username pfp branch")
      
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name username pfp branch")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name username pfp",
    });

    const resp = await Chat.findByIdAndUpdate(
      {_id:req.body.chatId}, 
      { latestMessage: message },  
                                            
      );
      

      //updating notifications....

      //await Chat.find({_id:req.body.chatId});
      // var chatUsers=chatDetails.users;
      // var otherUser;
      // chatUsers.map((user)=>{
      //   console.log(user)
      // })
      
      // const details = await Chat.findById({_id:req.body.chatId});
      // const notiCount = details.notification[0] ? details.notification[0].count + 1 : 0
      // console.log(notiCount)
      // const notiId = details.notification[0] ? details.notification[0]._id:null
  
      // if(notiId !==null){
      //   await Chat.findByIdAndUpdate(
      //     {_id:req.body.chatId},
      //     {$pull:{notification:notiId}},
      //     {$push :{
      //       "notification":{
      //         Id:req.body.chatId,
      //         count: notiCount ,
      //       }
      //     }
    
      //     }
      //     )
      // }
      // else{
      //   await Chat.findByIdAndUpdate(
      //     {_id:req.body.chatId},
      //     {$push :{
      //       "notification":{
      //         Id:req.body.chatId,
      //         count: 1,
      //       }
      //     }
    
      //     },
      //     )

      // }

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };