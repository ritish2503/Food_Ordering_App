import React from 'react';
import Logo from '../resources/logo.png';
import {Link} from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {

    const onlineStatus = useOnlineStatus();

    return (
        <div className="flex items-center justify-between shadow-xl h-20 text-white bg-black">
            <div className="logo-container">
                <img className="w-56 p-3 m-2" src={Logo} alt="" />
            </div>
            <div className="">
                <ul className='flex p-3 m-4'>
                    <li className='px-4'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='px-4'>
                        <Link to='/about' className=''>About Us</Link>
                    </li>
                    <li className='px-4'>
                        <Link to='/contact'>Contact Us</Link>
                    </li>
                    <li className='px-4'>
                        <Link to='/grocery'>Grocery</Link>
                    </li>
                    <li className='px-4'>
                        <Link to='/cart'>Cart</Link>
                    </li>
                    <li className='px-4'>
                        Online Status: {onlineStatus ? '🟢' : '🔴'}
                    </li>
                    <li className='px-4'>
                        <button>Login</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;