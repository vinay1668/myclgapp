import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch, batch} from "react-redux"

function ChatList({chat,startChat}) {


    const[hovered,setHovered] = useState(false);
    const[messagePane,setMessagePane] = useState(false);
    const {user} = useSelector((state) => state.auth);

    const[otherUser,setOtherUser] = useState({
      username:'',
      name:'',
      pfp:''
    })
    

    useEffect(()=>{
      if(user.username == chat.users[1].username ){
        setOtherUser({
          username:chat.users[0].username,
          name:chat.users[0].name,
          pfp:chat.users[0].pfp
        })
      }
      else{
        setOtherUser({
          username:chat.users[1].username,
          name:chat.users[1].name,
          pfp:chat.users[1].pfp
        })

      }


    },[])


    function entered(){
        setHovered(true);
      }
      function leaved() {
        setHovered(false);
      }

  return (
    <>      
        <div style={{ height:"60px" , borderRadius:"8px",margin:"4px",marginTop:"6px"}} >
            <div style={{display:"flex",backgroundColor: hovered ? "#EFFFFD" : "white",borderRadius:"8px",cursor:"pointer"}} onMouseEnter={entered} onMouseLeave={leaved} onClick={()=>startChat(chat)}>
                <img src={chat.chatName == "sender" ? otherUser.pfp : chat.pfp} height="40px" width="40px" style={{borderRadius:"50%",margin:"10px",marginTop:"9px"}}/>
                <div style={{display:"flex", flexDirection:"column",marginTop:"5px"}}>   
                    <b style={{marginLeft:"10px",fontSize:"13px",fontWeight:"700",color:"black",fontFamily:"Poppins"}}>{chat.chatName=="sender" ? otherUser.name : chat.chatName}</b>
                    <b style={{marginLeft:"10px",fontSize:"9px",fontWeight:"700",color:"gray"}}>{chat.chatName == "sender" ? otherUser.username : chat.groupAdmin.username}</b>  
                    <h6 style={{marginLeft:"10px",fontSize:"13px"}} >Hi!! How are You?</h6>
                </div>  
            </div>      
        </div>                      
</>
  )
}

export default ChatList