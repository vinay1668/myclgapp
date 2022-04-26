import ViewGroup from './ViewGroup';
import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch,} from "react-redux"
import {sendMessage,fetchMessages,appendMessage} from "../../../features/messages/messageSlice.js"
import ScrollableFeed from "react-scrollable-feed"
import {getGroupMembers} from "../../../features/chat/chatSlice.js"
import moment from 'moment';
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

var socket,selectedChatCompare;




function SendMessage({chatDetails,endChat,showGroup}) {

  const dispatch = useDispatch();
  const {chats} = useSelector((state) => state.chat);
  const {messagesList} = useSelector((state) => state.messages);
  const[messageListy,setMessageListy] = useState([])
  const[detailsy,setDetailsy] = useState(chatDetails)
  const[socketConnected,setSocketConnected] = useState(false);
  const[messageRecieved,setMessageRecieved] = useState('');




  
  useEffect(() => {
  
    
    setDetailsy(chats.find(item => item._id === chatDetails._id) )
    dispatch(fetchMessages(chatDetails._id))
    selectedChatCompare=chatDetails;


    },[])





 



    const {user} = useSelector((state) => state.auth);

    const[otherUser,setOtherUser] = useState({
      username:'',
      name:'',
      pfp:''
    })
    

    useEffect(()=>{
      if(user.username == chatDetails.users[1].username ){
        setOtherUser({
          username:chatDetails.users[0].username,
          name:chatDetails.users[0].name,
          pfp:chatDetails.users[0].pfp
        })
      }
      else{
        setOtherUser({
          username:chatDetails.users[1].username,
          name:chatDetails.users[1].name,
          pfp:chatDetails.users[1].pfp
        })

      }


    },[])






    useEffect(()=>{

      socket = io(ENDPOINT)
      socket.emit('setup',user);
   
      socket.on("connection",()=>{
        setSocketConnected(true);
       
      }
        )
      

    },[])

   
    useEffect(()=>{
      console.log(messagesList)
    },[messagesList])


    useEffect(()=>{
      if(chatDetails){
        socket.emit('join chat', chatDetails._id)

      }

    },[chatDetails])



    useEffect(()=>{
      socket.on('message',(newMessageRecieved)=>{
        //
        
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
          //give notification
          
        }
        else{
          
          // setMessageListy((prevState)=>({
          //   ...prevState,
          //   newMessageRecieved
          // }));
          dispatch(appendMessage(newMessageRecieved))
        }
        })

    },[socket])







function viewGroup(chat){
  if(chatDetails.chatName !== "sender") { 
     showGroup(chat)
  }
}

const[doMessage,setDoMessage] = useState('');

function messageChange(e){
  setDoMessage(e.target.value);
}


 async function sendText() {
  const data ={
    content: doMessage,
    chatId: chatDetails._id
  }

  const res =  await dispatch(sendMessage(data));
  socket.emit('new message',res.payload)
  setDoMessage("")
}

