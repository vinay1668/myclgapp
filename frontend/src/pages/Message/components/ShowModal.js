import React ,{useState,useEffect} from 'react'
import SearchResultsList from './SearchResultsList.js'
import {useSelector, useDispatch} from "react-redux"
import SelectedList from './SelectedList.js'

import {queryUser,emptyUserList} from "../../../features/chat/chatSlice.js"
import {createGroup as makeGroup} from"../../../features/chat/chatSlice.js";

function ShowModal({changeModel}) {

    const {searchResults} = useSelector((state) => state.chat);
    const[chatName,setChatName] = useState('');
    const [user,setUser] = useState('')
    const[selectedList,setSelectedList] = useState([]);
    
    const dispatch = useDispatch()
    
    function addMember(userId,username){
        const data = {
            userId: userId,
            username:username,
        }
        if (selectedList.filter(e => e.userId === userId).length > 0) {}
        else{
            setSelectedList(prevState => [...prevState, data])
        }
    }

    function deleteMember(userId){
        const newPeople = selectedList.filter((person) => person.userId !== userId);
        setSelectedList(newPeople);
    }


    
    function userChanged(e){
        setUser(e.target.value)
         if(e.target.value.length == 0){
            dispatch(emptyUserList());
         }else{
         dispatch(queryUser(e.target.value))
         }
     }
     const[err,setErr] = useState(false)

     function createGroup(){
        if(chatName && selectedList.length > 0){
            const data = {
                name:chatName,
                users:JSON.stringify(selectedList.map((u) => u.userId) ),
                pfp:"https://www.redditinc.com/assets/images/site/value_default-open.png"
            }
            dispatch(makeGroup(data));
        }
        if(chatName.length == 0 || selectedList.length == 0){
            
            setErr(true)       
            function greet() {
                setErr(false)
            }
            setInterval(greet, 1000);
        
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
   
   
  return (
      <>
      <div style={{position: "absolute",top:"55px",width:"97%",backgroundColor:"#f8f9fa",borderRadius:"8px",margin:"6px",height:"90%"}}>
        <div style={{}}>
             <img src="https://www.redditinc.com/assets/images/site/value_default-open.png"  style={{width:"70px", height:"70px",borderRadius:"50%",marginTop:"15px",marginLeft:"35%",borderColor:"white",border:"solid"}}/>
             
             {err ? 
             <div style={{paddingTop:"20px"}}>
             <span  style={{zIndex:"65",height:"30px",color:'red',marginLeft:"28%"}}>Please Input Data </span> 
             </div>
             :null}
             <div style={{marginTop:"5px"}}>
                 {selectedList.length > 0 ? (
                <SelectedList list={selectedList} handleClick={deleteMember}/>
                 ) : (
                    <div className='chats' style={{overflowY:"scroll",height:"100px",marginLeft:"35px"}}>
                    </div>
                 )}
               
             </div>
             <input  style ={{height:"40px", width: width > 1050 ? "80%": width*0.8, marginLeft:"20px", marginTop:"20px"}} className="form-control input-sm search-username" placeholder = "Chat Name" type="text" onChange={(e)=>setChatName(e.target.value)}/> 
             <div style={{display:"flex"}}>
               <input  style ={{height:"40px", width: width > 1050 ? "80%": width*0.8,marginLeft:"20px" , marginTop:"30px"}} className="form-control input-sm search-username" placeholder = "Add  Members" type="search" onChange={userChanged}/>
                  
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

        <div style={{marginTop: width > 1050 ? "20px": height*0.02}}>
            <button style={{marginLeft: width > 1050 ?"55%":width*0.45}} type="button" class="btn btn-primary" onClick={createGroup}>Create</button>
            <button style ={{marginLeft:"10px"}} type="button" class="btn btn-dark" onClick={changeModel}>Cancel</button>
        </div>

      </div> 
      </>
  )
}

export default ShowModal