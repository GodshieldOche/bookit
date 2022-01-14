import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const getAdminReviews = createAsyncThunk(
    `adminReviews/getAdminReviews`,
    async (roomId, { rejectWithValue }) => {
        let link = `/api/reviews?roomId=${roomId}`
        try {
            const { data } = await axios.get(link)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }

    }
)

export const postDeleteReview = createAsyncThunk(
    `adminReviews/postDeleteReview`,
    async ({ id, roomId, index }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`/api/reviews?roomId=${roomId}&id=${id}`)
            dispatch(deleteOne(index))
            return data
        } catch (error) {
            console.log(rejectWithValue(error))
            return rejectWithValue(error.response.data.message)
        }

    }
)


const adminReviewsSlice = createSlice({
    name: 'adminReviews',
    initialState: {
        loading: false,
        reviews: [],
        message: null,
        success: null
    },
    reducers: {
        deleteOne: (state, { payload }) => {
            state.reviews.splice(payload, 1)
        },
    },
    extraReducers: {
        [getAdminReviews.pending]: (state) => {
            state.loading = true
        },
        [getAdminReviews.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.reviews = payload.reviews
        },
        [getAdminReviews.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
        [postDeleteReview.pending]: (state) => {
            state.loading = true
        },
        [postDeleteReview.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = payload.message
        },
        [postDeleteReview.rejected]: (state, { payload }) => {
            state.loading = false
            state.message = payload
        },
    }
})


export const { deleteOne } = adminReviewsSlice.actions
export default adminReviewsSlice.reducer