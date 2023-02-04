// AlbumList.jsx
// Displays a collection of albums as buttons the user can
// select to use in the game.

import React, {useState, useEffect} from "react"
import { PlusCircle } from "react-feather"

const AlbumList = ({title, albums, chosen, setChosen}) => {
    // Adds the albums in toSelect to the list of chosen albums
    const selectAlbums = toSelect => {
        let currentSelected = chosen
        for (const album of toSelect) {
            if (!currentSelected.includes(album)) {
                currentSelected.push(album)
                document.getElementById(`add-button-${album.id}`).classList.add("cancel_icon")
            }
        }

        setChosen(currentSelected.concat([]))
    }

    // Removes the albums in toDeselect from the list of chosen albums
    const deselectAlbums = toDeselect => {
        for (const album of toDeselect) {
            document.getElementById(`add-button-${album.id}`).classList.remove("cancel_icon")
        }

        setChosen(chosen.filter(elem => !toDeselect.includes(elem)))
    }

    // Whether the user has selected all the albums in this collection
    const [allSelected, setAllSelected] = useState(false)

    // Upon selecting or deselecting an album, update the allSelected state
    useEffect(() => {
        if (albums.length === 0) return

        let foundUnselectedAlbum = false
        for (const a of albums) {
            if (!chosen.includes(a)) {
                foundUnselectedAlbum = true
            }
        }
        
        setAllSelected(!foundUnselectedAlbum)
    }, [chosen])

    return (
        <div className="album_box">
            <div className="album_box_header">
                <p className="section_header">{title}</p>
                <p className="small-button" onClick={() => {
                    if (allSelected)
                        deselectAlbums(albums)
                    else
                        selectAlbums(albums)
                }}>{(allSelected ? "Deselect" : "Select")} all</p>
            </div>
            <div className="album_collection">
                {albums.map(a => 
                    <div className={`album_button ${(chosen.includes(a)) ? "selected" : ""}`} key={a.id} onClick={() => {
                        if (chosen.includes(a))
                            deselectAlbums([a])
                        else
                            selectAlbums([a])
                    }}>
                        <p>
                            <PlusCircle size={36} color="#1e1e1e" id={`add-button-${a.id}`} className="plus_icon"/>
                        </p>
                        <img className="album_image" src={a.img}/>
                        <div className="album_info">
                            <p className="album_title">{a.title}</p>
                            <p className="album_year">{a.year}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
        
export default AlbumList