import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import RoomItem from './room/RoomItem'
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination'
import { useRouter } from 'next/router'
import Link from 'next/link';

const Home = () => {
    const router = useRouter()

    let { page = 1, location } = router.query
    page= Number(page)
    const { rooms, resPerPage, roomsCount, filteredRoomsCount, message } = useSelector(state => state.rooms)

    
    useEffect(() => {
        toast.error(message)
    }, [message])
 
    const handlePagination = (pageNumber) => {
        window.location.href = `/?page=${pageNumber}`
    }

    let count = roomsCount;
    if (location) {
        count = filteredRoomsCount
    }
    return (
        <>
            <section id="rooms" className="container mt-5">

                <h2 className='mb-3 ml-2 stays-heading'>{location ? `Rooms in ${location}` : 'All Rooms' }</h2>
                <Link href='/search'>
                    <a className='ml-2 back-to-search'>
                        <i className='fa fa-arrow-left'></i> Back to Search
                    </a>
                </Link>
                <div className="row">
                    {rooms && rooms.length === 0 ?
                        <div className="alert alert-danger"><b>No Rooms</b></div>
                        :
                        rooms && rooms.map(room => (
                            <RoomItem key={room._id} room={room} />
                        ))
                    }
                </div>
            </section>

            {resPerPage < count &&
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={ page }
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomsCount}
                        onChange={handlePagination}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                        />
                </div>
            }
        </>
    )
}

export default Home
