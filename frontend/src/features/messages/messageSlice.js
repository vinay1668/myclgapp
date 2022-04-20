import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import messageService from "./messageService.js";

const initialState = {
    messagesList:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}


//Sending a new Message

export const sendMessage = createAsyncThunk('messages/sendMessage', async(data, thunkAPI) => {
    
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await messageService.sendMessage(data,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
  });


// Fetching Messages by Chat Id


export const fetchMessages = createAsyncThunk('messages/fetchMessages', async(chatId, thunkAPI) => {
    
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await messageService.fetchMessages(chatId,token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
  });









export const messageSlice = createSlice ({
    name: 'messages',
    initialState,
    reducers : {
        reset: (state) => initialState,      
    },

    extraReducers: (builder) => {
        builder 
          // sending a new Message

              .addCase(sendMessage.pending, (state) => {
                  state.isLoading = true
              })
              .addCase(sendMessage.fulfilled, (state, action) =>{
                  state.isSuccess = true
                  state.isLoading = false
                  state.messagesList = [...state.messagesList, action.payload]
                  
              })
              .addCase(sendMessage.rejected, (state,action) => {
                  state.isError = true
                  state.message = action.payload
                  state.isLoading = false
              })


            // fetching all Messages

            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchMessages.fulfilled, (state, action) =>{
                state.isSuccess = true
                state.isLoading = false
                state.messagesList =  action.payload
                
            })
            .addCase(fetchMessages.rejected, (state,action) => {
                state.isError = true
                state.message = action.payload
                state.isLoading = false
            })
    }
});

export const {reset} = messageSlice.actions
export default messageSlice.reducer;