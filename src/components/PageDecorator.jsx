// PageDecorator.jsx
// A wrapper component that adds the header, footer, and
// a div around the content of a page

import React from "react"

import Header from './Header'
import Footer from './Footer'

const Page = ({ children }) => 
    <>
        <Header/>
            <div id="body_div">
                {children}
            </div>
        <Footer/>
    </>

export default Page