import axios from 'axios'


const API_URL = '/posts/'
const API_URI='/posts/6243270c1774efda6b629786'


// create a new post 

const createPost = async(postData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, postData, config);
    return response.data
    
}

// updates votes of a post by postid
const updatePostVotes = async(postId,voteData,token) =>{

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.put(API_URL+ postId, voteData, config);
    console.log(response.data)
    return response.data

}

// get all Posts 

const getPosts = async(page,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/get`,page,config);
    return response.data   
}


//get User posts

const getUserPosts = async(page,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}/getMe`,page,config);
    return response.data   
}

const postService = {
    createPost,
    getPosts,
    getUserPosts,
    updatePostVotes,
}

export default postService;

