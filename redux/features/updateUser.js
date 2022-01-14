import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'





export const fetchUser = createAsyncThunk(
    `user/fetchUser`,
    async ( id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/admin/users/${id}`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


export const postUpdateUser = createAsyncThunk(
    `updateRoom/postUpdateUser`,
    async ({ id, name, email, role }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/admin/users/${id}`, {name, email, role}, {
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



const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: {
        loading: false,
        message: null,
        user: {},
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.loading = true
        },
        [fetchUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.user
        },
        [fetchUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postUpdateUser.pending]: (state) => {
            state.loading = true
        },
        [postUpdateUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
        },
        [postUpdateUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default updateUserSlice.reducer