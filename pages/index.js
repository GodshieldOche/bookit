import Layout from '../components/layout/Layout'
import Home from '../components/Home'
import { wrapper } from '../redux/store'
import { fetchRooms } from '../redux/features/rooms'

export default function Index() {
  return (
    <Layout>
      <Home/>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query }) => {
  const {page, location, guest, category} = query
  await store.dispatch(fetchRooms({ req, page, location, guest, category}))
})