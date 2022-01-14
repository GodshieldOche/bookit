import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import Image from 'next/image'
import Link from 'next/link';


const BookingDetails = () => {
    const dispatch = useDispatch()

    const { loading, details, message } = useSelector(state => state.bookingDetails)

    useEffect(() => {
        if (message) {
            toast.error(message)
        }
    }, [message])
    
    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 booking-details">
                    {details && 
                        <>
                        <h2 className="my-5">Booking # { details._id}</h2>

                        <h4 className="mb-4">User Info</h4>
                        <p><b>Name:</b> {details.user && details.user.name} </p>
                        <p><b>Email:</b> {details.user && details.user.email}</p>
                        <p><b>Amount:</b> ${details.amountPaid }</p>

                        <hr />

                        <h4 className="mb-4">Booking Info</h4>
                        <p><b>Check In:</b> {new Date(details.checkInDate).toLocaleString('en-Us')}</p>
                        <p><b>Check Out:</b> {new Date(details.checkOutDate).toLocaleString('en-Us')}</p>
                        <p><b>Days of Stay:</b> {details.daysOfStay }</p>

                        <hr />

                        <h4 className="my-4">Payment Status</h4>
                        <p className="greenColor"><b>Paid</b></p>

                        <h4 className="mt-5 mb-4">Booked Room:</h4>

                        <hr />
                        <div className="cart-item my-1">
                            <div className="row my-5">
                                <div className="col-4 col-lg-2">
                                    <Image
                                        src={details.room && details.room.images[0].url}
                                        alt={details.room && details.room.name}
                                        height={45}
                                        width={65}
                                    />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link href={`/room/${details.room && details.room._id}`}><a>{details.room && details.room.name}</a></Link>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${details.room && details.room.pricePerNight}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{details.daysOfStay} Day(s)</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default BookingDetails
