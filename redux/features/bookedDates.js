import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getBookedDates = createAsyncThunk(
    `bookedDates/getBookedDates`,
    async (id , { rejectWithValue }) => {
        let link = `/api/bookings/check_booked_dates?roomId=${id}`
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const bookedDatesSlice = createSlice({
    name: 'bookedDates',
    initialState: {
        loading: false,
        dates: [],
        message: null
    },
    reducers: {

    },
    extraReducers: {
        [getBookedDates.pending]: (state) => {
            state.loading = true
        },
        [getBookedDates.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.dates = payload.bookedDates
        },
        [getBookedDates.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = bookedDatesSlice.actions
export default bookedDatesSlice.reducer