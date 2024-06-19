import React from 'react';
import { Link } from 'react-router-dom';

import './Cart.css';
import TableHeaderTitle from './CartHeader/CartHeader';
import CartItem from './CartItem/CartItem';



function Cart() {
    return (
        <>
            <TableHeaderTitle profileimg="Images/profile.svg" className="d-flex" />
            <CartItem />
        </>
    );
}

export default Cart;
