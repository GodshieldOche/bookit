import { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { useDispatch, useSelector }from 'react-redux'
import { postRegister } from '../../redux/features/register'
import ButtonLoader from '../layout/ButtonLoader'

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const { success, loading, message } = useSelector(state => state.register)

    useEffect(() => {
        if (success) {
            router.push('/login')
        }
        if (message) {
            toast.error(message)
        }

    }, [dispatch, router, success, message])

    const submitHandler = (e) => {
        e.preventDefault()

        const userData = { name, email, password, avatar }
        dispatch(postRegister(userData))
    }

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result)
                    setAvatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Join Us</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Full Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name='name'
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
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <Image
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='image'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>


                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            {loading ? <ButtonLoader /> : 'REGISTER'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
