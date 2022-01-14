import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { fetchUser, postUpdateUser } from '../../redux/features/updateUser';

const UpdateUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, user, message } = useSelector(state => state.updateUser)

    const {id} = router.query;

    useEffect(() => {

        if (user && user._id !== id) {
            dispatch(fetchUser(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setRole(user.role)
        }

        if (message) {
            toast.error(message);
        }
        
    }, [dispatch, id, user, message])


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name, email, role
        }

        dispatch(postUpdateUser({id, name, email, role})).then(result => {
            if (!result.error) {
                router.push('/admin/users')
            } else {
                console.log(result)
            }
        })

    }

    return (
        <>
            {loading ? <Loader /> :
                <div className="container container-fluid">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select id="role_field" className="form-control" name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}

                                    >

                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default UpdateUser
