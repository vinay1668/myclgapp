import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { fetchChats } from '../../../features/chat/chatSlice.js'
import ChatList from './ChatList.js'

function Chats() {

    const dispatch = useDispatch()
    const {chats} = useSelector((state) => state.chat);
   

    useEffect(()=>{
        dispatch(fetchChats());

    },[])
  

  return (
   <>
        { chats.length > 0 ? (
            <>
            {chats.map(data => (   
                <ChatList chat={data} key={data._id} />
            ))}
            </>
        ): (null)}
    </>
  )
}


export default Chats


 