import React, { useContext, useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import VideoPlayer from './VideoPlayer'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../Utils/UserContext'
import { database } from '../../Utils/firebase'
import { ref, set } from 'firebase/database'
import { encodeEmail } from '../../Utils/util'

function VideoCall() {

    const APP_ID = 'e68af7639e75496ca3347fd85a51f330'
    const TOKEN = '007eJxTYIj9PNVTVy3aLV3rWuZXTt0NQuU86od+1gVklqs22Xb/fK7AkGpmkZhmbmZsmWpuamJplpxobGxinpZiYZpoaphmbGygNEk5tSGQkUGKy4mRkQECQXx2hpTUspzMvGwGBgDr8R03'
    const CHANNEL = 'devlink'

    const client = AgoraRTC.createClient({
        mode: 'rtc',
        codec: 'vp8'
    })

    const [users, setUsers] = useState([])
    const { user } = useContext(UserContext)
    const { invitedEmail } = useParams()
    const [localTracks, setLocalTracks] = useState({
        audioTrack: null,
        videoTrack: null
    })

    const handleUserJoined = async (user, mediaType) => {
        await client.subscribe(user, mediaType)

        if (mediaType === 'video') {
            setUsers((previousUsers) => [...previousUsers, user])
        }

        if (mediaType === 'audio') {
            user.audioTrack.play()
        }
    }

    const handleUserLeft = (user) => {
        setUsers((previousUsers) => 
            previousUsers.filter((u) => u.id !== user.uid)
        )
    }

    useEffect(() => {
        client.on('user-published', handleUserJoined)
        client.on('user-left', handleUserLeft)

        client
            .join(APP_ID, CHANNEL, TOKEN, null)
            .then((uid) =>
                Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
            ).then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks
                setLocalTracks({ audioTrack, videoTrack })
                setUsers((previousUsers) => [...previousUsers, {
                    uid,
                    videoTrack
                }])
                client.publish(tracks)
            })
        
        return () => {
            client.leave()
            if (localTracks.audioTrack) {
                localTracks.audioTrack.stop()
                localTracks.audioTrack.close()
            }
            if (localTracks.videoTrack) {
                localTracks.videoTrack.stop()
                localTracks.videoTrack.stop()
            }    
            client.removeAllListeners()
        }
    }, [])

    const inviteUser = (invitedEmail, inviterEmail, channelId) => {
        const encodedEmail = encodeEmail(invitedEmail)
        const inviteRef = ref(database, `invitations/${encodedEmail}`)

        set(inviteRef, {
            inviter: inviterEmail,
            channelId: channelId
        })
    }

    useEffect(() => {
        inviteUser(invitedEmail, user.email, invitedEmail)
    }, [invitedEmail])

  return (
      <div className='flex justify-center'>
          {users.map((user) => (
              <VideoPlayer key={user.uid} user={user} />
          ))}
    </div>
  )
}

export default VideoCall