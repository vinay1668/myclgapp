const path = require("path")
const express = require('express')
const colors= require('colors');
const dotenv = require('dotenv').config()
const {errorHandler } = require("./middleware/errorMiddleware.js")
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;


connectDB();
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.use('/posts', require('./routes/postRoutes.js'))
app.use('/users', require('./routes/userRoutes.js'))
app.use('/comments',require('./routes/commentRoute.js'))
app.use('/chat', require('./routes/chatRoutes.js'))
app.use('/message',require('./routes/messageRoutes.js'))


// server frontend

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
}


app.use(errorHandler)
const server = app.listen(port,() => console.log(`server started on port ${port}.`))

const io = require('socket.io')(server, {
  pingTimeout:60000,
  cors: {
    origin:"http://localhost:3000",
  },
});

io.on("connection",(socket)=>{

  console.log("connected to socket.io");

  socket.on('setup',(userData)=>{
    
    socket.join(userData._id);
    socket.emit("connected");
  });


  socket.on('join chat',(room)=>{
    socket.join(room);
    console.log('user joined room: ' + room);
  });


  //Typing indicators
  // socket.on('typing',(room)=>socket.in(room).emit('typing'))
  // socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))



  socket.on('new message',(newMessageRecieved) =>{
   
    var chat = newMessageRecieved.chat;
    if(!chat.users) return console.log('chat.users are not defined')
     socket.to(chat._id).emit('message',newMessageRecieved);
  

  })

  socket.off('setup',()=>{
    console.log('User Disconnected');
    socket.leave(userData._id)
  })



});