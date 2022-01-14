import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { getAdminReviews, postDeleteReview } from '../../redux/features/adminReviews'



const RoomReviews = () => {

    const [roomId, setRoomId] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, reviews, message } = useSelector(state => state.adminReviews)
    
    useEffect(() => {

        if (message) {
            toast.error(message);
        }

        if (roomId !== '') {
            dispatch(getAdminReviews(roomId))
        }


        // if (isDeleted) {
        //     toast.success('Review is deleted.')
        //     dispatch({ type: DELETE_REVIEW_RESET })
        // }

    }, [dispatch, message, roomId])


    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        reviews && reviews.forEach((review, index) => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,
                actions:
                    <button className="btn btn-danger mx-2" onClick={() => deleteReviewHandler((review._id, index))}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;

    }

    const deleteReviewHandler = (id, index) => {
        if (roomId !== '' && id) {
            dispatch(postDeleteReview({id, roomId, index})).then(result => {
                if (!result.error) {
                    message = result.payload.message
                    toast.success(message)
                } else {
                    console.log(result)
                }
            })
        }
       
    }


    return (
        <div className='container container-fluid'>
            {loading ? <Loader /> :
                <>
                    <div className="row justify-content-center mt-5">
                        <div className="col-5">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="roomId_field">Enter Room ID</label>
                                    <input
                                        type="email"
                                        id="roomId_field"
                                        className="form-control"
                                        value={roomId}
                                        onChange={(e) => setRoomId(e.target.value)}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {reviews && reviews.length > 0 ?
                        <MDBDataTable
                            data={setReviews()}
                            className='px-3'
                            bordered
                            striped
                            hover
                        />
                        :
                        <div className="alert alert-danger mt-5 text-center">No Reviews</div>
                    }
                </>
            }

        </div>
    )
}

export default RoomReviews
