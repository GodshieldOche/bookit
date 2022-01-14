import { getSession } from 'next-auth/react'
import RoomReviews from '../../components/admin/RoomReviews'
import Layout from '../../components/layout/Layout'

const AdminReviewsPage = () => {
    return (
        <Layout title='Room Reviews'>
            <RoomReviews />
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
export default AdminReviewsPage
