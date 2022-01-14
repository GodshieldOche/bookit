import { getSession } from 'next-auth/react'
import AllBookings from '../../../components/admin/AllBookings'
import Layout from '../../../components/layout/Layout'

const AdminBookingsPage = () => {
    return (
        <Layout title='Admin Bookings'>
            <AllBookings />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}
export default AdminBookingsPage
