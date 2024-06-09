import React from 'react'
import { useState, useEffect } from 'react'
import { getJobs } from '../../Utils/firebase'

import JobCard from './JobCard'

function Jobs() {

    const [jobs, setJobs] = useState([])
    const [searchTerms, setSearchTerms] = useState('')

    const filteredJobs = jobs.filter(job => (
        job.title.toLowerCase().includes(searchTerms.toLowerCase()) ||
        job.skills.toLowerCase().includes(searchTerms.toLowerCase())
    ))

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const jobData = await getJobs()
          setJobs(jobData)
        } catch (error) {
          console.log("Error fetching jobs:", error)
        }
      }
  
      fetchJobs()
    }, [])

  return (
    <div className='w-full'>
        <div className='w-full text-center text-2xl'>
              <h1 className='font-bold mt-2'>Find your next dream job!</h1>
              <input
                  type='text'
                  placeholder='Search by skills or title...'
                  className='p-2 border rounded'
                  value={searchTerms}
                  onChange={(e) => setSearchTerms(e.target.value)}
              />
          </div>
          <div className='flex flex-col items-center mt-4'>
            {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
    </div>
  )
}

export default Jobs