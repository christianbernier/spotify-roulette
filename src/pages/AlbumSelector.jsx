// AlbumSelector.jsx
// A page where the user selects which albums they would
// like to play with. An artist is passed to this page as
// a URL parameter (/albums?artist=______)

import React, {useState, useEffect} from 'react'
import { get } from '../components/Actions'
import AlbumList from '../components/AlbumList'
import '../styles/albums.css'

const AlbumSelector = () => {
    // Fetches all albums by a given artist and updates the state
    async function getAlbums(artist_id) {
        const response = await get(`artists/${artist_id}/albums?limit=50`)
        setAlbums(
            response.items
            .filter(album => ['album', 'single'].includes(album.album_group))
            .map(album => {
            return {
                title: album.name,
                id: album.id,
                type: album.album_group,
                img: album?.images[0]?.url,
                year: album.release_date.substring(0, 4)
            }
        }))
    }

    const [albums, setAlbums] = useState([])
    const [chosen, setChosen] = useState([])

    // Upon loading this page, fetch all the artist's albums
    useEffect(() => {
        const url = new URL(window.location.toLocaleString())
        const artistId = url.searchParams.get('artist')

        if (artistId) {
            getAlbums(artistId)
        } else {
            window.location = '/artists'
        }
    }, [])

    return (
        <>
            <p className="title">Select albums, singles, and EPs</p>
            <p className="back_button" onClick={() => {window.location = '/artists'}}>← Change artist</p>
            <p className="subtitle">Using the buttons below, select which albums, singles, and EPs you know well.</p>
                
                <AlbumList
                    title="Albums"
                    albums={albums.filter(a => (a.type === "album"))}
                    chosen={chosen}
                    setChosen={setChosen}
                />

                <AlbumList
                    title="Singles and EPs"
                    albums={albums.filter(a => (a.type === "single"))}
                    chosen={chosen}
                    setChosen={setChosen}
                />

                <button className={`big-button ${(chosen.length === 0 ? "grayed_out" : "")}`} onClick={() => {
                    window.location = `/play?albums=${JSON.stringify(chosen.map(a => a.id))}`
                }}>
                    Done selecting
                </button>
        </>
    )
}

export default AlbumSelector