function trySending(e){
  if(e.key == "Enter"){
    sendText();
  }
}

    
  return (
    
    <div className = "chats" style={{position:"absolute",marginTop:"6px",backgroundColor:"white",borderRadius:"8px",height:"89%",width:"100%",paddingTop:"2px",overflowY:"auto", borderColor:"white",borderStyle:"solid",borderWidth:"2px"}}>
      <div style={{borderRadius:"8px",height:"90%"}}>
          
          {/* Chat Header */}
          <div style={{display:'flex',backgroundColor:"#DAE0E6",width:"98%",height:"50px",borderRadius:"8px",margin:"0 auto",}}>    
             <img src={chatDetails.chatName == "sender" ? otherUser.pfp : chatDetails.pfp} style={{width:"40px",height:"40px",borderRadius:"50%",margin:"6px",cursor:"pointer"}} onClick={()=>viewGroup(chatDetails)} />
             <div style={{display:"flex",flexDirection:"column",marginTop:"10px",cursor:"pointer"}} onClick={()=>viewGroup(chatDetails)} >
               <b style={{marginLeft:"10px",fontSize:"13px",fontWeight:"700",color:"black",fontFamily:"Poppins"}} >{chatDetails.chatName=="sender" ? otherUser.name : detailsy.chatName}</b>
               <b style={{marginLeft:"10px",fontSize:"11px",fontWeight:"700",color:"gray"}}>{chatDetails.chatName == "sender" ? otherUser.username : null}</b>  
             </div>
             <i onClick={endChat} style={{cursor:"pointer",position:"absolute",right:"18px",top:"15px",fontSize:"25px"}} class="fa-solid fa-arrow-left"></i>  
          </div>

          {/* Real Chatting */}

          <ScrollableFeed style={{height:"100%"}}className='chats'>
          <div style={{minHeight:"88%",height:"auto", width:"98%",border:"2px solid #DAE0E6",borderRadius:"8px",margin:'0 auto',marginTop:"4px"}}>
          
             {messagesList.length > 0 ? (

                messagesList.map((message,index,array)=>(
                
                <div style={{marginTop:"5px",marginLeft:"5px",display:"flex"}}>
                  
                  {array[index-1] && array[index-1].sender.username === message.sender.username ? 
                  <div style={{width:"35px",marginBottom: array[index+1] ? "0"  :"30px"}}></div>
                  :
                  <img src={message.sender.pfp} style={{height:"35px",width:"35px",borderRadius:"50%",marginTop:"4px",marginBottom: array[index+1] ? "0"  :"30px"}}/> }
                
                  
                  <div style={{marginLeft:"8px",display:'flex',flexDirection:"column",marginTop:"0"}}>
                     {array[index-1] && array[index-1].sender.username === message.sender.username ? 
                      <div></div>:
                      (chatDetails.isGroupChat ?

                      <div style={{display:"flex",flexDirection:"column"}}>
                        <di style={{marginBottom:'0' ,display:"flex"}}>
                          <span style={{fontSize:"14px",fontWeight:"600",color:"#069A8E",marginBottom:"0"}}>{message.sender.name}</span>
                          <span style={{fontSize:"8px",fontWeight:"600",color:"grey",marginBottom:"0",marginTop:"6px",marginLeft:"8px"}}>{moment(message.createdAt).fromNow()}</span>
                        </di>
                        <span style={{fontSize:"8px",fontWeight:"700",color:"#294A66",marginBottom:"0",wordSpacing:"5px"}}>{message.sender.username}  {message.sender.branch}</span>
                      </div> :
                      <di style={{marginBottom:'0' ,display:"flex"}}>
                        <span style={{fontSize:"14px",fontWeight:"600",color:"#069A8E",marginBottom:"0"}}>{message.sender.name}</span>
                        <span style={{fontSize:"8px",fontWeight:"600",color:"grey",marginBottom:"0",marginTop:"6px",marginLeft:"8px"}}>{moment(message.createdAt).fromNow()}</span>
                      </di>
                        
                      )
                      

                     }
                    <span style={{fontSize:"13px",fontWeight:"500",color:"#2C3333",lineHeight:"15px"}}>{message.content}</span>
                  </div>

                
               </div>
                      
                  

                  ))
                    
                  

               
             
             ) : (null)}
            
          </div>
          </ScrollableFeed>
       
        
        {/* Send Messages */}
          <div style={{display:"flex",width:"98%",marginLeft:"5px",marginTop:"0", marginTop:"5px"}}>
           <input style ={{height:"35px",width:"100%",marginTop:"5px"}} className="form-control input-sm search-username" placeholder = "Message.." value={doMessage} onChange={(e)=>messageChange(e)} onKeyPress={(e) => trySending(e)}  type="text"/>    
           <button onClick={sendText} style={{height:"35px",marginTop:"5px",marginLeft:"5px"}} className='btn btn-primary'>
              <i class="bi bi-send"></i>
           </button>
          </div>
         
      </div>  


    </div>
  )
}

export default SendMessage