import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Utils/UserContext'
import { getLinks } from '../../Utils/firebase'

function LinkCard() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)
    const [links, setLinks] = useState([])

    const fetchLinks = async () => {
        if (user != null) {
            try {
                const linksData = await getLinks(user.email)
                setLinks(linksData)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    const handleInvite = (linkEmail) => {
        navigate('/video-room/' + linkEmail)
    }
    

  return (
    <div>
        {links.map((link, index) => (
            <div key={index} className="border p-4 m-2 w-[680px]">
                <p>Link: {link.link}</p>
                <button
                    className='ease-in duration-200 bg-gray-400 hover:bg-gray-500 rounded-lg w-36'
                    onClick={() => handleInvite(link.link)}
                >Invite to video call</button>
            </div>
        ))}
    </div>
  )
}

export default LinkCard