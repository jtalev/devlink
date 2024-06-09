import React from 'react'
import { useState } from 'react'

function Experience(props) {

    const [experience, setExperience] = useState([{
        exp: "",
        time: ""
    }])

    const handleChange = (e) => {
        const { name, value } = e.target
        setExperience(pre => ({
            ...pre,
            [name]: value
        }))

        props.onExperienceChange({
            [name]: value
        })
        console.log(experience)
    }

  return (
    <div className='mt-2'>
        <p className='bg-gray-200 pl-2'>Experience</p>
        <div className=''>
            <div className='flex pl-2 mt-2'>
                <label for='exp' className='w-36'>Skills</label>
                <input
                    type='text'
                    id='exp'
                    name='exp'
                    onChange={handleChange}
                    className='border border-solid border-black flex-1'
                />
            </div>
            <div className='flex pl-2 mt-2'>
                <label for='time' className='w-36'>Years Experience</label>
                <input
                    type='text'
                    id='time'
                    name='time'
                    onChange={handleChange}
                    className='border border-solid border-black w-36'
                />
            </div>
        </div>
    </div>
  )
}

export default Experience