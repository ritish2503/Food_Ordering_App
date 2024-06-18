import React, { useContext, useState } from 'react';
import Logo from '../resources/logo.png';
import {Link} from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';

const Header = () => {

    const [loginButton, setLoginButton] = useState(false);
    const onlineStatus = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext);

    //Using useSelector hook to subscribe redux appStore.js
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

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
                    <li className='px-4 font-bold'>
                        <Link to='/cart'>Cart ({cartItems.length})</Link>
                    </li>
                    <li className='px-4'>
                        Online Status: {onlineStatus ? '🟢' : '🔴'}
                    </li>
                    {loginButton && 
                        <li className='px-4 font-bold'>
                            {loggedInUser}
                        </li>
                    }
                    <li className='px-4'>
                        <button onClick={() => setLoginButton(!loginButton)}>{loginButton ? 'Logout' : 'Login'}</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;