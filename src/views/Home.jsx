import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TopBar from '../components/Custom/TopBar';

const Home = () => {
    const history = useHistory();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if(user.uid === ""){
            // history.push("/");
            console.log("HOME USER.EMAIL ''");
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return (
        <div>
            <TopBar />
        </div>
    )
}

export default Home
