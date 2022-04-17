import React ,{useState,useEffect} from 'react'
import SearchResultsList from './SearchResultsList.js'
import {useSelector, useDispatch} from "react-redux"
import SelectedList from './SelectedList.js'

import {queryUser,emptyUserList} from "../../../features/chat/chatSlice.js"

function ShowModal({changeModel}) {

    const {searchResults} = useSelector((state) => state.chat);
    const [user,setUser] = useState('')
    const[selectedList,setSelectedList] = useState([]);
    
    const dispatch = useDispatch()
    
    function addMember(userId,username){
        const data = {
            userId: userId,
            username:username,
        }
        setSelectedList(prevState => [...prevState, data])
    }

    function deleteMember(userId){
        const newPeople = selectedList.filter((person) => person.userId !== userId);
        setSelectedList(newPeople);
    }


    
    function userChanged(e){
        setUser(e.target.value)
         if(e.target.value.length == 0){
            dispatch(emptyUserList());
            console.log(searchResults.length)
         }else{
         dispatch(queryUser(e.target.value))
         }
     }
   
  return (
      <>
      <div style={{position:"absolute",top:"55px",width:"96%",backgroundColor:"#f8f9fa",borderRadius:"8px",margin:"6px",height:"90%"}}>
        <div style={{}}>
             <img src="https://www.redditstatic.com/avatars/avatar_default_02_24A0ED.png"  style={{width:"70px", height:"70px",borderRadius:"50%",marginTop:"10px",marginLeft:"35%"}}/>
             <div style={{marginTop:"5px"}}>
                 {selectedList.length > 0 ? (
                <SelectedList list={selectedList} handleClick={deleteMember}/>
                 ) : (null)}
               
             </div>
             <input  style ={{height:"40px", width:"80%",margin:"0 auto", marginTop:"20px"}} className="form-control input-sm search-username" placeholder = "Chat Name" type="text"/> 
             <div style={{display:"flex"}}>
               <input  style ={{height:"40px", width:"80%",margin:"0 auto", marginTop:"20px"}} className="form-control input-sm search-username" placeholder = "Add  Members" type="search" onChange={userChanged}/>
                  
             </div>

        </div>
      
        <div className = "chats" style={{width:"80%", height:"150px",margin:"0 auto",overflowY: searchResults.length > 0 ? "scroll":"hidden",marginTop:"10px"}}>
            {searchResults.length > 0 ? (
                searchResults.map(res => (
                <SearchResultsList key={res._id} user={res} handleClick= {addMember} />
                )   
            ) 

            ): (null) }
        </div>

        <div style={{marginTop:"20px"}}>
            <button style={{marginLeft:"55%"}} type="button" class="btn btn-primary">Create</button>
            <button style ={{marginLeft:"10px"}} type="button" class="btn btn-dark" onClick={changeModel}>Cancel</button>
        </div>

      </div> 
      </>
  )
}

export default ShowModal