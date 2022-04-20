const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel.js');
const User = require("../models/userModel.js");

//@description     Create or fetch One to One Chat
//@route           POST /chat/
//@access          Protected
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pfp username",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  });




  //@description     Fetch all chats for a user
//@route           GET /chat/
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
    try {
      Chat.find( { users: { $elemMatch: { $eq: req.user._id } } })
        .populate({
          path:"users",
          options: { limit: 3 }
        })
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name username pfp",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });





//@description     Fetch all users of a group Chat
//@route           POST /getmembers/
//@access          Protected
const getChatMembers = asyncHandler(async (req, res) => {
  try {
   const results = await Chat.findById(req.body.chatId).select("-updatedAt -createdAt -latestMessage")
      .populate("users", '-password -createdAt -updatedAt')
      .populate("groupAdmin", "-password -createdAt -updatedAt")
      .sort({ updatedAt: -1 })
      res.status(200).send(results);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});









  //@description     Create New Group Chat
//@route           POST /chat/group
//@access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name || !req.body.pfp) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
  
    var users = JSON.parse(req.body.users);
  
    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }
  
    users.push(req.user);
  
    try {
      const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
        pfp:req.body.pfp,
      });
  
      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });


  // @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {

    const { chatId, chatName } = req.body;

    const newChat = await Chat.findById(chatId);
    if(newChat.groupAdmin._id.equals(req.user._id) )
    {
        const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        
        if (!updatedChat) {
        res.status(404);
        throw new Error("Chat Not Found");
        } else {
        res.json(updatedChat);
        }
    }
    else{
        res.status(400)
        throw new Error("Only group admins can rename!")
    }
  

  });



// @desc    Remove user from Group
// @route   PUT /chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {

    const { chatId, userId } = req.body;
  
    

    const newChat = await Chat.findById(chatId);
    if(newChat.groupAdmin._id.equals(req.user._id) ) {
            const removed = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { users: userId },
            },
            {
                new: true,
            }
            )
            .populate("users", "-password -createdAt -updatedAt")
            .populate("groupAdmin", "-password -createdAt -updatedAt");
            
        
            if (!removed) {
            res.status(404);
            throw new Error("Chat Not Found");
            } else {
              res.json(removed);
            }
          
    }
    else{
        res.status(400)
        throw new Error("Only group admins can remove users!")
    }
  
  });



// @desc    Add user to Group / Leave
// @route   PUT /chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    const newChat = await Chat.findById(chatId);
    if(newChat.groupAdmin._id.equals(req.user._id) ) {
  
        const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
        )
    
        if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
        } else {
          const addedUser = await User.findById(userId)
          res.json(addedUser);
      
        }
    }
    else{
        res.status(400)
        throw new Error("Only group admins can add users!")
    }
  
  });
    







module.exports = {accessChat , fetchChats,createGroupChat,renameGroup,removeFromGroup,addToGroup,getChatMembers};