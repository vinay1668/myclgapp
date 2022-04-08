import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from "./postService.js"

const initialState = {
    posts: [],
    userPosts:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:""
}




// create a new post

export const createPost = createAsyncThunk('posts/create', async(postData, thunkAPI) => {
    
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.createPost(postData,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
  })

  // updates votes of a post by postid
  export const updatePostVotes = createAsyncThunk('/post/updatePostVotes', async({postId, voteData}, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        
        return await postService.updatePostVotes(postId, voteData,token);
          
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)     
      }
  })


  // get all posts
  export const getPosts = createAsyncThunk('posts/getAll', async(page, thunkAPI) =>{
      try {
          const token = thunkAPI.getState().auth.user.token;
          return await postService.getPosts(page,token);
          
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
          
      }
  })




  //deleting all posts



  // get current user posts

  export const getUserPosts = createAsyncThunk('posts/getUserPosts', async(page, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await postService.getUserPosts(page,token);
        
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
  })



  




export const postSlice = createSlice ({
    name: 'post',
    initialState,
    reducers : {
        reset: (state) => initialState,
        
    },

    extraReducers: (builder) => {
        builder 
          //creating posts
              .addCase(createPost.pending, (state) => {
                  state.isLoading = true

              })
              .addCase(createPost.fulfilled, (state, action) =>{
                  state.isSuccess = true
                  state.isLoading = false
                  state.posts.push(action.payload)
              })
              .addCase(createPost.rejected, (state,action) => {
                  state.isError = true
                  state.message = action.payload
                  state.isLoading = false
              })
        // getting all posts

                .addCase(getPosts.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getPosts.fulfilled, (state, action) =>{
                    state.isSuccess = true
                    state.isLoading = false
                    state.posts.push(...action.payload)
                })
                .addCase(getPosts.rejected, (state,action) => {
                    state.isError = true
                    state.message = action.payload
                    state.isLoading = false
                })




        // getting current user posts

                .addCase(getUserPosts.pending, (state) => {
                    state.isLoading = true
                })
                .addCase(getUserPosts.fulfilled, (state, action) =>{
                    state.isSuccess = true
                    state.isLoading = false
                    state.userPosts.push(...action.payload)
                })
                .addCase(getUserPosts.rejected, (state,action) => {
                    state.isError = true
                    state.message = action.payload
                    state.isLoading = false
                })

  

            //updating post votes

            .addCase(updatePostVotes.pending, (state) => {
                state.isLoading = true

            })
            .addCase(updatePostVotes.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false

                state.posts.filter(post => {
                    if(post._id == action.payload._id){
                          return (
                              post.votes= action.payload.votes,
                              post.upvoted = action.payload.upvoted,
                              post.downvoted = action.payload.downvoted

                          );
                    }
                    return post;
                })
            })
            .addCase(updatePostVotes.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })



    }










    

})




export const {reset} = postSlice.actions
export default postSlice.reducer;