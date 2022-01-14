import Login from '../components/auth/Login'
import Layout from '../components/layout/Layout'
import { getSession } from 'next-auth/react'

export default function LoginPage() {
    return (
        <Layout title='Login'>
            <Login />
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}