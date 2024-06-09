import React, { createContext, useEffect, useState } from "react";
import { ref, off, onValue, set } from 'firebase/database'
import { database } from '../Utils/firebase'
import { encodeEmail } from "./util";

export const UserContext = createContext()

export const UserProvider = ({ children, navigate }) => {
    const [user, setUser] = useState(null)
        
    useEffect(() => {
        const handleInvite = snapshot => {
            console.log('handling invite')
            const invite = snapshot.val();
            if (invite && invite.inviter) {
                const msg = `Join call with ${invite.inviter}`;
                
                if (window.confirm(msg)) {
                    navigate(`/video-room/${invite.channelId}`);
                    // Remove the invite from the database after it has been acted upon
                    const userEmailKey = encodeEmail(user.email);
                    const inviteRef = ref(database, `invitations/${userEmailKey}`);
                    set(inviteRef, null);  // This will remove the entry
                }
            }
        };     
    
        if (user) {
            console.log('user logged in')
            const encodedEmail = encodeEmail(user.email)
            console.log(encodedEmail)
            const inviteRef = ref(database, `invitations/${encodedEmail}`);
            onValue(inviteRef, handleInvite);
    
            // Return a cleanup function to clear the listener
            return () => {
                off(inviteRef, 'value', handleInvite);
            };
        }
    }, [user]);
    

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}