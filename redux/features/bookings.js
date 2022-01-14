import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'




export const getBookings = createAsyncThunk(
    `bookings/getBookings`,
    async ({req, authCookie}, { rejectWithValue }) => {
        const { origin } = absoluteUrl(req)
        const config = {
            headers: {
                cookie: authCookie
            }
        }
        let link = `${origin}/api/bookings/me`
        try {
            const { data } = await axios.get(link, config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        loading: false,
        bookings: [],
        message: null
    },
    reducers: {

    },
    extraReducers: {
        [getBookings.pending]: (state) => {
            state.loading = true
        },
        [getBookings.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.bookings = payload.bookings
        },
        [getBookings.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = bookingsSlice.actions
export default bookingsSlice.reducer