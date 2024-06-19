import React from 'react';
import { Link } from 'react-router-dom';

import './CartHeader.css';
import { Image } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';



function CartHeader(props) {
    return (
        <div className={`maintitle ${props.className}`}>
            <Link><Icon icon="ion:chevron-back" /></Link>
            <Link to={props.link}><Image src={props.profileimg}></Image></Link>
        </div>
    );
}

export default CartHeader;
