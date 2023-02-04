// Header.jsx
// A header displaying the application's logo, allowing the user
// to restart

import React from "react"
import WideLogo from "../static/wide_logo.png"
import "../styles/header.css"

const Header = ({setSelectedAlbums, setSelectedArtist}) => 
    <div id="header_div" onClick={() => {
        window.location = "/"
        setSelectedArtist(undefined)
        setSelectedAlbums([])
    }}>
        <img id="header_logo" src={WideLogo}/>
    </div>

export default Header