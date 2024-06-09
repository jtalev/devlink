import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../Utils/UserContext'

function NavBar() {

  const { user, setUser } = useContext(UserContext)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    setUser(null)
    alert("successfully logged out")
  }

  return (
      <nav className="w-full p-1 flex justify-between items-center bg-gray-200 font-bold">
          <div className='ml-2'>
            <Link to='/'>DevLink Marketplace</Link>
          </div>
          <ul className='flex space-x-6 mr-2'>
            <li>
              <Link to='/find-dev'>Find DEV</Link>
            </li>
            <li>
              <Link to='/find-job'>Find Jobs</Link>
            </li>
            <li>
              <Link to='/post-job'>Post Job</Link>
            </li>
            <li className='relative'>
              {user ? (
                <>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="bg-transparent border-0 p-0 cursor-pointer focus:outline-none"
                  >
                    {user.displayName}
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute top-full left-0 mt-2 w-48 border border-gray-300 bg-white text-black rounded-lg shadow-md">
                      <li className="p-2 hover:bg-gray-200 cursor-pointer">
                        <Link to='/my-links'>My Links</Link>
                      </li>
                      <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <Link to='/login'>Login</Link>
              )}
            </li>
            <li>
              <Link to='/create-account'>Create Account</Link>
            </li>
          </ul>
      </nav>
  )
}

export default NavBar