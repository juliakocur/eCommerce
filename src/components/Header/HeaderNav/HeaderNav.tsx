import './HeaderNav.scss';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const HeaderNav = () => {
const [open, setOpen] = useState(false);
    return (
        <div className="headerNav">
            <div className={`dropdown ${open? 'active' : ''}`} onClick={()=>{setOpen(!open)}}>
                <div className="dropbtn">Collection<span className="dropArrow"></span></div> 
                <div className="dropdownContent">
                        <a href="#" className={`dropLink ${open? 'open' : ''}`}>Men</a>
                        <a href="#" className={`dropLink ${open? 'open' : ''}`}>Women</a>
                </div>
            </div>
            <Link to="/about-us" className="link">About us</Link>
            <Link to="/login" className="link">Login</Link>
            <Link to="/registration" className="link">Registration</Link>
        </div>
    );
};

export default HeaderNav;