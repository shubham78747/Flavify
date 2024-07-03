import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MobileBar.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function MobileBar() {
    const location = useLocation()
    const [activeLink, setActiveLink] = useState(location.pathname);
    const { isRegistered  } = useSelector((state) => state.cart);

    useEffect(()=>{
        setActiveLink(location.pathname);
    },[location.pathname])

    // Handler to set the active link
    // const handleSetActive = (path) => {
    //     setActiveLink(path);
    // };

    return (
        <ul className='mobilebar'>
            <li className={activeLink === '/' ? 'active' : ''}>
                <Link to="/" onClick={() => setActiveLink('/')}>
                    <span><Icon icon="majesticons:home" /></span>
                    <p>Home</p>
                </Link>
            </li>
            <li className={activeLink === '/cart' ? 'active' : ''}>
                <Link to={isRegistered ? "/cart" : '/signUp'} onClick={() => setActiveLink('/cart')}>
                {/* <Link to={"/cart"} onClick={() => setActiveLink('/cart')}> */}
                    <span><Icon icon="mdi:cart" /></span>
                    <p>Cart</p>
                </Link>
            </li>
            <li className={activeLink === '/favourite' ? 'active' : ''}>
                <Link to="/favourite" onClick={() => setActiveLink('/favourite')}>
                    <span><Icon icon="mdi:favourite" /></span>
                    <p>Favourite</p>
                </Link>
            </li>
            <li className={activeLink === '/menu' ? 'active' : ''}>
                <Link to="/menu" onClick={() => setActiveLink('/menu')}>
                    <span><Image src='Images/cart.svg' /></span>
                    <p>Menu</p>
                </Link>
            </li>
        </ul>
    );
}

export default MobileBar;
