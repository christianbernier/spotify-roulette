// Home.jsx
// Homepage for the game, explaining the concept to the user
// and allowing them to sign in.

import React from 'react';
import { User, Disc, Music } from 'react-feather'

import AlbumArt from "../static/album_art.png"
import WideLogo from "../static/wide_logo.png"

import "../styles/home.css"

const Home = () => 
    <div className="body">
        <div id="full_header">
            <img id="header_art" src={AlbumArt}/>
            <div id="header_text">
                <div id="header_text_container">
                    <img id="header_logo_intro" src={WideLogo}/>
                    <p className="header_title">How well do you <span className="bold italic">really</span> know</p>
                    <p className="header_title">your favorite artist?</p>
                </div>
            </div>
        </div>
        <div id="welcome_body">
            <p className="welcome_title">Welcome to <span className="bold">Spotify Roulette</span>.</p>
            <p className="welcome_description">Shuffle an artist’s discography to test your knowledge of their song titles. Click the button below to log in with Spotify and begin!</p>
            <div id="login_button_container">
                <button className="big-button" onClick={() => {window.location = `${process.env.REACT_APP_SERVER_URL}/auth/login`}}>
                    Get started!
                </button>
            </div>
            <p className="welcome_title">How it works:</p>
            <div className="welcome_step">
                <User size={124} color="#6535EE"/>
                <div className="welcome_step_text">
                    <p className="welcome_step_title">Select an artist or band</p>
                    <p className="welcome_step_description">Get started by choosing an artist or band whose music you know well.</p>
                </div>
            </div>
            <div className="welcome_step">
                <Disc size={124} color="#6535EE"/>
                <div className="welcome_step_text">
                    <p className="welcome_step_title">Choose the albums</p>
                    <p className="welcome_step_description">Pick any number of their albums, EPs, and singles to shuffle.</p>
                </div>
            </div>
            <div className="welcome_step">
                <Music size={124} color="#6535EE"/>
                <div className="welcome_step_text">
                    <p className="welcome_step_title">Test yourself</p>
                    <p className="welcome_step_description">After hearing the beginning of each song, enter the song title into the box provided.</p>
                </div>
            </div>
        </div>
    </div>

export default Home;