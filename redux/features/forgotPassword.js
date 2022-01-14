import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const postForgotPassword = createAsyncThunk(
    `forgotPassword/postForgotPassword`,
    async ( email, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/password/forgot`, email, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)



const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        loading: false,
        message: null,
        success: null
    },
    reducers: {

    },
    extraReducers: {
        [postForgotPassword.pending]: (state) => {
            state.loading = true
        },
        [postForgotPassword.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postForgotPassword.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default forgotPasswordSlice.reducer