import React, { useState } from 'react'
import { createNewJobDoc } from '../../Utils/firebase'
import { redirectToCheckout } from '../../Utils/stripe'

import Experience from './Experience'
import Hero from '../Hero'
import AddImage from './AddImage'

function NewJobForm() {

    const [selectedJobType, setSelectedJobType] = useState('freelance')
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        skills: "",
        length: "",
        min: "",
        max: "",
        hours: "",
        experienceData: {},
        imageUrls: []
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(pre => ({
            ...pre,
            [name]: value
        }))
        console.log(formData)
    }

    const handleExperienceChange = (expData) => {
        setFormData(pre => ({
            ...pre,
            experienceData: {
                ...pre.experienceData,
                ...expData
            }
        }))
    }

    const handleImageListChange = (imageData) => {
        const {imageUrls} = imageData
        setFormData(pre => ({
            ...pre,
            imageUrls: [...pre.imageUrls, ...imageUrls]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (selectedJobType === 'freelance') {
            await createNewJobDoc(formData).then(setSubmitSuccess(true))
        }
        else if (selectedJobType === 'employment') {
            redirectToCheckout(formData)
        }
    }

  return (
      <div>
        <Hero />
        <div className='w-full flex justify-center align-center mt-4'>
            <div className='w-2/3 max-w-screen-lg'>
                <form onSubmit={handleSubmit}>
                    <section>
                        <div className='bg-gray-200 pl-2'>
                            <p>New Job</p>
                        </div>
                        <div className='flex pl-2 mt-2 mb-2'>
                            <p>Select Job Type:</p>
                            <div className='ml-6'>
                                <input
                                    type='radio'
                                    id='freelance'
                                    name='job-type'
                                    className='mr-2'
                                    checked={selectedJobType === 'freelance'}
                                      onChange={() => {
                                          setSelectedJobType('freelance')
                                          setFormData(pre => ({
                                              ...pre,
                                              experienceData: {}
                                          }))
                                      }}
                                />
                                <label for='freelance'>Freelance</label>
                            </div>
                            <div className='ml-6'>
                                <input
                                    type='radio'
                                    id='employment'
                                    name='job-type'
                                    className='mr-2'
                                    checked={selectedJobType === 'employment'}
                                    onChange={() => setSelectedJobType('employment')}
                                />
                                <label for='employment'>Employment</label> 
                            </div>
                        </div>
                        <div className='pl-2 mb-2'>
                            {selectedJobType === 'employment' ? '* Employment job postings incur a fee' : ''}      
                        </div>
                    </section>
                    <section>
                        <div className='bg-gray-200 pl-2'>
                            <p>Describe your job</p>
                        </div>
                        <div className='pl-2 mt-2 flex'>
                            <label for='title' className='w-36'>Title/Position</label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                onChange={handleChange}
                                className='border border-solid border-black w-64'
                            />
                        </div>
                        <div className='pl-2 mt-2 flex'>
                            <label for='description' className='w-36'>Job Description</label>
                            <textarea 
                                id='description' 
                                name='description' 
                                onChange={handleChange}
                                className='border border-solid border-black flex-1'
                                rows='2'
                            />
                        </div>
                        <div className='pl-2 mt-2 flex'>
                            <label for='skills' className='w-36'>Skills</label>
                            <input
                                type='text'
                                id='skills'
                                name='skills'
                                onChange={handleChange}
                                className='border border-solid border-black flex-1'
                            />
                        </div>
                        <div className='pl-2 mt-2'>
                            <p>Developers will find your job based on the skills you added here</p>
                        </div>
                    </section>
                    <section>
                        <div className='bg-gray-200 pl-2 mt-2'>
                            <p>Project Conditions</p>
                        </div>
                        <div className='pl-2 mt-2 flex'>
                            <label for='length' className='w-36'>Project Length</label>
                            <input
                                type='text'
                                id='length'
                                name='length'
                                onChange={handleChange}
                                className='border border-solid border-black w-48'
                            />
                        </div>
                        <div className='pl-2 flex mt-2'>
                            <p className='w-36'>Payment</p>
                            <label for='min' className='mr-2'>Min</label>
                            <input
                                type='text'
                                id='min'
                                name='min'
                                onChange={handleChange}
                                className='border border-solid border-black w-20 mr-10'
                            />
                            <label for='max' className='mr-2'>Max</label>
                            <input
                                type='text'
                                id='max'
                                name='max'
                                onChange={handleChange}
                                className='border border-solid border-black w-20'
                            />
                        </div>
                        <div className='pl-2 mt-2 flex'>
                            <label for='hours' className='w-36'>Working Hours</label>
                            <input
                                type='text'
                                id='hours'
                                name='hours'
                                onChange={handleChange}
                                className='border border-solid border-black w-48'
                            />
                        </div>
                    </section>
                    <section>
                          {selectedJobType === 'employment' ? <Experience onExperienceChange={handleExperienceChange} /> : ""}
                    </section>
                    <section>
                          <AddImage onImageListChange={handleImageListChange} />
                    </section>
                    <div className='flex justify-end'>
                          <button type='submit' className='ease-in duration-200 bg-gray-400 hover:bg-gray-500 rounded-lg w-16'>
                              {selectedJobType === 'employment' ? 'Pay' : 'Post'}
                          </button>
                    </div>
                </form>
                <div className='flex justify-center'>
                    <p>{submitSuccess ? "Job submitted successfully" : "" }</p>
                </div>
            </div>
        </div>
      </div>
  )
}

export default NewJobForm