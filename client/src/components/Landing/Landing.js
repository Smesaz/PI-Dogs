import React from "react";
import './Landing.css';
import { NavLink } from "react-router-dom";
const Landing=()=>{
    return (
        <div className='body_landing'>
            <div className='container_landing'>
                <h1>Welcome to Dog Breeds App</h1>
                <NavLink to='/home'>OPEN</NavLink>
            </div>
        </div>
    )
}
export default Landing;