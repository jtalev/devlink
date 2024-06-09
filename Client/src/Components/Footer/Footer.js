import React from 'react'
import DevLinks from './DevLinks'
import ClientLinks from './ClientLinks'
import Socials from './Socials'
import Policies from './Policies'

function Footer() {
  return (
      <div className='mt-4 w-full h-64 bg-teal-600 space-y-10'>
          <div className='flex justify-center mr-4 ml-4 pt-4'>
              <div className='w-60'>
                <DevLinks />
              </div>
              <div className='w-60'>
                <ClientLinks />
              </div>
              <div className='w-60'>
                <Socials />
              </div>
          </div>
          <div>  
            <Policies />
          </div>
    </div>
  )
}

export default Footer