import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getDocByEmail } from '../../Utils/firebase'
import { UserContext } from '../../Utils/UserContext'

function LoginCard() {

  const [contact, setContact] = useState({
    email: '',
    password: ''
  })

  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

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
    event.preventDefault()

    const userDoc = await getDocByEmail(contact.email)
    
    if (userDoc !== undefined && userDoc.password === contact.password) {
      console.log('login successful')
      alert('login succeeded')
      setUser(userDoc)
      navigate('/')
    }
    else {
      console.log('login failed')
      alert('login failed')
    }
    console.log(user)
  }

  return (
      <div className='flex justify-center mt-4 mb-10 font-medium'>
          <div className='w-96'>
            <ul className='flex justify-end text-teal-600 mr-4'>
                <li>
                    <Link to='/create-account'>Sign Up</Link>
                </li>
            </ul>
            <section>
                  <form className='flex flex-col gap-y-4'>
                      <div className='flex flex-col'>
                        <label for='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            className='border-2'
                            onChange={handleChange}
                        />
                      </div>
                      <div className='flex flex-col'>
                        <label for='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='border-2'
                            onChange={handleChange}
                        /> 
                      </div>
                      <input
                          type='submit'
                          value='Login'
                          className='bg-teal-600 text-white p-1'
                          onClick={handleSubmit}
                      />
                </form>
            </section>
          </div>
    </div>
  )
}

export default LoginCard