import React from 'react'

function DevLinks() {
  return (
    <nav className='flex flex-col justify-center items-center'>
        <div>
            <h1 className='font-bold'>For Dev</h1>
        </div>
        <ul className='flex flex-col items-center'>
            <li>
                <a href='/'>How it works</a>
            </li>
            <li>
                <a href='/'>How to create a profile</a>
            </li>
            <li>
                <a href='/'>Find jobs</a>
            </li>
        </ul>
    </nav>
  )
}

export default DevLinks