import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getAdminUsers = createAsyncThunk(
    `adminUsers/getAdminUsers`,
    async (obj, { rejectWithValue }) => {
        let link = `/api/admin/users`
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postDeleteUser = createAsyncThunk(
    `adminUsers/postDeleteUser`,
    async ({ id, index }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/admin/users/${id}`)
            dispatch(deleteOne(index))
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)


const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState: {
        loading: false,
        users: [],
        message: null,
        success: null
    },
    reducers: {
        deleteOne: (state, { payload }) => {
            state.users.splice(payload, 1)
        },
    },
    extraReducers: {
        [getAdminUsers.pending]: (state) => {
            state.loading = true
        },
        [getAdminUsers.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.users = payload.users
        },
        [getAdminUsers.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeleteUser.pending]: (state) => {
            state.loading = true
        },
        [postDeleteUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postDeleteUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export const { deleteOne } = adminUsersSlice.actions
export default adminUsersSlice.reducer