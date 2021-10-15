import React from 'react'
import { useSelector } from 'react-redux'
import DetailsRenderer from '../components/Custom/Details/DetailsRenderer';
import Navbar from '../components/Custom/Navbar';
import TopBar from '../components/Custom/TopBar';

const Details = () => {
    const obj = useSelector(state => state.content.viewingPhoto);
    console.log(obj);

    return (
        <div>
            <TopBar />
            <Navbar />
            <DetailsRenderer obj={obj}/>            
        </div>
    )
}

export default Details
