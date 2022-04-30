import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { fetchChats,getGroupMembers } from '../../../features/chat/chatSlice.js'
import ChatList from './ChatList.js'
import SendMessage from './SendMessage.js'
import ViewGroup from './ViewGroup.js'


function Chats({inGroup,outGroup}) {

    const dispatch = useDispatch()
    const {chats} = useSelector((state) => state.chat);
    const[chatpassed,setChatPassed] = useState({})
   

    useEffect(()=>{
        dispatch(fetchChats());

    },[])
    
    const[doChat,setDoChat] = useState(false);
    const[doGroup,setDoGroup] = useState(false);
    const[groupData,setGroupData] = useState({})
    
    function startChat(chat){
        setDoChat(true);       
        setChatPassed(chat);
    }

    function endChatting(){
        setDoChat(false);
    }
    function showGroup(chat){
        setDoChat(false);
        setDoGroup(true);
        setGroupData(chat); 
        inGroup();
    }
    function endGroup(){
        setDoGroup(false);
        setDoChat(true);
        outGroup();
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
        { chats.length > 0 && !doChat && !doGroup ? (
            <div className ="chats" style={{marginTop:"10px",backgroundColor:"#DAE0E6",borderRadius:"8px",minHeight:"60px",height:"auto", maxHeight: width > 1050 ? "540px":height*0.76,paddingTop:"2px",overflowY:"auto", borderColor:"white",borderStyle:"solid",borderWidth:"2px"}}>
            {chats.map(data => (   
                <ChatList chat={data} key={data._id} startChat={startChat}/>
            ))}
            </div>
        ): !doChat && !doGroup ?<div style={{margin:"0 auto",marginTop:"50px"}} className='loader'></div>:(null)}

        {doChat ? (
            <SendMessage chatDetails={chatpassed} endChat={endChatting} showGroup={showGroup}/>
        ) : (null)}

        {doGroup ?
        (
            <ViewGroup details={groupData} endGroup={endGroup} />
        ):
        (null)}
    </>
  )
}


export default Chats


 