import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const postResetPassword = createAsyncThunk(
    `resetPassword/postResetPassword`,
    async ({token, password, confirmPassword}, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/password/reset/${token}`, {password, confirmPassword}, {
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



const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        loading: false,
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postResetPassword.pending]: (state) => {
            state.loading = true
        },
        [postResetPassword.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [postResetPassword.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default resetPasswordSlice.reducer