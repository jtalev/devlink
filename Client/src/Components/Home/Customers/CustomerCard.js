import React from 'react';

import star from '../../../Images/star.svg';

function CustomerCard(props) {
  return (
    <div className='w-60'>
        <div className='flex justify-center w-full h-40 overflow-hidden'>
            <img className='object-cover' src={props.img} alt='stock dev img'></img>
        </div>
        <div>
            <h1 className='font-bold'>{props.name}</h1>
        </div>
        <div className='h-14'>
            <p><span className='font-bold'>Description:</span> {props.description}</p>
        </div>
        <div className='flex'>
              <img className='w-6' src={star} alt='star'></img>
              <p>{props.rating}</p>
        </div>
    </div>
  )
}

export default CustomerCard