import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAdminUsers, postDeleteUser } from '../../redux/features/adminUsers'


const AllUsers = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, users, message } = useSelector(state => state.adminUsers)

    useEffect(() => {

        dispatch(getAdminUsers())

        if (message) {
            toast.error(message);
        }

    }, [dispatch, message])


    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                { 
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        users && users.forEach((user, index)=> {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions:
                    <>
                        <Link href={`/admin/users/${user._id}`}>
                            <a className="btn btn-primary">
                                <i className="fa fa-pencil"></i>
                            </a>
                        </Link>

                        <button className="btn btn-danger mx-2" onClick={() => deleteUserHandler(user._id, index)}>
                            <i className="fa fa-trash"></i>
                        </button>

                    </>
            })
        })

        return data;

    }

    const deleteUserHandler = (id, index) => {
        dispatch(postDeleteUser({ id, index })).then(result => {
            if (!result.error) {
                message = result.payload.message
                toast.success(message)
            } else {
                console.log(result)
            }
        })
    }


    return (
        <div className='container container-fluid'>
            {loading ? <Loader /> :
                <>
                    <h1 className='my-5'>{`${users && users.length} Users`}</h1>


                    <MDBDataTable
                        data={setUsers()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />

                </>
            }
        </div>
    )
}

export default AllUsers
