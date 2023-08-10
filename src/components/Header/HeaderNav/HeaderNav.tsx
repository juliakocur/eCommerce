import './HeaderNav.scss';
import { Link } from 'react-router-dom';

const HeaderNav = () => {
    return (
        <div className="headerNav">
            <div className="dropdown">
                <div className="dropbtn">Collection<span className="dropArrow"></span></div> 
                <div className="dropdownContent">
                        <a href="#" className="dropLink">Men</a>
                        <a href="#" className="dropLink">Women</a>
                </div>
            </div>
            <Link to="/about-us" className="link">About us</Link>
            <Link to="/login" className="link">Login</Link>
            <Link to="/registration" className="link">Registration</Link>
        </div>
    );
};

export default HeaderNav;