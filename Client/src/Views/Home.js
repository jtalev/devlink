import React from 'react'
import SubBar from '../Components/Home/SubBar';
import Hero from '../Components/Hero';
import Freelancers from '../Components/Home/Freelancers/Freelancers';
import Customers from '../Components/Home/Customers/Customers';

function Home() {
  return (
    <div>
        <Hero />
        <Freelancers />
        <Customers />
        <SubBar />
    </div>
  )
}

export default Home