import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'




export const getBookingDetails = createAsyncThunk(
    `bookingDetails/getBookingDetails`,
    async ({ req, authCookie, id }, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        const config = {
            headers: {
                cookie: authCookie
            }
        }
        let link = `${origin}/api/bookings/${id}`
        try {
            const { data } = await axios.get(link, config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const bookingDetailsSlice = createSlice({
    name: 'bookingDetails',
    initialState: {
        loading: false,
        details: {},
        message: null
    },
    reducers: {

    },
    extraReducers: {
        [getBookingDetails.pending]: (state) => {
            state.loading = true
        },
        [getBookingDetails.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.details = payload.booking
        },
        [getBookingDetails.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = bookingDetailsSlice.actions
export default bookingDetailsSlice.reducer