import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import commentService from "./commentService.js"

const initialState = {
    comments: [],
    replies:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:""
}

//create a new comment

export const createComment = createAsyncThunk('comments/create', async(commentData, thunkAPI) => {   
    try {
    const token = thunkAPI.getState().auth.user.token;
    return await commentService.createComment(commentData,token)
    } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)

    }
})


//create a new comment reply

export const createCommentReply = createAsyncThunk('comments/createCommentReply', async(commentData, thunkAPI) => {   
    try {
    const token = thunkAPI.getState().auth.user.token;
    return await commentService.createCommentReply(commentData,token)
    } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)

    }
})


//get all comments


export const getComment = createAsyncThunk('comments/getAll', async(page, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await commentService.getComment(page,token);
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})

//get all replies for a parent comment

export const getReply = createAsyncThunk('comments/getAllReplies', async(page, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await commentService.getReply(page,token);
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})



//update comment votes by comment Id 

export const updateCommentVotes = createAsyncThunk('comments/updateCommentVotes', async({commentId, voteData}, thunkAPI) => {
    try {
    const token = thunkAPI.getState().auth.user.token;
    return await commentService.updateCommentVotes(commentId, voteData,token);

    } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)     
    }
})


// update reply votes by commentId

export const updateReplyVotes = createAsyncThunk('comments/updateReplyVotes', async({commentId, voteData}, thunkAPI) => {
    try {
    const token = thunkAPI.getState().auth.user.token;
    return await commentService.updateReplyVotes(commentId, voteData,token);

    } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)     
    }
})

//resetting comments to empty array

export const resetComment = createAsyncThunk('comments/resetComment', async(_, thunkAPI) =>{
    try {
        return [];
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
        
    }
})






export const commentSlice = createSlice ({
    name: 'comment',
    initialState,
    reducers : {
        reset: (state) => initialState,
        
    },

    extraReducers: (builder) => {
        builder 
          //creating comments
              .addCase(createComment.pending, (state) => {
                  state.isLoading = true

              })
              .addCase(createComment.fulfilled, (state, action) =>{
                  state.isSuccess = true
                  state.isLoading = false
                  state.comments=[action.payload].concat(state.comments) 
                 
              })
              .addCase(createComment.rejected, (state,action) => {
                  state.isError = true
                  state.message = action.payload
                  state.isLoading = false
              })

           //creating comments
            .addCase(createCommentReply.pending, (state) => {
                state.isLoading = true

            })
            .addCase(createCommentReply.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.replies = [action.payload].concat(state.replies) 
            })
            .addCase(createCommentReply.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })


        // getting all comments

                .addCase(getComment.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getComment.fulfilled, (state, action) =>{
                    state.isSuccess = true
                    state.isLoading = false
                    state.comments.push(...action.payload)
                })
                .addCase(getComment.rejected, (state,action) => {
                    state.isError = true
                    state.message = action.payload
                    state.isLoading = false
                })

        // getting all replies to a  comment by parentId

                .addCase(getReply.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getReply.fulfilled, (state, action) =>{
                    state.isSuccess = true
                    state.isLoading = false
                    state.replies = action.payload
                })
                .addCase(getReply.rejected, (state,action) => {
                    state.isError = true
                    state.message = action.payload
                    state.isLoading = false
                })


            
        //updating commment votes
                .addCase(updateCommentVotes.pending, (state) => {
                    state.isLoading = true

                })
                .addCase(updateCommentVotes.fulfilled, (state, action) =>{
                    state.isSuccess = true
                    state.isLoading = false

                    state.comments.filter(comment => {
                        if(comment._id == action.payload._id){
                            return (
                                comment.votes= action.payload.votes,
                                comment.upvoted = action.payload.upvoted,
                                comment.downvoted = action.payload.downvoted
                            );
                        }
            

                        return comment;
                    })
                
                })
                .addCase(updateCommentVotes.rejected, (state,action) => {
                    state.isError = true
                    state.message = action.payload
                    state.isLoading = false
                })



       //updating Reply votes by comment Id

             .addCase(updateReplyVotes.pending, (state) => {
                state.isLoading = true

            })
            .addCase(updateReplyVotes.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false

                state.replies.filter(reply => {
                    if(reply._id == action.payload._id){
                        return (
                            reply.votes= action.payload.votes,
                            reply.upvoted = action.payload.upvoted,
                            reply.downvoted = action.payload.downvoted
                        );
                    }
                    return reply;
                })
            
            })
            .addCase(updateReplyVotes.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })


        //resetting comments
            .addCase(resetComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetComment.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.comments = action.payload
            })
            .addCase(resetComment.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })






        }
})

export const {reset} = commentSlice.actions
export default commentSlice.reducer;