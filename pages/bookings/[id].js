import { getSession } from 'next-auth/react'
import BookingDetails from '../../components/bookings/BookingDetails'
import Layout from '../../components/layout/Layout'
import { getBookingDetails } from '../../redux/features/bookingDetails'
import { wrapper } from '../../redux/store'

const BookingDetailsPage = () => {
    return (
        <Layout title='Booking Details'>
            <BookingDetails />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    const session = await getSession({ req })
    const {id} = params
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const authCookie = req.headers.cookie
    await store.dispatch(getBookingDetails({ req, authCookie, id }))
})
export default BookingDetailsPage
