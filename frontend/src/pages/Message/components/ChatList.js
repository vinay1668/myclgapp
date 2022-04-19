import React,{useState,useEffect} from 'react'

function ChatList({chat,startChat}) {


    const[hovered,setHovered] = useState(false);
    const[messagePane,setMessagePane] = useState(false);
    


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
                <img src={chat.chatName == "sender" ? chat.users[1].pfp : chat.pfp} height="40px" width="40px" style={{borderRadius:"50%",margin:"10px",marginTop:"9px"}}/>
                <div style={{display:"flex", flexDirection:"column",marginTop:"5px"}}>   
                    <b style={{marginLeft:"10px",fontSize:"13px",fontWeight:"700",color:"black",fontFamily:"Poppins"}}>{chat.chatName=="sender" ? chat.users[1].name : chat.chatName}</b>
                    <b style={{marginLeft:"10px",fontSize:"9px",fontWeight:"700",color:"gray"}}>{chat.chatName == "sender" ? chat.users[1].username : chat.groupAdmin.username}</b>  
                    <h6 style={{marginLeft:"10px",fontSize:"13px"}} >Hi!! How are You?</h6>
                </div>  
            </div>      
        </div>                      
</>
  )
}

export default ChatList