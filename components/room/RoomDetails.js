import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useRouter } from 'next/router'
import { useQuery } from 'next/router'
import Head from 'next/head'
import { Carousel, CarouselItem } from 'react-bootstrap'
import Image from 'next/image'
import RoomFeatures from "./RoomFeatures"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { getCheckBooking } from "../../redux/features/checkBooking"
import { getBookedDates } from "../../redux/features/bookedDates"
import NewReview from "../review/NewReview"
import ListReviews from "../review/ListReviews"


const RoomDetails = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [daysOfStay, setDaysOfStay] = useState()

    
    const { room, loading, message } = useSelector(state => state.room)
    const { user} = useSelector(state => state.user)
    const { dates } = useSelector(state => state.bookedDates)
    const { loading: bookingLoading, available} = useSelector(state => state.checkBookings)
    const { id } = router.query

    const excludedDates = []
    dates.forEach(date => {
        excludedDates.push(new Date(date))
    })

    const newBokingHandler = async () => {
        const bookingData = {
            room: id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid: 90,
            paymentInfo: {
                id: 'STRIPE_ID',
                status: 'STRIPE_STATUS'
            }
        }

        try {
            const { data } = await axios.post(`/api/bookings`, bookingData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        dispatch(getBookedDates(id))
        toast.error(message)
    }, [dispatch, id, room, message])

    const onChange = (dates) => {
        const [checkInDate, checkOutDate] = dates;

        setCheckInDate(checkInDate)
        setCheckOutDate(checkOutDate)
        
        if (checkInDate && checkOutDate) {
             
            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)
            setDaysOfStay(days)
            const cIn = checkInDate.toISOString()
            const cOut = checkOutDate.toISOString()
            dispatch(getCheckBooking({id, cIn, cOut}))
        }
       
    }

    return (
        <>
            <Head>
                <title>{ room.name } - Book</title>
            </Head>
            <div className="container container-fluid">
                <h2 className='mt-5'>{room.name}</h2>
                <p>{room.address}</p>

                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div className="rating-inner"
                            style={{ width: `${(room.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                </div>
                
                <Carousel hover='pause' >
                    { room.images.map(image => (
                        <Carousel.Item key={image.public_id} >
                            <div style={{width: '100%', height: '440px'}}>
                                <Image className='d-block m-auto'
                                    src={image.url}
                                    alt={image.name}
                                    layout='fill'
                                />
                            </div>
                       </Carousel.Item>
                   ))}
                </Carousel>


                    <div className="row my-5">
                        <div className="col-12 col-md-6 col-lg-8">
                            <h3>Description</h3>
                        <p>{ room.description}</p>
                        
                        <RoomFeatures room={room} />
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="booking-card shadow-lg p-4">
                                <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>
                                <hr/>

                                <p className="mt-5 mb-3">
                                    Pick Check In & Check Out Date
                                </p>
                                <DatePicker
                                    className='w-100'
                                    selected={checkInDate}
                                    onChange={onChange}
                                    endDate={checkOutDate}
                                    startDate={checkInDate}
                                    minDate={new Date()}
                                excludeDates={excludedDates}
                                    selectsRange
                                    inline
                                    
                            />
                            
                            {available === true && <div className="alert alert-success my-3 font-weight-bold">
                                Room is available. Book Now
                            </div> }
                            {available === false && <div className="alert alert-danger my-3 font-weight-bold">
                                Room is not available. Try different dates
                            </div> }
                            {available && !user &&
                                <div className="alert alert-danger my-3 font-weight-bold">
                                Login to book room.
                            </div> }
                            {available && user &&
                                <button className="btn btn-block py-3 booking-btn"
                                    onClick={newBokingHandler}
                                >Pay</button> }
                            </div>
                        </div>
                    </div>

                    <NewReview/>

                {room.reviews && room.reviews.length > 0 ?
                    <ListReviews reviews={room.reviews} />
                    :
                    <p><b>No Reviews on this room</b></p>
                }
    </div>

        </>
    )
}

export default RoomDetails
