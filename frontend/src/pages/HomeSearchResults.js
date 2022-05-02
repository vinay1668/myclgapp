import { useState ,useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';

function HomeSearchResults({searchedUser}){
    const[hovered,setHovered] = useState(false);
    const[post,setPost]= useState(searchedUser);
    useEffect(()=>{
        setPost((prevData) => {
            const newData = {...prevData}
            newData.user = newData._id
            delete newData["_id"]
            return newData;
          })


       
    },[])


   
    function entered(){
      setHovered(true);
    }
    function leaved() {
      setHovered(false);
    }
 
    return (
      <>       
    <Link  
        to={"/user"}
        state= {{post:post,scrolled:false}} 
        style={{textDecoration:"none",color:"black"}} >     
    <div style={{position:"relative",display:"flex",backgroundColor: hovered ? "#57CC99":"white",borderRadius:"8px",margin:"4px",height:"50px",marginTop:"5px", cursor:"pointer"}} onMouseEnter={entered} onMouseLeave={leaved} >
         
      <img src={searchedUser.pfp} height="30px" width="30px" style={{borderRadius:"50%",margin:"10px"}}/>
        <div style={{display:"flex", flexDirection:"column",marginTop:"5px"}}>
          <b style={{margin:"0",fontSize:"12px",fontWeight:"700",color:"gray"}}>{searchedUser.username}</b>
          <b style={{margin:"0",fontSize:"12px",fontWeight:"500",color:"black",fontFamily:"Poppins"}}>{searchedUser.name}</b>
        </div>      
    </div>
    </Link>       
 </>

  )

  }

  export default HomeSearchResults;