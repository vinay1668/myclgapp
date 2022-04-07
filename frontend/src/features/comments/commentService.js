import axios from "axios";

const API_URL = '/comments/'

//create a new comment

const createComment = async(commentData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, commentData, config);
   
    return response.data
}

//create a new comment Reply

const createCommentReply = async(commentData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, commentData, config);
    return response.data
}



// get all Comments

const getComment = async(page,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/get`,page,config);
    return response.data   
}


// get Replies for a Comment by parentId

const getReply = async(page,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/get/reply`,page,config);
    
    return response.data   
}






// updates votes of a comment by commentId
const updateCommentVotes = async(commentId,voteData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } 
    const response = await axios.put(API_URL+ commentId, voteData, config);
    return response.data

}


// updates votes of a Reply by commentId
const updateReplyVotes = async(commentId,voteData,token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    } 
    const response = await axios.put(API_URL+ commentId, voteData, config);
    return response.data

}


const commentService = {
    createComment,
    createCommentReply,
    getReply,
    getComment,
    updateCommentVotes,
    updateReplyVotes,
}

export default commentService;

