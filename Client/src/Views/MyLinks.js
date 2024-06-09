import React from 'react'
import Hero from '../Components/Hero'
import LinkCard from '../Components/MyLinks/LinkCard'

function MyLinks() {
  return (
      <div className='w-full flex flex-col items-center'>
          <Hero />
          <LinkCard />
    </div>
  )
}

export default MyLinks