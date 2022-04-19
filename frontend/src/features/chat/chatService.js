
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
   
    return response.data   
}

//Creating a new Group

const createGroup = async(data,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}group`,data,config);
    return response.data   
}


//Rename the group put request
const renameGroup = async(data,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}rename`,data,config);
    return response.data   
}


//Remove from Group
const removeFromGroup = async(data,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}groupremove`,data,config);
    return response.data   
}


//Add to Group
const addToGroup = async(data,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}groupadd`,data,config);
    return response.data   
}








const chatService = {
  searchUser,
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
}

export default chatService;
