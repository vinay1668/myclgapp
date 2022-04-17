import React,{useEffect, useState} from 'react'

function SearchResultsList({user,handleClick}) {
  
 const[hovered,setHovered] = useState(false);

 function entered(){
   setHovered(true);
 }
 function leaved() {
   setHovered(false);
 }
  useEffect(() => {

  } )

  return (
      <>           
    <div style={{position:"relative",display:"flex",backgroundColor: hovered ? "#57CC99":"white",borderRadius:"8px",margin:"4px",height:"50px",marginTop:"5px", cursor:"pointer"}} onMouseEnter={entered} onMouseLeave={leaved} onClick={()=>handleClick(user._id,user.username)}>          
      <img src={user.pfp} height="30px" width="30px" style={{borderRadius:"50%",margin:"10px"}}/>
        <div style={{display:"flex", flexDirection:"column",marginTop:"5px"}}>
          <b style={{margin:"0",fontSize:"12px",fontWeight:"700",color:"gray"}}>{user.username}</b>
          <b style={{margin:"0",fontSize:"12px",fontWeight:"500",color:"black",fontFamily:"Poppins"}}>{user.name}</b>
        </div>      
    </div>
              
 </>

  )
}

export default SearchResultsList;