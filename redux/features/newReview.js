import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import absoluteUrl from 'next-absolute-url'



export const postReview = createAsyncThunk(
    `review/postReview`,
    async ({ rating, comment, roomId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/reviews`, { rating, comment, roomId }, {
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



const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        loading: false,
        message: null,
        success: false
    },
    reducers: {

    },
    extraReducers: {
        [postReview.pending]: (state) => {
            state.loading = true
        },
        [postReview.fulfilled]: (state) => {
            state.loading = false
            state.success = true
        },
        [postReview.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export default reviewSlice.reducer