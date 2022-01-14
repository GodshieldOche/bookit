import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getAdminRooms = createAsyncThunk(
    `adminRooms/getAdminRooms`,
    async (obj, { rejectWithValue }) => {
        let link = `/api/admin/rooms`
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postDeleteRoom = createAsyncThunk(
    `deleteRoom/postDeleteRoom`,
    async ({id, index}, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/rooms/${id}`)
            dispatch(deleteOne(index))
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)


const adminRoomsSlice = createSlice({
    name: 'adminRooms',
    initialState: {
        loading: false,
        rooms: [],
        message: null,
        success: null
    },
    reducers: {
        deleteOne: (state, { payload }) => {
            state.rooms.splice(payload, 1)
        },
    },
    extraReducers: {
        [getAdminRooms.pending]: (state) => {
            state.loading = true
        },
        [getAdminRooms.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.rooms = payload.rooms
        },
        [getAdminRooms.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeleteRoom.pending]: (state) => {
            state.loading = true
        },
        [postDeleteRoom.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postDeleteRoom.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export const { deleteOne } = adminRoomsSlice.actions
export default adminRoomsSlice.reducer