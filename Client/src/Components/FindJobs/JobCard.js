import React from 'react'
import { useState } from 'react'

function JobCard({ job }) {

    const [isExpanded, setIsExpanded] = useState(false)

    const toggleDetails = () => {
        setIsExpanded(pre => !pre)
    }

  return (
    <div onClick={toggleDetails} className="border p-4 m-2 w-[680px]">
          <h2 className="font-bold text-lg">{job.title}</h2>
          <p>${job.min}-{job.max}</p>
          <p className='mt-2'>{job.description}</p>
          <p className='mt-2'>Desired Skills - {job.skills}</p>
          {isExpanded && (
              <div>
                  <p>Job Length - {job.length}</p>
                  <p>Hours - {job.hours}</p>
                  <p>Project Images:</p>
                  {Array.isArray(job.imageUrls) && job.imageUrls.length > 0 ? (
                        job.imageUrls.map((url, index) => (
                            <img key={index} className='mt-2' src={url} alt='Job related'></img>
                        ))
                    ) : (
                        <p>No images available for this job.</p>
                    )}
              </div>
          )}
    </div>
  )
}

export default JobCard