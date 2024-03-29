import axios from "axios"

const  API_URL = '/users/';

//Register User
const register = async(userData) => {
    const response = await axios.post(API_URL, userData)
    
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


//Login User

const login = async(userData) => {
    const response = await axios.post(API_URL+'login', userData)
    
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Updating User Description

const updateDes = async(data,token) => {
      
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL+'updatedes',data,config)

    // const newUser = JSON.parse(localStorage.getItem('user'));
    // newUser.description = response.data.description;

    // localStorage.setItem('user', JSON.stringify(newUser))
 
    return response.data
}


//Getting current user details
const getMe = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`/users/me`,config);
    
    return response.data   
}


//Getting other user details
const getOtherUser = async(id,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const dummy={
        id:id
    }
    const response = await axios.post(`/users/otheruser`,dummy,config);
    
    return response.data   
}


// Logout User

const logout = () =>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
    updateDes,
    getMe,
    getOtherUser,
}

export default authService