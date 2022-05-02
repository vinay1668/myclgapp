import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch,} from "react-redux"
import {queryUser,emptyUserList,renameGroup,fetchChats,removeFromGroup,addToGroup,getGroupMembers,emptyGroupChatMembers} from "../../../features/chat/chatSlice.js"
import SearchResultsList from './SearchResultsList';

function ViewGroup({details,endGroup}) {



    

    const {user} = useSelector((state) => state.auth);
    const {chats} = useSelector((state) => state.chat);
    const {groupMembers} = useSelector((state) =>state.chat);
    
    const[loggedUser,setLoggedUser] = useState(user);
    const {searchResults} = useSelector((state) => state.chat);
    const[addingUser,setAddingUser] = useState(false);
    const[showRename,setShowRename] = useState(false);
    const[nama,setNama] = useState("")
    const dispatch = useDispatch()

 
    const[detailsy,setDetailsy] = useState(groupMembers);


    useEffect(()=>{

        dispatch(getGroupMembers({chatId: details._id})) 

        return(() =>{
            dispatch(emptyUserList())
            dispatch(emptyGroupChatMembers())
        })
      
    },[])



    useEffect(() =>{
        console.log(groupMembers)
    },[groupMembers])

    function saveToDb(){
        const data = {
            chatId: details._id,
            chatName: nama,

        }
        dispatch(renameGroup(data))
        //dispatch(fetchChats())
        setShowRename(false);
        
    }

    function changingName(e){
        setNama(e.target.value);

    }

    function addMember(userId,username){

        const data = {
            userId: userId,
            chatId: details._id
        }
        dispatch(addToGroup(data));



    }

    function modifyRename(){
        setShowRename(true);
    }

    function userChanged(e){
         if(e.target.value.length == 0){
            dispatch(emptyUserList());
            setAddingUser(false);
         }else{
        setAddingUser(true);
         dispatch(queryUser(e.target.value))
         
         }
     }
     const [width, setWidth]   = useState(window.innerWidth);  
     const [height, setHeight]   = useState(window.innerHeight);  
     const updateDimensions = () => {
       setWidth(window.innerWidth);
       setHeight(window.innerHeight)
     }
   
     useEffect(() => {
         window.addEventListener("resize", updateDimensions);
         
         return () => window.removeEventListener("resize", updateDimensions);
         
     }, []);





    function MemberList({user}){

        const[hovered,setHovered] = useState(false);

        function entered(){
            setHovered(true);
          }
          function leaved(id) {
            setHovered(false);
          }
          function deleteUser(){
              const data = {
                  userId : user._id,
                  chatId : groupMembers._id
              }
              dispatch(removeFromGroup(data));
          }



          return(

            <div style={{margin:"5px",display:"flex",backgroundColor: hovered ? "#EFFFFD" : "white",borderRadius:"8px",cursor:"pointer"}} onMouseEnter={entered} onMouseLeave={leaved}>
                    <img src={user.pfp} height="30px" width="30px" style={{borderRadius:"50%",margin:"10px",marginTop:"9px"}}/>
                    <div style={{display:"flex", flexDirection:"column",marginTop:"5px"}}>   
                        <b style={{marginLeft:"10px",fontSize:"13px",fontWeight:"700",color:"black",fontFamily:"Poppins"}}>{user.name}</b>
                        <b style={{marginLeft:"10px",fontSize:"11px",fontWeight:"700",color:"gray"}}>{user.username}</b>  
                    </div> 

                    {user._id === details.groupAdmin._id ? (   
                        <div style={{marginLeft:"auto", marginRight:"15px", fontSize:"10px",fontWeight:"700",color:"green",marginTop:"15px"}}>Admin</div>                   
                        ) : 
                        (loggedUser.id === details.groupAdmin._id ? 
                            ( 
                                <div style={{marginLeft:"auto", marginRight:"15px",marginTop:"5px"}}>
                                    <i style={{paddingLeft:"15px",fontSize:"15px"}} class="fa-solid fa-xmark" onClick={deleteUser}></i>
                                    <div style={{fontSize:"10px",fontWeight:"700",color:"gray"}}>Member</div>
                                </div>
                            ) : ( <div style={{marginLeft:"auto", marginRight:"15px", fontSize:"10px",fontWeight:"700",color:"gray",marginTop:"15px"}}>Member</div>)
                    ) }
            </div> 

          )


    }

  return (

    <div className = "chats" style={{position:"absolute",marginTop:"6px",backgroundColor:"white",borderRadius:"8px",height: width > 1050?"89%":height*0.78,width:"100%",paddingTop:"2px",overflowY:"auto", borderColor:"white",borderStyle:"solid",borderWidth:"2px"}}>
    <div style={{borderRadius:"8px",height:"90%",display:"flex",flexDirection:"column"}}>
        
        <img style={{height:"150px",width:"150px",marginLeft:"25%",borderRadius:"50%",marginTop:"10px"}} src={groupMembers.pfp ? groupMembers.pfp : null} />
        <div style={{display:"flex"}}>
            {!showRename ? (
                <b style={{margin:"auto",paddingLeft:"20px",marginTop:"20px",fontSize:"24px",fontWeight:"600"}}>{groupMembers.chatName ? groupMembers.chatName: null}</b>
            ) : (
                <input style ={{marginLeft:"25%",marginTop:"20px",borderTop:"0",borderLeft:"0",borderRight:"0",}} className="form-control input-sm search-username" placeholder = "Add Group Name" onChange={changingName} type="text"/>

             )}
        
        {loggedUser.id === details.groupAdmin._id ? (
           !showRename ? (
            <i style={{marginRight:"80px",cursor:"pointer",marginTop:"30px",fontSize:"15px"}} onClick={modifyRename} class="fa-solid fa-pen-to-square"></i>):
            (
                <button style={{height:"40px",width:"55px",marginTop:"18px",marginLeft:"10px"}} className='btn btn-primary' onClick={saveToDb}>Save</button>
            )
        
        ): (null) }
        
        </div>
        
        <i onClick={endGroup} style={{cursor:"pointer",position:"absolute",right:"18px",top:"15px",fontSize:"25px"}} class="fa-solid fa-arrow-left"></i>
        
        {user.id ===  details.groupAdmin._id ? (
            <div>
            <input style ={{height:"40px", margin:"auto" ,marginLeft: width > 1050 ? "auto":"20px", marginTop:"20px",width:"90%",marginBottom:"10px"}} className="form-control input-sm search-username" placeholder = "Add Member" type="search" onChange={userChanged}/> 
            
            </div>
        ): (null) }
        
        {/* <div className = "chats" style={{width:"80%", height:"150px",margin:"0 auto",overflowY: searchResults.length > 0 ? "scroll":"hidden",marginTop:"10px"}}>
            {searchResults.length > 0 ? (
                searchResults.map(res => (
                <SearchResultsList key={res._id} user={res} handleClick= {addMember} />
                )   
            ) 

            ): (null) }
        </div> */}
        
        {addingUser ? (<h6 style={{marginLeft:"22px",marginTop:"5px"}}>Add the below User :</h6>) : (<h6 style={{marginLeft:"22px",marginTop:"5px"}}>Members :</h6>) }
        {addingUser ? (

        <div className ="chats" style={{marginTop:"10px",backgroundColor:"#DAE0E6",borderRadius:"8px",paddingTop:"2px",overflowY:"scroll", borderColor:"white",borderStyle:"solid",borderWidth:"2px",width:"90%",height:"200px",margin:"auto"}}>     
            {searchResults.length > 0 ? (
                searchResults.map(res => (
                <SearchResultsList key={res._id} user={res} handleClick= {addMember} />
                )   
            ) 
            ): (null) }
            </div>
        ) 
        : 
        
        (
            <div className ="chats" style={{marginTop:"10px",backgroundColor:"#DAE0E6",borderRadius:"8px",paddingTop:"2px",overflowY:"scroll", borderColor:"white",borderStyle:"solid",borderWidth:"2px",width:"90%",height:"200px",margin:"auto"}}>     
            
            {groupMembers.users ? 
                     ( groupMembers.users.map(user => (   
                            <MemberList key={user._id} user={user} />
                           
                            
                
            ))
            
            ) : (null)}
       </div>
            
            
            )
        
    
    }



    

    
    </div>  

  </div>
    
    
  )
}

export default ViewGroup