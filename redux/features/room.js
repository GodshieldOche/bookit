import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const fetchRoom = createAsyncThunk(
    `rooms/fetchRoom`,
    async ({req, id}, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        try {
            const { data } = await axios.get(`${origin}/api/rooms/${id}`)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const roomSlice = createSlice({
    name: 'room',
    initialState: {
        loading: false,
        room: {
            images: []
        },
        message: null,
    },
    reducers: {

    },
    extraReducers: {
        [fetchRoom.pending]: (state) => {
            state.loading = true
        },
        [fetchRoom.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.room = payload.room
        },
        [fetchRoom.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = roomSlice.actions
export default roomSlice.reducer