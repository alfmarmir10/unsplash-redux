import React, { useState } from 'react';
import '../../styles/Custom/TopBar.css';
import '../../styles/styles_base.css';
import Logo from '../../assets/img/logo.png';
import Search from '../../assets/img/search.png';
import Menu from '../../assets/img/menu.png';
import Heart from '../../assets/img/heart.png';
import { useDispatch } from 'react-redux';
import { signOutUserFirebase } from '../../actions/user.actions';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import firebaseapp from '../../firebase/firebase.config';
import { useHistory } from 'react-router';
// import { firebase, authInstance } from '../../firebase/firebase.config';

const TopBar = () => {
    const history = useHistory();
    const auth = getAuth(firebaseapp);
    const dispatch = useDispatch();
    const [OpenedMenu, setOpenedMenu] = useState(false);

    const handleSignOut = () => {
        dispatch(signOutUserFirebase());
    }

    const handleSearch = () => {
        console.log("Submit search");
    }

    const toogleTopBarMenu = () => {
        setOpenedMenu(!OpenedMenu);
    }

    onAuthStateChanged(auth, (user)=>{
        if(user){
            // console.log("LOGIN AUTH STATE CHANGED USER: "+ JSON.stringify(user))
        } else {
            // console.log("No user AUTH STATE CHANGED");
            history.push("/");
        }
    })

    const floatingMenuClass = (OpenedMenu) ? "floating-menu-main-container opened" : "floating-menu-main-container"

    return (
        <div className="topbar-main-container flex-row-space-around position-relative">
            <img src={Logo} alt="Logo icon" className="topbar-logo-icon"/>
            <div className="search-bar-main-container flex-row-center">
                <form onSubmit={handleSearch} className="flex-row-center">
                    <button className="search-button"><span><img src={Search} alt="Search icon" className="search-icon" /></span></button>
                    <input type="search-input" className="search-input" placeholder="Search photos"/>
                </form>
            </div>
            <img src={Menu} alt="Menu icon" className="topbar-menu-icon" onClick={toogleTopBarMenu}/>
            <div className={floatingMenuClass}>
                <div className="floating-menu-section divider" onClick={()=>history.push("/Saved")}>
                    <img src={Heart} alt="Heart icon" className="floating-menu-heart-icon" />
                    <p className="font-weight-normal font-size-sm">Saved</p>
                </div>
                <div className="floating-menu-section">
                    <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default TopBar
