import Booking from '../models/booking'
import ErrorHandler from '../utils/errorHandler'
import catchAsyncErrors from '../middleware/catchAsycErrors'
import Moment from 'moment'
import { extendMoment } from 'moment-range'


const moment = extendMoment(Moment)

// create new bookings => /api/bookings
const newBooking = catchAsyncErrors(async (req, res) => {
    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo
    } = req.body

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo

    })
    res.status(200).json({
        success: true,
        booking
    })

})

// check room booking availability => /api/bookings/check
const checkRoomAvailability = catchAsyncErrors(async (req, res) => {

    let { roomId, checkInDate, checkOutDate } = req.query

    checkInDate = new Date(checkInDate)
    checkOutDate = new Date(checkOutDate)
    
    const bookings = await Booking.find({
        room: roomId,
        $and: [{
            checkInDate:{
                $lte: checkOutDate
            },
            checkOutDate: {
                $gte: checkInDate
            }
        }]
    })
//    check if there is any booking available
    let isAvailable;

    if (bookings && bookings.length === 0) {
        isAvailable = true
    } else {
        isAvailable = false
    }
    res.status(200).json({
        success: true,
        isAvailable
    })

})

// check booked dates of a room => /api/bookings/check_booked_dates
const checkBookedDates = catchAsyncErrors(async (req, res) => {
    const { roomId } = req.query;

    const bookings = await Booking.find({ room: roomId })
  
    let bookedDates = []

    const timeDifference =moment().utcOffset() / 60


    bookings.forEach(booking => {

        const checkInDate = moment(booking.checkInDate).add(timeDifference, 'hours')
        const checkOutDate = moment(booking.checkOutDate).add(timeDifference, 'hours')
        const range = moment.range(moment(checkInDate), moment(checkOutDate))

        const dates = Array.from(range.by('day'))
        bookedDates = bookedDates.concat(dates)
    })
    res.status(200).json({
        success: true,
        bookedDates
    })

})

// Get all bookings of current user  => /api/bookings/me
const myBookings = catchAsyncErrors(async (req, res) => {
    
    const bookings = await Booking.find({ user: req.user._id })
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        bookings
    })

})

// Get Booking Details  => /api/bookings/:id
const getBookingDetails = catchAsyncErrors(async (req, res) => {
    

    const booking = await Booking.findById(req.query.id)
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        booking
    })

})

// Get all bookings - ADMIN   =>   /api/admin/bookings
const allAdminBookings = catchAsyncErrors(async (req, res) => {

    const bookings = await Booking.find()
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        bookings
    })
})


// Delete booking - ADMIN   =>   /api/admin/bookings/id
const deleteBooking = catchAsyncErrors(async (req, res, next) => {

    const booking = await Booking.findById(req.query.id)

    if (!booking) {
        return next(new ErrorHandler('Booking not found with this ID', 400));
    }

    await booking.remove()

    res.status(200).json({
        success: true,
        message: 'Booking is deleted.'
    })
})


export {
    newBooking,
    checkRoomAvailability,
    checkBookedDates,
    myBookings,
    getBookingDetails,
    allAdminBookings,
    deleteBooking
}