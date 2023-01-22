import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Helmet from '../components/Helmet/Helmet'

import { login, reset } from '../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            // toast.error(message)
        }

        // Redirect when logged in
        if(isSuccess && user){
            navigate('/')
            // toast.success(message)
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <Helmet title='Login' />
            <section id='login' className='slide-up' >
                <div className="bg-white container">
                    <div className='flex flex-center h-fill col'>
                        <h2>LOGIN</h2>

                        <form onSubmit={handleSubmit} className='flex flex-center col space-around'>
                            <div>
                                <input 
                                    type='email' 
                                    className='form-control' 
                                    id='email' 
                                    name='email'
                                    value={email} 
                                    onChange={handleChange} 
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    type='password' 
                                    className='form-control' 
                                    id='password' 
                                    name='password'
                                    value={password} 
                                    onChange={handleChange} 
                                    placeholder='Enter your password'
                                    required
                                />
                            </div>
                            <div>
                                <button className='btn-long hover-button round-corners border'>
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                        <aside className='flex'>
                            <a href='/register'>Not registered? click here</a>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login