import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'



export const postNewRoom = createAsyncThunk(
    `newRoom/postNewRoom`,
    async (roomData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/rooms`, roomData, {
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



const newRoomSlice = createSlice({
    name: 'newRoom',
    initialState: {
        loading: false,
        room: {},
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postNewRoom.pending]: (state) => {
            state.loading = true
        },
        [postNewRoom.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true
            state.room = payload.room
        },
        [postNewRoom.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default newRoomSlice.reducer