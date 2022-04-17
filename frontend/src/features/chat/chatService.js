
import axios from 'axios'
const API_URL = '/chat/'

//Searching user from Search box

const searchUser = async(user,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`/users/searchuser?search=${user}`, config);
    return response.data   
}

// Accessing the chat from SearchBox

const accessChat = async(userId,token) =>{
    const config = {
        headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,{userId}, config);
    return response.data   
}

//Fetching all the Chats for the current user
const fetchChats = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL,config);
    console.log(response.data)
    return response.data   
}





const chatService = {
  searchUser,
  accessChat,
  fetchChats,
}

export default chatService;
