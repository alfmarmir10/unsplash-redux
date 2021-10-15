import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchTopics, setTopics } from '../../actions/content.actions';
import '../../styles/Custom/Navbar.css';
import CardNavBar from './CardNavBar';

const Navbar = () => {
    const [ActiveTopic, setActiveTopic] = useState();
    const {topics} =  useSelector(state=>state.content);
    const dispatch = useDispatch();

    useEffect(() => {
        if(topics===""){
            if(localStorage.getItem('topics')!==null){
                console.log("localStorage lleno");
                dispatch(setTopics(JSON.parse(localStorage.getItem('topics'))));
            } else {
                console.log("localStorage vacío, fetching");
                dispatch(fetchTopics());
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topics]);

    return (
        <div className="navbar-main-container">
            <CardNavBar setActive={setActiveTopic} title="Editorial" active={ActiveTopic} key='1'/>
            {
                topics && topics.map((item) => {
                    return <CardNavBar setActive={setActiveTopic} title={item.title} active={ActiveTopic} key={item.id} slug={item.slug}/>
                })
            }
        </div>
    )
}

export default Navbar
