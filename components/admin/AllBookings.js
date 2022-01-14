import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MDBDataTable } from 'mdbreact'
import easyinvoice from 'easyinvoice'

import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { getAdminBookings, postDeleteBooking } from '../../redux/features/adminBookings'


const AllBookings = () => {
    
    const dispatch = useDispatch()

    const { loading, bookings, message } = useSelector(state => state.adminBookings)

    useEffect(() => {
        dispatch(getAdminBookings())
        if (message) {
            toast.error(message)
        }

    }, [dispatch, message])

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: 'Booking ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Check In',
                    field: 'checkIn',
                    sort: 'asc'
                },
                {
                    label: 'Check Out',
                    field: 'checkOut',
                    sort: 'asc'
                },
                {
                    label: 'Amount Paid',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: [

            ]
        }

        bookings && bookings.map((booking, index) => {
            return (
                data.rows.push({
                    id: booking._id,
                    checkIn: new Date(booking.checkInDate).toLocaleString('en-Us'),
                    checkOut: new Date(booking.checkOutDate).toLocaleString('en-Us'),
                    amount: `$${booking.amountPaid}`,
                    actions:
                        <>
                            <Link href={`/admin/bookings/${booking._id}`}>
                                <a className="btn btn-primary">
                                    <i className="fa fa-eye"></i>
                                </a>
                            </Link>
                            <button className="btn btn-success mx-2"
                                onClick={() => { downloadInvoice(booking) }}>
                                <i className="fa fa-download"></i>
                            </button>

                            <button className="btn btn-danger mx-2"
                                onClick={() => deleteBookingHandler(booking._id, index)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>

                        </>
                })
            )
        })

        return data
    }

    const deleteBookingHandler = (id, index) => {
        dispatch(postDeleteBooking({ id, index })).then(result => {
            if (!result.error) {
                message = result.payload.message
                toast.success(message)
            } else {
                console.log(result)
            }
        })
    }

    const downloadInvoice = async (bookings) => {
        const data = {
            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
                // The invoice background
                "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            },
            // Your own data
            "sender": {
                "company": "BooK IT",
                "address": "Gwagwalada Abuja",
                "zip": "90101",
                "city": "Abuja",
                "country": "Nigeria"
            },
            // Your recipient
            "client": {
                "company": `${bookings.user.name}`,
                "address": `${bookings.user.email}`,
                "zip": "4567 CD",
                "city": `Check In: ${new Date(bookings.checkInDate).toLocaleString('en-Us')}`,
                "country": `Check Out: ${new Date(bookings.checkOutDate).toLocaleString('en-Us')}`,
                // "custom1": "custom value 1",
                // "custom2": "custom value 2",
                // "custom3": "custom value 3"
            },
            "information": {
                // Invoice number
                "number": `${bookings._id}`,
                // Invoice data
                "date": `${new Date(Date.now()).toLocaleString('en-Us')}`,
                // Invoice due date
                "due-date": "31-12-2021"
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": [
                {
                    "quantity": `${bookings.daysOfStay}`,
                    "description": `${bookings.room.name}`,
                    "tax-rate": 0,
                    "price": bookings.room.pricePerNight
                }
            ],
            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "This is autogenerated invoice of your booking on Book IT",
            // Settings to customize your invoice
            "settings": {
                "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
                // "tax-notation": "gst", // Defaults to 'vat'
                // "margin-top": 25, // Defaults to '25'
                // "margin-right": 25, // Defaults to '25'
                // "margin-left": 25, // Defaults to '25'
                // "margin-bottom": 25, // Defaults to '25'
                // "format": "A4" // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
            },
            // Translate your invoice to your preferred language
            "translate": {
                // "invoice": "FACTUUR",  // Default to 'INVOICE'
                // "number": "Nummer", // Defaults to 'Number'
                // "date": "Datum", // Default to 'Date'
                // "due-date": "Verloopdatum", // Defaults to 'Due Date'
                // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
                // "products": "Producten", // Defaults to 'Products'
                // "quantity": "Aantal", // Default to 'Quantity'
                // "price": "Prijs", // Defaults to 'Price'
                // "product-total": "Totaal", // Defaults to 'Total'
                // "total": "Totaal" // Defaults to 'Total'
            },
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice_${bookings._id}.pdf`, result.pdf)
    }


    return (
        <div className='container container-fluid'>
            {loading ? <Loader /> :
                <>
                    <h1 className='my-5'>{`${bookings && bookings.length} Bookings`}</h1>

                    <MDBDataTable
                        data={setBookings()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </>
            }

        </div>
    )
}

export default AllBookings
