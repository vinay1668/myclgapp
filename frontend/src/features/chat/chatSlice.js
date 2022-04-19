import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import chatService from "./chatService.js";

const initialState = {
    searchResults:[],
    chats:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
}

//searching users from search Box
export const queryUser = createAsyncThunk('chat/searchUser', async(user, thunkAPI) => {
    
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await chatService.searchUser(user,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
  });

   // Emptying the list
  export const emptyUserList = createAsyncThunk('chat/emptyUserList', async(_, thunkAPI) => {
    
    try {
        return [];
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
  });


  //Accessing the chat from search Box on Click
  export const accessChat = createAsyncThunk('chat/accessChat', async(userId, thunkAPI) => {
    
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await chatService.accessChat(userId,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
  });


//Fetch all the chats of the user


export const fetchChats = createAsyncThunk('chat/fetchChats', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await chatService.fetchChats(token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
       
    }
  });


  //Creating a new Group

  export const createGroup = createAsyncThunk('chat/createGroup', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await chatService.createGroup(data,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
       
    }
  });

//Renaming the group

    export const renameGroup = createAsyncThunk('chat/renameGroup', async(data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await chatService.renameGroup(data,token)
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
          return thunkAPI.rejectWithValue(message)
           
        }
      });


//Removing the User

export const removeFromGroup = createAsyncThunk('chat/removeFromGroup', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await chatService.removeFromGroup(data,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
       
    }
  });


// Add to Group


export const addToGroup = createAsyncThunk('chat/addToGroup', async(data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await chatService.addToGroup(data,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
       
    }
  });


  export const chatSlice = createSlice ({
    name: 'chat',
    initialState,
    reducers : {
        reset: (state) => initialState,
        
    },

    extraReducers: (builder) => {
        builder 
          //searching Users!!!
              .addCase(queryUser.pending, (state) => {
                  state.isLoading = true

              })
              .addCase(queryUser.fulfilled, (state, action) =>{
                  state.isSuccess = true
                  state.isLoading = false
                  state.searchResults = action.payload;
                  
              })
              .addCase(queryUser.rejected, (state,action) => {
                  state.isError = true
                  state.message = action.payload
                  state.isLoading = false
              })

            //Emptying user List

            .addCase(emptyUserList.pending, (state) => {
                state.isLoading = true

            })
            .addCase(emptyUserList.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.searchResults = action.payload;
            })
            .addCase(emptyUserList.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })

            //Accessing chat

            .addCase(accessChat.pending, (state) => {
                state.isLoading = true

            })
            .addCase(accessChat.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                var data = action.payload;
                if(!state.chats.find((c) => c._id === data._id)){
                     state.chats.unshift(data);

                }
            })
            .addCase(accessChat.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })


            
            //Fetching all the Chats of the current User


            .addCase(fetchChats.pending, (state) => {
                state.isLoading = true

            })
            .addCase(fetchChats.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.chats = action.payload;
            })
            .addCase(fetchChats.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })

          //Creating a new Group

            .addCase(createGroup.pending, (state) => {
                state.isLoading = true

            })
            .addCase(createGroup.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.chats = [action.payload, ...state.chats]
                console.log(action.payload);
            })
            .addCase(createGroup.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })



            //Renaming the new Group

            .addCase(renameGroup.pending, (state) => {
                state.isLoading = true

            })
            .addCase(renameGroup.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.chats.filter(obj => {
                    if(obj._id === action.payload._id) {

                       return (
                           obj.chatName= action.payload.chatName
                       )
                    }
                    return obj
                  });
              
                
            })
            .addCase(renameGroup.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })



            //Removing from Group


            .addCase(removeFromGroup.pending, (state) => {
                state.isLoading = true

            })
            .addCase(removeFromGroup.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.chats.filter(obj => {
                    if(obj._id === action.payload._id) {

                       return (
                           obj.users= action.payload.users
                       )
                    }
                    return obj
                  });
            })
            .addCase(removeFromGroup.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })



            //Adding To  Group


            .addCase(addToGroup.pending, (state) => {
                state.isLoading = true

            })
            .addCase(addToGroup.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.chats.filter(obj => {
                    if(obj._id === action.payload._id) {
                        return (
                            obj.users= action.payload.users
                        )
                    }
                    return obj
                    });
            })
            .addCase(addToGroup.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })
            






     
     
     
     
     
     
     
     
     
     
     
     
     
     
            }
    });



export const {reset} = chatSlice.actions
export default chatSlice.reducer;