import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'



export const postUpdateRoom = createAsyncThunk(
    `updateRoom/postUpdateRoom`,
    async ({ id, roomData }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/rooms/${id}`, roomData, {
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



const updateRoomSlice = createSlice({
    name: 'updateRoom',
    initialState: {
        loading: false,
        message: null,
        room: {},
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postUpdateRoom.pending]: (state) => {
            state.loading = true
        },
        [postUpdateRoom.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.success = true
            state.room = payload.room
        },
        [postUpdateRoom.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default updateRoomSlice.reducer