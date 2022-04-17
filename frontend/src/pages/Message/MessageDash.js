import React ,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {queryUser,emptyUserList,accessChat} from "../../features/chat/chatSlice.js"

import SearchResultsList from './components/SearchResultsList.js'
import Chats from './components/Chats.js'
import ShowModal from './components/ShowModal.js'

function MessageDash() {

  
  const dispatch = useDispatch()
  const {searchResults} = useSelector((state) => state.chat);

  const [user,setUser] = useState('')
  const[showModal,setShowModal] = useState(false);
  
  useEffect(() =>{
    if(!showModal){
      dispatch(emptyUserList())
    }
  

  },[showModal])


  function userChanged(e){
     setUser(e.target.value);
  }
  
  function searchUser(){
    if(searchResults.length>0){
      dispatch(emptyUserList())     
    }
    else{
      dispatch(queryUser(user))
    }
  }
  function createChat(userId,username){
    dispatch(accessChat(userId));
    dispatch(emptyUserList());   
  }


  return (
    <div className="messagepane" style={{}}>

        <div style={{height:"50px",borderRadius:"5px",display:"flex",justifyContent:"space-around",backgroundColor:"white"}}>
            
            <div style={{display:"flex"}}>
              <input onChange= {userChanged} style ={{height:"40px", margin:"2px", marginTop:"5px",width:"120px"}} className="form-control input-sm search-username" id="inputsm" placeholder = "Search" type="search"/>
              <button onClick={searchUser} type="button" class="btn btn-light" style ={{height:"40px", marigin:"2px", marginTop:"5px",width:"40px"}} >
               {searchResults.length > 0 && !showModal ? (<i class="fa-solid fa-xmark"></i>) :(<i class="fa fa-solid fa-magnifying-glass"></i>) } 
              </button>
            </div>
            <button style ={{height:"40px", marigin:"2px", marginTop:"5px",width:"120px"}} type="button" class="btn btn-light" onClick={()=>setShowModal(true)}>New Group +</button>   
        
        </div>
        
           {searchResults.length > 0 && !showModal ?  (
        
             <div style={{position:"absolute",marginLeft:"30px",marginTop:"10px",width:"220px", height:"auto",minHeight:"50px",borderRadius:"8px",backgroundColor:"#DAE0E6"}}>         
             {/* <button type="button" class="btn btn-light" style={{width:"10px",height:"10px"}}>
                <i class="fa-solid fa-arrow-left"></i>
             </button> */}
             
             { searchResults.map(res => (
                 <SearchResultsList key={res._id} user={res} handleClick={createChat} />
              )   
             ) }
             </div>
             ): (null) }
  

          {/* modal   */}     
        <div className = "chats" style={{marginTop:"6px",backgroundColor:"#DAE0E6",borderRadius:"8px", minHeight:"60px",maxHeight:"91%",paddingTop:"2px",overflowY:"auto", borderColor:"white",borderStyle:"solid",borderWidth:"2px"}}>     
             <Chats />
        </div>

       {showModal ? (
            <ShowModal changeModel={()=>setShowModal(false)}/>

       ) : (null) }

  </div>
  )
}

export default MessageDash
