import RoomDetails from '../../components/room/RoomDetails'
import { wrapper } from '../../redux/store'
import Layout from '../../components/layout/Layout'
import { fetchRoom } from '../../redux/features/room'

export default function RoomDetailsPage() {
    return (
        <Layout>
            <RoomDetails title='Room Details' />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    const id = params.id
    await store.dispatch(fetchRoom({req, id}))
})