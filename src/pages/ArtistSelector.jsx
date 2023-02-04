// ArtistSelector.jsx
// A page where the user selects which artist they would
// like to play with.

import React, {useState, useEffect} from 'react'
import { get } from '../components/Actions'

import '../styles/artists.css'

const ArtistSelector = () => {
    // Search Spotify for an artist's name and update the state
    const searchForArtist = async artistName => {
        const response = await get(`search?q=${artistName}&type=artist`)
        setArtists(response.artists.items.map(artist => {
            return {
                name: artist.name,
                id: artist.id,
                image: artist?.images[0]?.url
            }
        }))
    }

    // Upon loading this page, add the ability to click the Enter key to
    // submit a search for an artist
    useEffect(() => {
        const artistSearchField = document.getElementById("artist_search_field")
        artistSearchField.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                e.preventDefault()
                artistSearchField.blur()
                searchForArtist(artistSearchField.value)
            }
        })
    }, [])

    // the artist information obtained by using the searchForArtist method
    const [artists, setArtists] = useState([])

    return (
        <>
            <p className="title">Select an artist</p>
            <p className="back_button" onClick={() => window.location="/"}>← Home</p>
            <p className="subtitle">Using the search field and buttons below, choose an artist or band whose music you know well to shuffle.</p>
            <div className="text_field_and_button">
                <input type="text" id="artist_search_field" className="text_field" placeholder="Artist or band name"/>
                <button className="big-button" onClick={() => {searchForArtist(document.querySelector("#artist_search_field").value)}} >
                        Search
                </button>
            </div>
            <div className="artist_group">
                {artists.slice(0,5).map(art => 
                        <p key={art.id}>
                            <button className="artist_button" onClick={() => {window.location = `/albums?artist=${art.id}`}}>
                                <img className="artist_image" src={art.image}/>
                                <p className="artist_name">{art.name}</p>
                            </button>
                        </p>
                )}
            </div>
        </>
    )
}

export default ArtistSelector