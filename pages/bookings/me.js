import { getSession } from 'next-auth/react'
import Layout from '../../components/layout/Layout'
import MyBookings from '../../components/bookings/MyBookings'
import { wrapper } from '../../redux/store'
import { getBookings } from '../../redux/features/bookings'

const MyBookingsPage = () => {
    return (
        <Layout title='My Bookings'>
            <MyBookings/>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
    const session = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const authCookie = req.headers.cookie
    await store.dispatch(getBookings({req, authCookie}))
})
export default MyBookingsPage
