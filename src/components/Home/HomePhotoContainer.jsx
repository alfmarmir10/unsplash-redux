/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import '../../styles/Home/HomePhotoContainer.css';
import Heart from '../../assets/img/heart_gray.png';
import Plus from '../../assets/img/plus_gray.png';
import Arrow from '../../assets/img/down_arrow_gray.png';
import { useDispatch, useSelector } from 'react-redux';
import { removeLoved, setLoved } from '../../actions/user.actions';
import { setViewingPhoto } from '../../actions/content.actions';
import { useHistory } from 'react-router';

const HomePhotoContainer = (props) => {
    const history = useHistory();
    const {loved} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [OpenedSubmenu, setOpenedSubmenu] = useState(false);
    const [ObjToDownload, setObjToDownload] = useState();
    const {obj} = props;

    const lovedClass = (obj!==null && loved.ids.includes(obj.id)) ? "add-favorite-icon-container active" : "add-favorite-icon-container";

    const handleClick = () => {
        dispatch(setViewingPhoto(obj));
        history.push('/Details');
    }

    const toogleSubmenu = () => {
        setOpenedSubmenu(!OpenedSubmenu);
    }

    const toogleLoved = () => {
        if(loved.ids.includes(obj.id)){
            console.log("Includes");
            dispatch(removeLoved({id:obj.id}));
        } else {
            console.log("Not Includes");
            dispatch(setLoved({id:obj.id, obj:obj}));
        }
    }

    useEffect(() => {
        if(ObjToDownload){
            function handleDownload(url, filename){
                fetch(`${url}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/jpeg',
                    },  
                    responseType: 'Blob'
                })
                .then((response) => response.blob())
                .then((blob) => {
                    // Create blob link to download
                    const url = window.URL.createObjectURL(
                    new Blob([blob]),
                    );
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                    'download',
                    `${filename}.jpg`,
                    );
        
                    // Append to html link element page
                    document.body.appendChild(link);
        
                    // Start download
                    link.click();
        
                    // Clean up and remove the link
                    link.parentNode.removeChild(link);
                    setObjToDownload();
                });
            }
            handleDownload(ObjToDownload.url, ObjToDownload.name);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ObjToDownload])

    const submenuClass = (OpenedSubmenu) ? "submenu-main-container opened" : "submenu-main-container";


    return (
        <div className="home-photo-main-container" onClick={handleClick}>
            {
                obj ? (
                    <>
                        <div className="user-main-container">
                            <img src={obj.user.profile_image.medium} alt={obj.user.name} className="user-img"/>
                            <p className="user-name">{obj.user.name}</p>
                        </div>
                        <img src={obj.urls.small} alt={obj.alt_description}  className="home-photo"/>
                        <div className="photo-actions-main-container">
                            <div className="photo-action-first-section">
                                <div className={lovedClass} onClick={toogleLoved}>
                                    <img src={Heart} alt="Heart Icon" className="heart-icon-gray" />
                                </div>
                                <div className="add-to-collection-icon-container">
                                    <img src={Plus} alt="Heart Icon" className="plus-icon-gray" />
                                </div>
                            </div>
                            <div className="photo-action-second-section">
                                <div className="download-button-main-container">
                                    <div className="download-button-default" onClick={()=>setObjToDownload({url:obj.urls.regular, name:`${obj.id}.jpg`})}>
                                        <p className="download-text">Download</p>
                                    </div>
                                    <div className="download-button-submenu" onClick={toogleSubmenu}>
                                        <img src={Arrow} alt="Arrow down" className="arrow-down-icon" />
                                        <div className={submenuClass}>
                                            <div className="submenu-first-section">
                                                <div className="submenu-section-item" onClick={()=>setObjToDownload({url:obj.urls.small, name:`${obj.id}.jpg`})}>
                                                    <p className="section-item-text">Small</p><span><p className="section-item-subtext">(400x959)</p></span>
                                                </div>
                                                <div className="submenu-section-item" onClick={()=>setObjToDownload({url:obj.urls.regular, name:`${obj.id}.jpg`})}>
                                                    <p className="section-item-text">Medium</p><span><p className="section-item-subtext">(1920x2879)</p></span>
                                                </div>
                                                <div className="submenu-section-item" onClick={()=>setObjToDownload({url:obj.urls.full, name:`${obj.id}.jpg`})}>
                                                    <p className="section-item-text">Large</p><span><p className="section-item-subtext">(2400x3599)</p></span>
                                                </div>
                                            </div>
                                            <div className="submenu-second-section">
                                                <div className="submenu-section-item" onClick={()=>setObjToDownload({url:obj.urls.raw, name:`${obj.id}.jpg`})}>
                                                    <p className="section-item-text">Original Size</p><span><p className="section-item-subtext">(3903x5854)</p></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default HomePhotoContainer
