/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import '../../styles/Home/HomePhotoContainer.css';
import Heart from '../../assets/img/heart_gray.png';
import Plus from '../../assets/img/plus_gray.png';
import Arrow from '../../assets/img/down_arrow_gray.png';
import ClientID from '../../credentials';


const HomePhotoContainer = (props) => {
    const {obj} = props;

    const handleDownloadImg = async (url) => {
        // const response = await fetch(`${url}?client_id=${ClientID}`);
        // console.log(response);
        console.log(url)
    } 


    return (
        <div className="home-photo-main-container" key={obj.id}>
            <div className="user-main-container">
                <img src={obj.user.profile_image.medium} alt={obj.user.name} className="user-img"/>
                <p className="user-name">{obj.user.name}</p>
            </div>
            <img src={obj.urls.small} alt={obj.alt_description}  className="home-photo"/>
            <div className="photo-actions-main-container">
                <div className="photo-action-first-section">
                    <div className="add-favorite-icon-container">
                        <img src={Heart} alt="Heart Icon" className="heart-icon-gray" />
                    </div>
                    <div className="add-to-collection-icon-container">
                        <img src={Plus} alt="Heart Icon" className="plus-icon-gray" />
                    </div>
                </div>
                <div className="photo-action-second-section">
                    <div className="download-button-main-container">
                        <div className="download-button-default" onClick={ async () =>{
                            const response = await fetch(`https://api.unsplash.com/photos/${obj.id}/download?client_id=${ClientID}`);
                            console.log(response);
                            // console.log(obj.links.download_location);   
                        }}>
                            <p className="download-text">Download</p>
                            {/* <a href={`${obj.links.download}`} download>Download</a> */}
                        </div>
                        <div className="download-button-submenu">
                            <img src={Arrow} alt="Arrow down" className="arrow-down-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePhotoContainer
