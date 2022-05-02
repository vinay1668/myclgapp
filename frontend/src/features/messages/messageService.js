
import axios from 'axios'
const API_URL = '/message/'

//Sending a new Message

const sendMessage = async(data,token) =>{
    const config = {
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, data, config);
//    console.log(response.data)
    

    return response.data   
}


const fetchMessages = async(chatId,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}${chatId}`, config);
    
    return response.data   
}



const messageService = {
    sendMessage,
    fetchMessages,
  }
  
  export default messageService;