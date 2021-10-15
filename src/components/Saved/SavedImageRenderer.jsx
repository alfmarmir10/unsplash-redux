import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import HomePhotoContainer from '../Home/HomePhotoContainer';
import '../../styles/Saved/SavedImageRenderer.css';

const SavedImageRenderer = (props) => {
    const {loved} = useSelector(state => state.user);
    const [objLoved, setObjLoved] = useState();

    useEffect(() => {
        const keys = Object.keys(loved.objs);
        let objArray = [];
        for(let i = 0; i < keys.length; i++){
            objArray.push(loved.objs[keys[i]]);
        }
        setObjLoved(objArray);
    }, [loved])

    return (
        <div className="saved-image-renderer-main-container">
            {
                objLoved ? (
                    loved.ids.length > 0 ? (
                        objLoved.map((element) => {
                            return(<HomePhotoContainer obj={element} key={element.id}/>)
                        })  
                    ) : (
                        <p className="like-some-photos">Like some photos!</p>
                    )
                ) : (
                    <p className="like-some-photos">Like some photos!</p>
                )
            }
        </div>
    )
}

export default SavedImageRenderer
