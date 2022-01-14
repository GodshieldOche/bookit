import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'



export const updateProfile = createAsyncThunk(
    `profile/updateProfile`,
    async ({ name, email, password, avatar }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/me/update`, { name, email, password, avatar }, {
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



const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        loading: false,
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [updateProfile.pending]: (state) => {
            state.loading = true
        },
        [updateProfile.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [updateProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default profileSlice.reducer