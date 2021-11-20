import React from "react";
import { NavLink } from "react-router-dom";
import './Nav.css';

const Nav = ()=>{
    return(
        <div className='container_Nav'>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/newbreed'>New Breed</NavLink>
            <NavLink to='/about'>About</NavLink>
        </div>
    )
}
export default Nav;
