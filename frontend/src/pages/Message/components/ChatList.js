import React,{useState} from 'react'

function ChatList({chat}) {


    const[hovered,setHovered] = useState(false);
    const[messagePane,setMessagePane] = useState(false);

    function sendMessage(userId){
        console.log(userId);
    }
    function entered(){
        setHovered(true);
      }
      function leaved() {
        setHovered(false);
      }

  return (
    <>      
        <div style={{ height:"60px" , borderRadius:"8px",margin:"4px",marginTop:"6px"}} >
            <div style={{display:"flex",backgroundColor: hovered ? "#DAE0E6" : "white",borderRadius:"8px"}} onMouseEnter={entered} onMouseLeave={leaved} onClick={()=>sendMessage(chat.users[1].name)}>
                <img src={chat.users[1].pfp} height="40px" width="40px" style={{borderRadius:"50%",margin:"10px",marginTop:"9px"}}/>
                <div style={{display:"flex", flexDirection:"column",marginTop:"5px"}}>   
                    <b style={{marginLeft:"10px",fontSize:"11px",fontWeight:"700",color:"black",fontFamily:"Poppins"}}>{chat.users[1].name}</b>
                    <b style={{marginLeft:"10px",fontSize:"9px",fontWeight:"700",color:"gray"}}>{chat.users[1].username}</b>  
                    <h6 style={{marginLeft:"10px"}} >Hi!! How are You?</h6>
                </div>  
            </div>      
        </div>                      
</>
  )
}

export default ChatList