// Actions.jsx
// Utility functions for performing API calls and other authorization-related
// tasks for the application.

// Gets the authorization token for the Spotify API from local storage. If it
// is not found, the user is redirected to the main page, where they can sign in
const getAuthToken = () => {
    const savedAccessToken = window.localStorage.getItem('access_token');
    if (savedAccessToken) {
        return savedAccessToken;
    } else {
        window.location = '/'
    }
}

// Returns headers for an authorized call to the Spotify API
const getAuthHeaders = () => {
    const token = getAuthToken()
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
}

// Performs an authorized GET request to the Spotify API
export const get = async url => {
    const response = await fetch(`https://api.spotify.com/v1/${url}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    return await response.json()
}

// Performs an authorized PUT request to the Spotify API with
// the provided body
export const put = async (url, body) => {
    await fetch(`https://api.spotify.com/v1/${url}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
    })
}

// Creates a Spotify player that can be used to play songs for the
// user. It also saves the device ID to local storage for retrieval
// later.
export const createPlayer = () => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
            name: 'Spotify Roulette',
            getOAuthToken: cb => { cb(getAuthToken()); },
            volume: 0.5
        });

        player.addListener('ready', ({ device_id }) => {
            window.localStorage.setItem('device_id', device_id)
        });

        player.connect();
    };
}

// Gets the device ID of the Spotify player created. If the device
// ID is not found in local storage, the user is redirected to the
// main page where they can sign in again.
export const getDeviceId = () => {
    const deviceId = window.localStorage.getItem('device_id')

    if (deviceId) {
        return deviceId
    } else {
        window.location = '/'
    }
}