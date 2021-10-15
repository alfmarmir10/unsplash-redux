import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeLoved, setLoved } from '../../../actions/user.actions';
import '../../../styles/Home/HomePhotoContainer.css';
import  '../../../styles/Details/DetailsRenderer.css';
import Share from '../../../assets/img/share.png';
import Info from '../../../assets/img/info.png';
import Heart from '../../../assets/img/heart_gray.png';
import Plus from '../../../assets/img/plus_gray.png';
import Arrow from '../../../assets/img/down_arrow_gray.png';
import { useHistory } from 'react-router';
import { fetchPhotoStatistics } from '../../../actions/content.actions';

const DetailsRenderer = (props) => {
    const history = useHistory();
    const {obj} = props;
    const {loved} = useSelector(state => state.user)
    const {viewingPhotoStatistics} = useSelector(state => state.content);
    const dispatch = useDispatch();
    const [OpenedSubmenu, setOpenedSubmenu] = useState(false);
    const [ObjToDownload, setObjToDownload] = useState();
    const [ObjStats, setObjStats] = useState();

    const lovedClass = (obj!==null && loved.ids.includes(obj.id)) ? "add-favorite-icon-container active" : "add-favorite-icon-container";

    console.log(obj);

    function thousands_separators(num)
    {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }

    useEffect(()=>{
        if(obj!==null){
            if(viewingPhotoStatistics!==null){
                if(viewingPhotoStatistics.id === obj.id){
                    setObjStats(viewingPhotoStatistics);
                } else {
                    dispatch(fetchPhotoStatistics(obj.id));
                }
            } else {
                dispatch(fetchPhotoStatistics(obj.id));
            }
        }
        console.log("Stats: "+JSON.stringify(viewingPhotoStatistics));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewingPhotoStatistics])

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
        <div className="details-renderer-main-container">
            {
                obj ? (
                    <>
                    <div className="author-main-container">
                        <img src={obj.user.profile_image.medium} alt={`${obj.user.name} img`} className="author-image" />
                        <div className="author-name-wrapper">
                            <p className="aurthor-name">{obj.user.name}</p>
                            <p className="author-social">{(obj.user.instagram_username) ? `@${obj.user.instagram_username}` : `@${obj.user.instagram_username}`}</p>
                        </div>
                    </div>
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
                    <img src={obj.urls.regular} alt={obj.alt_description} className="home-photo" />
                    <div className="photo-info-main-container">
                    {
                        viewingPhotoStatistics ? (
                            <>
                            <div className="info-section">
                                <div className="section-left-side">
                                    <div className="stats-item-container">
                                        <p className="stats-item-title">Views</p>
                                        <p className="stats-item-subtitle">{thousands_separators(viewingPhotoStatistics.views.total)}</p>
                                    </div>
                                </div>
                                <div className="section-right-side">
                                    <div className="share-icon-container">
                                        <img src={Share} alt="Share Icon" className="share-icon-gray" />
                                    </div>
                                    <div className="info-icon-container">
                                        <img src={Info} alt="Info Icon" className="info-icon-gray" />
                                    </div>
                                </div>
                            </div>
                            <div className="info-section">
                                <div className="section-full-width">
                                    <div className="stats-item-container">
                                        <p className="stats-item-title">Downloads</p>
                                        <p className="stats-item-subtitle">{thousands_separators(viewingPhotoStatistics.downloads.total)}</p>
                                    </div>
                                </div>
                            </div>
                            </>
                        ) : (
                            <p>No Stats!</p>
                        )
                    }
                    </div>
                    </>
                ) : (
                    history.push("/home")
                )
            }
        </div>
    )
}

export default DetailsRenderer
