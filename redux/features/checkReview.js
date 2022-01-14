import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getCheckReview = createAsyncThunk(
    `checkReview/getCheckReview`,
    async (roomId, { rejectWithValue }) => {
        let link = `/api/reviews/check_review_availability?roomId=${roomId}`
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)


const checkReviewSlice = createSlice({
    name: 'checkReview',
    initialState: {
        loading: false,
        available: null,
        message: null
    },
    reducers: {

    },
    extraReducers: {
        [getCheckReview.pending]: (state) => {
            state.loading = true
        },
        [getCheckReview.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.available = payload.isReviewAvailable
        },
        [getCheckReview.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


// export const { deleteOne, addProduct } = checkReviewSlice.actions
export default checkReviewSlice.reducer