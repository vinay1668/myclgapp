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
    return response
    
}

// updates votes of a post by postid
const updatePostVotes = async(postId,voteData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL+ postId, voteData, config);
    
    return response
}

// get all Posts 

const getPosts = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);
    return response.data
    
}

const postService = {
    createPost,
    getPosts,
    updatePostVotes,
}

export default postService;

