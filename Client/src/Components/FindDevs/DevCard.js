import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Utils/UserContext'
import { createNewMutualLinkDoc, deleteLink, getLinks } from '../../Utils/firebase'

function DevCard({ dev }) {

    const { user } = useContext(UserContext)
    const [links, setLinks] = useState([])
    const isLinked = links.some(linkObj => linkObj.link === dev.email)

    const createLinks = (dev) => {

        const userData = {
            user: user.email,
            link: dev.email
        }

        const devData = {
            user: dev.email,
            link: user.email
        }

        try {
            createNewMutualLinkDoc(userData, devData)
            fetchLinks()
        } catch (error) {
            console.log(error)
        }
        console.log(links)
    }

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

    const deleteLinks = async (userEmail, linkEmail) => {
        try {
            await deleteLink(userEmail, linkEmail)
            await deleteLink(linkEmail, userEmail)
            fetchLinks()
            console.log('Both links deleted successfully')
        } catch (error) {
            console.error('Error deleting links:', error)
            throw error
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

  return (
    <div className="border p-4 m-2 w-[680px]">
          <h2 className="font-bold text-lg">{dev.displayName}</h2>
          <p>{dev.email}</p>
          {user && user.displayName !== dev.displayName
              ? <button
                  className='ease-in duration-200 bg-gray-400 hover:bg-gray-500 rounded-lg w-20'
                  onClick={() => isLinked ? deleteLinks(user.email, dev.email) : createLinks(dev)}
              >{isLinked ? 'UnLink' : 'Link'}</button>
            : ''}
    </div>
  )
}

export default DevCard