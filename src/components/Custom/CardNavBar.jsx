import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchHomePhotos, setActiveTopic } from '../../actions/content.actions';
import '../../styles/Custom/CardNavBar.css';
import '../../styles/styles_base.css';

const CardNavBar = (props) => {
    const {setActive, title, slug} = props;
    let activeLocal = useSelector(state=>state.content.activeTopic);
    console.log(activeLocal);

    if(!activeLocal || activeLocal === ""){activeLocal="Editorial"}

    const dispatch = useDispatch();
    const history = useHistory();

    const dynamicClass = (activeLocal === title) ? "card-navbar-main-container active" : "card-navbar-main-container";

    function handleClick(){
        if(title!=="Editorial"){
            setActive(title);
            dispatch(setActiveTopic(title));
            dispatch(fetchHomePhotos(slug));
        } else {
            setActive("Editorial");
            dispatch(setActiveTopic("Editorial"));
            dispatch(fetchHomePhotos("Home"));
        }
        history.push('/home');
    }

    return (
        <div className={dynamicClass} onClick={handleClick}>
            <p className="card-text">{title}</p>
        </div>
    )
}

export default CardNavBar
