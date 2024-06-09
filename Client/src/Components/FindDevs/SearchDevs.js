import React, { useState, useEffect } from 'react'
import { getUsers } from '../../Utils/firebase'

import DevCard from './DevCard';

function SearchDevs() {

    const [devs, setDevs] = useState([])
    const [searchTerms, setSearchTerms] = useState('')

    const filteredDevs = devs.filter(dev => 
        dev.displayName.toLowerCase().includes(searchTerms.toLowerCase())
    );

    useEffect(() => {
      const fetchDevs = async () => {
        try {
          const devData = await getUsers()
          setDevs(devData)
        } catch (error) {
          console.log("Error fetching users:", error)
        }
      }

      fetchDevs()
    }, [])

  return (
    <div className='w-full'>
      <div className='w-full text-center text-2xl'>
          <h1 className='font-bold mt-2'>Connect with other devs!</h1>
          <input
              type='text'
              placeholder='Search by name...'
              className='p-2 border rounded'
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
          />
      </div>
      <div className='flex flex-col items-center mt-4'>
            {filteredDevs.map(dev => <DevCard key={dev.id} dev={dev} />)}
        </div>
    </div>
  )
}

export default SearchDevs