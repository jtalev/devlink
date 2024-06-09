import React, { useCallback, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Hero from '../Hero'

function Success() {
  const location = useLocation()

  const checkPayment = useCallback(async () => {
    const sessionId = new URLSearchParams(location.search).get('sessionId')
    console.log(sessionId)

    if (sessionId) {
      await validatePayment(sessionId)
    }
  }, [location])

  const validatePayment = async (sessionId) => {
    const response = await fetch(`http://localhost:4000/api/validate-payment/${sessionId}`, {
        method: 'GET'
    });

    const data = await response.json();
    console.log(data.message)
  }

  useEffect(() => {
    checkPayment()
  }, [checkPayment])

  return (
    <div>
        <Hero />
        <div className="flex flex-col items-center justify-center">
            <h1 className='mt-2 text-2xl'>Payment successful</h1>
            <Link to='/find-job' className='mt-4'><button className='ease-in duration-200 bg-gray-400 hover:bg-gray-500 rounded-lg w-32'>Browse jobs</button></Link>    
        </div>
    </div>
  )
}

export default Success