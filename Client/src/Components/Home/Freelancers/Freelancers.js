import React from 'react'
import { useState } from 'react'
import FreelancerCard from './FreelancerCard'
import { faker } from '@faker-js/faker'

function Freelancers() {
  const [visibleCount, setVisibleCount] = useState(3);
  const totalFreelancers = 9;
  
  const cardData = Array.from({ length: totalFreelancers }, (_, id) => ({
    id,
    img: faker.internet.avatar(),
    name: faker.person.fullName(),
    description: faker.person.bio(),
    rating: Math.ceil(Math.random() * 5)
  }));

  return (
    <div className='w-full mt-8 space-y-4'>
      <div className='w-full text-center text-2xl'>
        <h1 className='font-bold'>Featured Freelancers</h1>
      </div>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center'>
          {cardData.slice(0, visibleCount).map((data) =>
              <FreelancerCard
              key={data.id}
              img={data.img}
              name={data.name}
              description={data.description}
              rating={data.rating}
              />
            )}
        </div>
      </div>
      <div className='w-full text-center'>
        <button
          className='bg-gray-400 transition ease-in-out hover:bg-gray-500  w-36 h-8 rounded-xl'
          onClick={() => setVisibleCount(visibleCount === 3 ? totalFreelancers : 3)}>
          {visibleCount === 3 ? "See more" : "See less"}
        </button>
      </div>
    </div>
  )
}

export default Freelancers