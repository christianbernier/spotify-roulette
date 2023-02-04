// AuthenticateUser.jsx
// Callback URL for the Spotify authentication. Saves the user's
// access key in the local storage for the game to use.

import React, { useEffect } from 'react'

const AuthenticateUser = () => {
    // Upon loading this page, update the access token in local
    // storage with the token in the URL parameters.
    useEffect(() => {
        // get the parameters (tokens or error) from the URL after the hash mark
        const getHashParams = () => {
            let hashParams = {}
            let next
            const regex = /([^&;=]+)=?([^&;]*)/g
            const params = window.location.hash.substring(1)
            
            while (next = regex.exec(params)) {
                hashParams[next[1]] = decodeURIComponent(next[2])
            }
            
            return hashParams;
        }
        
        const params = getHashParams()
        
        // if there is an error, alert the user. otherwise, set the auth token
        if (params.error) {
            window.location = '/'
        } else {
            window.localStorage.setItem('access_token', params.access_token)
            window.location = '/artists'
        }
    }, []);
    
    return (<></>);
}
        
export default AuthenticateUser;