import ViewGroup from './ViewGroup';
import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch,} from "react-redux"




function SendMessage({chatDetails,endChat,showGroup}) {


  const {chats} = useSelector((state) => state.chat);
  const[detailsy,setDetailsy] = useState(chatDetails)
  useEffect(() => {
    setDetailsy(chats.find(item => item._id === chatDetails._id) )
 
    },[])

function viewGroup(chat){
  if(chatDetails.chatName !== "sender"){
     showGroup(chat)
  }
}

    
  return (
    
    <div className = "chats" style={{position:"absolute",marginTop:"6px",backgroundColor:"white",borderRadius:"8px",height:"89%",width:"100%",paddingTop:"2px",overflowY:"auto", borderColor:"white",borderStyle:"solid",borderWidth:"2px"}}>
      <div style={{borderRadius:"8px",height:"90%"}}>
          
          {/* Chat Header */}
          <div style={{display:'flex',backgroundColor:"#DAE0E6",width:"98%",height:"50px",borderRadius:"8px",margin:"0 auto",}}>    
             <img src={chatDetails.chatName == "sender" ? chatDetails.users[1].pfp : chatDetails.pfp} style={{width:"40px",height:"40px",borderRadius:"50%",margin:"6px",cursor:"pointer"}} onClick={()=>viewGroup(chatDetails)} />
             <div style={{display:"flex",flexDirection:"column",marginTop:"10px",cursor:"pointer"}} onClick={()=>viewGroup(chatDetails)} >
               <b style={{marginLeft:"10px",fontSize:"13px",fontWeight:"700",color:"black",fontFamily:"Poppins"}} >{chatDetails.chatName=="sender" ? chatDetails.users[1].name : detailsy.chatName}</b>
               <b style={{marginLeft:"10px",fontSize:"11px",fontWeight:"700",color:"gray"}}>{chatDetails.chatName == "sender" ? chatDetails.users[1].username : null}</b>  
             </div>
             <i onClick={endChat} style={{cursor:"pointer",position:"absolute",right:"18px",top:"15px",fontSize:"25px"}} class="fa-solid fa-arrow-left"></i>  
          </div>

          {/* Real Chatting */}
          <div style={{height:"88%",width:"98%",border:"2px solid #DAE0E6",borderRadius:"8px",margin:'0 auto',marginTop:"4px"}}>

          </div>
        
        {/* Send Messages */}
          <div style={{display:"flex",width:"98%",marginLeft:"5px",marginTop:"0", marginTop:"5px"}}>
           <input style ={{height:"35px",width:"100%",marginTop:"5px"}} className="form-control input-sm search-username" placeholder = "Message.." type="text"/>    
           <button style={{height:"35px",marginTop:"5px",marginLeft:"5px"}} className='btn btn-primary'>
              <i class="bi bi-send"></i>
           </button>
          </div>
         
      </div>  


    </div>
  )
}

export default SendMessage