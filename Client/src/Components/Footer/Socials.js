import React from 'react';

import fbicon from '../../Images/SocialsIcons/fb-icon.png';
import twittericon from '../../Images/SocialsIcons/twitter-icon.png';
import instaicon from '../../Images/SocialsIcons/insta-icon.png';

function Socials() {
  return (
    <nav className='flex flex-col items-center space-y-4'>
        <div>
            <h1 className='font-bold'>Stay connected</h1>
        </div>
        <ul className='flex space-x-4'>
            <li>
                <a href='/'>
                    <img className='w-8' src={fbicon} alt='facebook icon'></img>
                </a>
            </li>
            <li>
                <a href='/'>
                    <img className='w-8' src={twittericon} alt='twitter icon'></img>
                </a>
            </li>
            <li>
                <a href='/'>
                    <img className='w-8' src={instaicon} alt='instagram icon'></img>
                </a>
            </li>
        </ul>
    </nav>
  )
}

export default Socials