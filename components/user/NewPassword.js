import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import ButtonLoader from '../layout/ButtonLoader'
import Loader from '../layout/Loader'
import { postResetPassword } from '../../redux/features/resetPassword'


const NewPassword = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { loading, success, message } = useSelector(state => state.resetPassword)

    useEffect(() => {
        if (message) {
            toast.error(message)
        }
    }, [message])

    const submitHandler = (e) => {
        e.preventDefault()
        const { token } = router.query
        dispatch(postResetPassword({token, password, confirmPassword})).then(result => {
            if (!result.error) {
                router.push('/login')
            } else {
                console.log(result)
            }
        })
    }
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3" 
                        disabled={loading ? true : false}
                    >
                        {loading ? <ButtonLoader /> : 'RESET PASSWORD'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default NewPassword
