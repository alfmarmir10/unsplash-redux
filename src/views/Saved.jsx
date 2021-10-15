import React from 'react'
import Navbar from '../components/Custom/Navbar'
import TopBar from '../components/Custom/TopBar'
import SavedImageRenderer from '../components/Saved/SavedImageRenderer'

const Saved = () => {
    return (
        <div>
            <TopBar />
            <Navbar />
            <SavedImageRenderer />
        </div>
    )
}

export default Saved
