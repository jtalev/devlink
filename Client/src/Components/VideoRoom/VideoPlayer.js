import React, { useEffect, useRef } from 'react'

function VideoPlayer({ user }) {

    const ref = useRef()
    
    useEffect(() => {
        user.videoTrack.play(ref.current)
    }, [])

  return (
        <div>
            Uid: {user.uid}
            <div ref={ref} className='w-64 h-64'>
                
            </div>
        </div>
  )
}

export default VideoPlayer