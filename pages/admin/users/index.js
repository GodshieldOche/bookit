import { getSession } from 'next-auth/react'
import AllUsers from '../../../components/admin/AllUsers'
import Layout from '../../../components/layout/Layout'

const AdminUsersPage = () => {
    return (
        <Layout title='Admin Users'>
            <AllUsers />
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
export default AdminUsersPage
