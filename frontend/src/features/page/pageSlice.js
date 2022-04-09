import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    limit: 20,
    skip:0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:""
}

export const modifyPage = createAsyncThunk('page/modifyPage', async({limit,skip}, thunkAPI) =>{
    try {
        return {
        limit:limit,
        skip: skip + limit,
    }

        
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
        
    }
})




export const pageSlice = createSlice ({
    name: 'page',
    initialState,
    reducers : {
        reset: (state) => initialState,
        
    },

    extraReducers: (builder) => {
        builder 
              .addCase(modifyPage.pending, (state) => {
                  state.isLoading = true

              })
              .addCase(modifyPage.fulfilled, (state, action) =>{
                  state.isSuccess = true
                  state.isLoading = false
                  state.limit = action.payload.limit
                  state.skip = action.payload.skip
              })
              .addCase(modifyPage.rejected, (state,action) => {
                  state.isError = true
                  state.message = action.payload
                  state.isLoading = false
              })
            }
});

export const {reset} = pageSlice.actions
export default pageSlice.reducer;