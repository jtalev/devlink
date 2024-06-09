import React from 'react'

function ClientLinks() {
  return (
    <nav className='flex flex-col justify-center items-center'>
        <div>
            <h1 className='font-bold'>For Clients</h1>
        </div>
        <ul className='flex flex-col items-center'>
            <li>
                <a href='/'>How it works</a>
            </li>
            <li>
                <a href='/'>How to post a job</a>
            </li>
            <li>
                <a href='/'>Find dev</a>
            </li>
        </ul>
    </nav>
  )
}

export default ClientLinks