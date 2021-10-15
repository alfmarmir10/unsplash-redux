import React from 'react'
import { useSelector } from 'react-redux'
import HomePhotoContainer from './HomePhotoContainer';
import '../../styles/Home/HomeImageRenderer.css';

const HomeImageRenderer = (props) => {
    const {homePhotos} = useSelector(state => state.content);
    console.log("Renderer "+homePhotos.length);
    return (
        <div className="home-image-renderer-main-container">
            {
                homePhotos.map((element) => {
                    return(<HomePhotoContainer obj={element} key={element.id}/>)
                })
            }
        </div>
    )
}

export default HomeImageRenderer
