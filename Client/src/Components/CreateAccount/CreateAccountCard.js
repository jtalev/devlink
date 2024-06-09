import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '../../Utils/firebase'
import { Link } from 'react-router-dom'

function CreateAccountCard() {

    const [contact, setContact] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword:''
    })

    const [createUserSuccess, setCreateUserSuccess] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target
        setContact((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (contact.password !== contact.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(contact.email, contact.password)
            await createUserDocFromAuth(user, { displayName: contact.displayName, password: contact.password })
            setCreateUserSuccess(true)
        } catch (error) {
            console.log('Error in creating user', error.message)
        }
    }

  return (
      <div className='flex justify-center mt-4 mb-10 font-medium'>
          <div className='w-[32rem]'>
              {createUserSuccess ? (
                  <div className='flex justify-center'>
                      <div className='text-center w-96'>
                        <h1 className=''>Account created successfully</h1>
                        <div className='flex justify-center text-center'>
                            <h1>Head to&nbsp;</h1>
                            <Link to={'/login'} className='text-teal-600'>login</Link>   
                        </div>
                      </div>
                    </div>
              ) : (
                <div>
                    <div className='flex justify-center mb-4 text-teal-600'>
                        <p>Create a DevLink Account</p>
                    </div>
                    <form className='flex flex-col gap-y-4'>
                        <div className='flex justify-between'>
                            <label for='name'>Name</label>
                            <input
                                type='text'
                                id='displayName'
                                name='displayName'
                                className='border-2 w-2/3'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label for='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                className='border-2 w-2/3'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label for='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                className='border-2 w-2/3'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label for='confirmPassword'>Confirm Password</label>
                            <input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                className='border-2 w-2/3'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex justify-center'>
                            <input
                                type='submit'
                                value='Create'
                                className='bg-teal-600 w-96 text-white p-1'
                                onClick={handleSubmit}
                            />  
                        </div>
                    </form>
                </div>
            )}
          </div>
    </div>
  )
}

export default CreateAccountCard