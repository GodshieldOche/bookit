import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getAdminBookings = createAsyncThunk(
    `adminBooking/getAdminBookings`,
    async (obj, { rejectWithValue }) => {
        let link = `/api/admin/bookings`
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postDeleteBooking = createAsyncThunk(
    `deleteRoom/postDeleteBooking`,
    async ({ id, index }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/admin/bookings/${id}`)
            dispatch(deleteOne(index))
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }
 
    }
)


const adminBookingSlice = createSlice({
    name: 'adminBooking',
    initialState: {
        loading: false,
        bookings: [],
        message: null,
        success: null
    },
    reducers: {
        deleteOne: (state, { payload }) => {
            state.bookings.splice(payload, 1)
        },
    },
    extraReducers: {
        [getAdminBookings.pending]: (state) => {
            state.loading = true
        },
        [getAdminBookings.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.bookings = payload.bookings
        },
        [getAdminBookings.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeleteBooking.pending]: (state) => {
            state.loading = true
        },
        [postDeleteBooking.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postDeleteBooking.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export const { deleteOne } = adminBookingSlice.actions
export default adminBookingSlice.reducer