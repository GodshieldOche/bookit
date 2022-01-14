import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getCheckBooking = createAsyncThunk(
    `checkBooking/getCheckBooking`,
    async ({ id, cIn, cOut }, { rejectWithValue }) => {
        let link = `/api/bookings/check?roomId=${id}&checkInDate=${cIn}&checkOutDate=${cOut}`
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const checkBookingSlice = createSlice({
    name: 'checkBooking',
    initialState: {
        loading: false,
        available: null,
        message: null
    },
    reducers: {
   
    },
    extraReducers: {
        [getCheckBooking.pending]: (state) => {
            state.loading = true
        },
        [getCheckBooking.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.available = payload.isAvailable
        },
        [getCheckBooking.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = checkBookingSlice.actions
export default checkBookingSlice.reducer