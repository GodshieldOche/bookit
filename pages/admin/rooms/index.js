import { getSession } from 'next-auth/react'
import AllRooms from '../../../components/admin/AllRooms'
import Layout from '../../../components/layout/Layout'

const AdminRoomsPage = () => {
    return (
        <Layout title='Admin Rooms'>
            <AllRooms />
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
export default AdminRoomsPage
