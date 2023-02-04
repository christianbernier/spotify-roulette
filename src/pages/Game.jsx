// Game.jsx
// Page for playing the Spotify Roulette game. Plays a random
// song for the user and keeps track of score.

import React, {useState, useEffect, useRef} from "react"
import { get, put, createPlayer, getDeviceId } from "../components/Actions"
import "../styles/game.css"

const Game = () => {
    // Fetches the song data from a given album. Uses an accumulator to fetch
    // all the songs, even if there are more than 50.
    async function getSongsFromAlbums(albums, acc) {
        if (albums.length === 0) return setSongs(acc)

        const response = await get(`albums/${albums[0]}/tracks?limit=50`)

        albums.shift()
        acc = acc.concat(response.items.map(song => {
            return {
                name: song.name,
                id: song.id
            }
        }))
            
        return await getSongsFromAlbums(albums, acc)
    }

    // Plays the song with the provided ID
    async function playSong(song_id) {
        await put(`me/player/play?device_id=${getDeviceId()}`, {
            uris: [`spotify:track:${song_id}`]
        })
    }

    // Plays a random song from the albums selected
    const playRandomSong = () => {
        if (songs.length === 0) return

        const randomIndex = Math.floor(Math.random() * songs.length)
        setCurrentSongIndex(randomIndex)
        playSong(songs[randomIndex].id)
    }

    // Performs a guess action, checking if the user's song title matches
    // the actual song title (within reason), and updates the score and
    // feedback accordingly
    const makeGuess = () => {
        const songGuessField = document.getElementById(`song_guess_field`)
        
        const guess = songGuessField.value.toLowerCase().replace(/\([^()]*\)/g, '').replace(/[^a-zA-Z]+/g, '')
        .replace(/\s+/g, ' ')

        const correct = songs[currentSongIndexRef.current].name.toLowerCase().replace(/\([^()]*\)/g, '').replace(/[^a-zA-Z]+/g, '')

        if (guess === correct) {
            setFeedback(`Correct! That was “${songs[currentSongIndexRef.current].name}”`)
            setPoints(pointsRef.current + 1)
            playRandomSong()
        } else {
            setFeedback(`Try again!`)
        }

        songGuessField.value = ''
    }

    // Adds the ability to click the enter key to submit a guess
    const addEnterFunctionality = () => {
        const songGuessField = document.getElementById("song_guess_field")
        songGuessField.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                e.preventDefault()
                makeGuess()
            }
        })
    }

    const [songs, setSongs] = useState([])
    const [currentSongIndex, _setCurrentSongIndex] = useState(0)
    const currentSongIndexRef = useRef(currentSongIndex)
    const setCurrentSongIndex = index => {
        currentSongIndexRef.current = index
        _setCurrentSongIndex(index)
    }
    const [points, _setPoints] = useState(0)
    const pointsRef = useRef(points)
    const setPoints = points => {
        pointsRef.current = points
        _setPoints(points)
    }
    const [started, setStarted] = useState(false)
    const [feedback, setFeedback] = useState('Good luck!')

    // Upon loading the page, gets the album information from the URL
    // parameters and creates a Spotify player.
    useEffect(() => {
        const url = new URL(window.location.toLocaleString())
        const albums = JSON.parse(url.searchParams.get('albums'))

        if (albums) {
            getSongsFromAlbums(albums, [])
        } else {
            window.location = '/artists'
        }

        createPlayer()
    }, [])

    // When the game starts, add the ability to click enter to submit a guess
    useEffect(() => {
        if (started) addEnterFunctionality()
    }, [started])

    return (
        <>
            <p className="title">{(started)? "Name the song" : "Get ready!"}</p>
            <p className="back_button" onClick={() => {window.location = '/artists'}}>← Change artist</p>
            <p className="subtitle">{(started)? `Enter the name of the song you're hearing then click "Guess!"` : "Once the game starts, enter the name of the song you're hearing to earn as many points as possible!"}</p>
            {(started) ? <>
                <div className="text_field_and_button" id="game">
                    <input type="text" id="song_guess_field" className="text_field"></input>
                    <button className="big-button" onClick={() => {
                        makeGuess()
                    }}>Guess!</button>
                </div>
            </> : <></>}
            <div id="game_controls">
                <div id="skip_button">
                    <button className="big-button" onClick={() => {
                        if (!started) setStarted(true)
                        if (started) setFeedback(`The last one was “${songs[currentSongIndex].name}”`)
                        playRandomSong()
                    }}>{(started) ? "Skip song" : "Start!"}</button>
                </div>
                <div id="game_score">
                    {(started) ? 
                        <p className="score_text">Score: <span className="bold">{points} point{(points === 1) ? "" : "s"}</span>. {feedback}</p>
                        : <></>
                    }
                </div>
            </div>
        </>
    )
}

export default Game