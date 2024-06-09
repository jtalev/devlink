import React from 'react'

function Policies() {
  return (
    <nav className='flex flex-col items-center justify-center p-4'>
        <div>
            <h1 className='font-bold mb-2'>DEVLink</h1>
        </div>
        <ul className='w-full flex justify-center'>
            <li className='text-center w-36'>
                <a href='/'>Privacy Policy</a>
            </li>
            <li className='text-center w-36'>
                <a href='/'>Terms</a>
            </li>
            <li className='text-center w-36'>
                <a href='/'>Code of Conduct</a>
            </li>
        </ul>
    </nav>
  )
}

export default Policies
