import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { fetchChats } from '../../../features/chat/chatSlice.js'
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
  

  return (
   <>
        { chats.length > 0 && !doChat && !doGroup ? (
            <div className ="chats" style={{marginTop:"6px",backgroundColor:"#DAE0E6",borderRadius:"8px", height:"540px",paddingTop:"2px",overflowY:"auto", borderColor:"white",borderStyle:"solid",borderWidth:"2px"}}>
            {chats.map(data => (   
                <ChatList chat={data} key={data._id} startChat={startChat}/>
            ))}
            </div>
        ): (null)}

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


 