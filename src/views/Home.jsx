import React, { useEffect }     from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomePhotos, setHomePhotos } from '../actions/content.actions';
import Navbar from '../components/Custom/Navbar';
import TopBar from '../components/Custom/TopBar';
import HomeImageRenderer from '../components/Home/HomeImageRenderer';
import '../styles/Home/Home.css';

const Home = () => {
    const {homePhotos} = useSelector(state => state.content);
    const dispatch = useDispatch();

    useEffect(() => {
        if(homePhotos===""){
            console.log("Home Photos ''");
            if(localStorage.getItem('homePhotos')!==null && localStorage.getItem('homePhotos').indexOf("errors") <= -1){
                console.log("localStorage lleno");
                dispatch(setHomePhotos(JSON.parse(localStorage.getItem('homePhotos'))));
            } else {
                console.log("localStorage vacío, fetching");
                dispatch(fetchHomePhotos("Home"));
            }
        } else {
         console.log(homePhotos);   
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [homePhotos])

    return (
        <div className="home-main-container">
            <TopBar />
            <Navbar />
            {
                homePhotos!=="" ? (
                    <HomeImageRenderer/>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default Home
