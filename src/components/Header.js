import React from 'react';
import Logo from '../resources/logo.png';

const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={Logo} alt="" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;