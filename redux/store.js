import { configureStore, combineReducers, createReducer } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import roomsReducer from './features/rooms'
import roomReducer from './features/room'
import registerReducer from './features/register'
import userReducer from './features/profile'
import updateProfileReducer from './features/updateProfile'
import forgotPasswordReducer from './features/forgotPassword'
import resetPasswordReducer from './features/resetPassword'
import checkBookingsReducer from './features/checkBooking'
import bookedDatesReducer from './features/bookedDates'
import bookingsReducer from './features/bookings'
import bookingDetailsReducer from './features/bookingDetails'
import reviewReducer from './features/newReview'
import checkReviewReducer from './features/checkReview'
import adminRoomsReducer from './features/adminRooms'
import newRoomReducer from './features/newRoom'
import updateRoomReducer from './features/updateRoom'
import adminBookingsReducer from './features/adminBookings'
import adminUsersReducer from './features/adminUsers'
import updateUserReducer from './features/updateUser'
import adminReviewsReducer from './features/adminReviews'


const combinedReducers = combineReducers({
    rooms: roomsReducer,
    room: roomReducer,
    register: registerReducer,
    user: userReducer,
    updateProfile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    checkBookings: checkBookingsReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    bookingDetails: bookingDetailsReducer,
    review: reviewReducer,
    checkReview: checkReviewReducer,
    adminRooms: adminRoomsReducer,
    newRoom: newRoomReducer,
    updateRoom: updateRoomReducer,
    adminBookings: adminBookingsReducer,
    adminUsers: adminUsersReducer,
    updateUser: updateUserReducer,
    adminReviews: adminReviewsReducer,
});

const rootReducer = createReducer(combinedReducers(undefined, { type: "" }), (builder) => {
    builder
        .addCase("__NEXT_REDUX_WRAPPER_HYDRATE__", (state, action) => ({ ...state, ...action.payload }))
        .addDefaultCase(combinedReducers);
});

const initStore = () => {
   const store = configureStore({
       reducer: rootReducer,
   })
    return store
}

export const wrapper = createWrapper(initStore) 