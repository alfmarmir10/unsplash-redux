import React from 'react';
import '../../styles/Custom/CardNavBar.css';
import '../../styles/styles_base.css';

const CardNavBar = () => {
    const active = "Editorial";
    const description = "Editorial";

    const dynamicClass = (active === description) ? "card-navbar-main-container active" : "card-navbar-main-container";

    return (
        <div className={dynamicClass}>
            <p className="card-text">Editorial</p>
        </div>
    )
}

export default CardNavBar
