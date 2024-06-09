import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../Hero'

function Cancel() {
  return (
    <div>
        <Hero />
        <div className="flex flex-col items-center justify-center">
            <h1 className='mt-2 text-2xl'>Payment cancelled</h1>
            <Link to='/post-job' className='mt-4'><button className='ease-in duration-200 bg-gray-400 hover:bg-gray-500 rounded-lg w-20'>Try again</button></Link>    
        </div>
    </div>
  )
}

export default Cancel