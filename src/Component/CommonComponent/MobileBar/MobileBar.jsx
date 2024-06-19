import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './MobileBar.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Image } from 'react-bootstrap';



function MobileBar() {
    const [activeLink, setActiveLink] = useState('/');

    // Handler to set the active link
    const handleSetActive = (path) => {
        setActiveLink(path);
    };

    return (
        <ul className='mobilebar'>
            <li className={activeLink === '/' ? 'active' : ''}>
                <Link to="/" onClick={() => handleSetActive('/')}>
                    <span><Icon icon="majesticons:home" /></span>
                    <p>Home</p>
                </Link>
            </li>
            <li className={activeLink === '/cart' ? 'active' : ''}>
                <Link to="/cart" onClick={() => handleSetActive('/cart')}>
                    <span><Icon icon="mdi:cart" /></span>
                    <p>Cart</p>
                </Link>
            </li>
            <li className={activeLink === '/favourite' ? 'active' : ''}>
                <Link to="/favourite" onClick={() => handleSetActive('/favourite')}>
                    <span><Icon icon="mdi:favourite" /></span>
                    <p>Favourite</p>
                </Link>
            </li>
            <li className={activeLink === '/menu' ? 'active' : ''}>
                <Link to="/menu" onClick={() => handleSetActive('/menu')}>
                    <span><Image src='Images/cart.svg' /></span>
                    <p>Menu</p>
                </Link>
            </li>
        </ul>
    );
}

export default MobileBar;
