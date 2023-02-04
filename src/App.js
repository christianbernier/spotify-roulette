// App.js
// Router for different pages

import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import AuthenticateUser from './pages/AuthenticateUser'
import ArtistSelector from './pages/ArtistSelector'
import AlbumSelector from './pages/AlbumSelector'
import Game from './pages/Game'

import Page from './components/PageDecorator'

import './styles/global.css'

const App = () => 
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/authenticate' element={<AuthenticateUser/>} />
            <Route path='/artists' element={<Page><ArtistSelector/></Page>} />
            <Route path='/albums' element={<Page><AlbumSelector/></Page>} />
            <Route path='/play' element={<Page><Game/></Page>} />
        </Routes>
    </Router>
        
export default App;