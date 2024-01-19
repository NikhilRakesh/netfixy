import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../../context/Authcontext'

const Signup = () => {

    const [Remeber, setRemeber] = useState(true)
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const { user, sginUp } = userAuth()
    const navigate = useNavigate()

    const HandleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await sginUp(email, password)
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }


    return <>
        <div className='w-full h-screen'>
            <img
                className='hidden sm:block absolute  w-full h-full object-cover'
                src="https://assets.nflxext.com/ffe/siteui/vlv3/16006346-87f9-4226-bc25-a1fb346a2b0c/9662d0fd-0547-4665-b887-771617268815/IN-en-20240115-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                alt="" />
            <div className='bg-black/70 fixed top-0 left-0 w-full h-screen' />
            <div className='fixed w-full px-4 py-24 z-20'>
                <div className='max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className='text-3xl font-nsans-bold'>Sign Up</h1>
                        <form className='w-full flex flex-col py-4' onSubmit={HandleFormSubmit} >
                            <input
                                className='p-3 my-2 bg-gray-700 rounded'
                                placeholder='email'
                                autoComplete='email'
                                type="email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />

                            <input
                                className='p-3 my-2 bg-gray-700 rounded'
                                placeholder='password'
                                autoComplete='current-password'
                                type="password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                            />
                            <button className='bg-red-600 py-3 my-6 font-nsans-bold'>Sign Up</button>
                            <div className='flex justify-between items-center text-gray-600'>
                                <p>
                                    <input
                                        type="checkbox"
                                        className='mr-2'
                                        checked={Remeber}
                                        onChange={(e) => setRemeber(!Remeber)}
                                    />
                                    Remeber me
                                </p>
                                <p>Need Help?</p>
                            </div>
                            <p className='my-4'>
                                <span className='text-gray-600 mr-2'>
                                    Already subscribed to Netflix
                                </span>
                                <Link to='/login' > Sign In</Link >
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Signup
