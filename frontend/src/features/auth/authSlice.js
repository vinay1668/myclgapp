import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
//Get user from Local state.
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user: user ? user:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    des:{}
}

//Register User
export const register = createAsyncThunk('auth/register', async(user,thunkAPI) => {
    try {
        return await authService.register(user)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//logout user
export const logout = createAsyncThunk('auth/logout', async () =>{
    await authService.logout()
})

// Login user

export const login = createAsyncThunk('auth/login', async(user,thunkAPI) => {
    try {
        return await authService.login(user)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Updating User Description


export const updateDes = createAsyncThunk('auth/updateDes', async(data,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.updateDes(data,token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//Getting current User details


export const getMe = createAsyncThunk('auth/getMe', async(_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await authService.getMe(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})






export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
        reset:(state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }

    },
    extraReducers : (builder) => {
        builder  
            // For registering User
             .addCase(register.pending, (state) => {
                 state.isLoading = true
             })
             .addCase(register.fulfilled,  (state, action) =>{
                 state.isLoading = false
                 state.isSuccess = true
                 state.user = action.payload
             })
             .addCase(register.rejected,(state,action) =>{
                 state.isLoading = false
                 state.isError = true
                 state.message = action.payload
                 state.user = null
             })

             //logout user

             .addCase(logout.fulfilled,(state) =>{
                 state.isSuccess = true
                 state.user = null
             })
             
             //For logging in User
             .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled,  (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })


            //Updating User Description

            .addCase(updateDes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateDes.fulfilled,  (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateDes.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Getting current User details
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMe.fulfilled,  (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(getMe.rejected,(state,action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                 state.user = null
            })
    },
})


export const {reset} = authSlice.actions
export default authSlice.reducer
