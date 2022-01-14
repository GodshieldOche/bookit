import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { postForgotPassword } from '../../redux/features/forgotPassword'
import ButtonLoader from '../layout/ButtonLoader'
import Loader from '../layout/Loader'

const ForgotPassword = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')

    const { loading, success, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (message) {
            toast.error(message)
        }
    }, [message])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(postForgotPassword(email)).then(result => {
            if (!result.error) {
                const success = result.payload.message
                toast.success(success)
            } else {
                console.log(result)
            }
        })
    }

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading ? true : false}
                    >
                        {loading ? <ButtonLoader /> : 'SEND EMAIL'}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
