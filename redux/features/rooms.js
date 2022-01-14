import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'


export const fetchRooms = createAsyncThunk(
    `rooms/fetchRooms`,
    async ({req, page = 1, location='', guest, category}, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        let link = `${origin}/api/rooms?page=${page}&location=${location}`
        if (guest) {
            link = link.concat(`&guestCapacity=${guest}`)
        }
        if (category) {
            link = link.concat(`&category=${category}`)
        }
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        loading: false,
        rooms: [],
        message: null,
        success: null,
        roomsCount: null,
        resPerPage: null,
        filteredRoomsCount: null
    },
    reducers: {
        // deleteOne: (state, { payload }) => {
        //     state.rooms.splice(payload, 1)
        // },
        // addProduct: (state, { payload }) => {
        //     state.rooms.push(payload)
        // }
    },
    extraReducers: {
        [fetchRooms.pending]: (state) => {
            state.loading = true
        },
        [fetchRooms.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.rooms = payload.rooms
            state.roomsCount = payload.roomsCount
            state.resPerPage = payload.resPerPage
            state.filteredRoomsCount = payload.filteredRoomsCount
          
        },
        [fetchRooms.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = roomsSlice.actions
export default roomsSlice.reducer