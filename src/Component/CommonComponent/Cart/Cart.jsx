import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Cart.css';
import TableHeaderTitle from './CartHeader/CartHeader';
import CartItem from './CartItem/CartItem';



function Cart() {
    const navigate = useNavigate();
    // useEffect(() => {
    //     const isRegistered = localStorage.getItem('isRegistered');
    //     if (isRegistered !== 'true') {
    //         navigate('/signUp');
    //     }
    //   }, [navigate]);
    
    //   const cart = JSON.parse(localStorage.getItem('cart')) || [];

    return (
        <>
            <TableHeaderTitle profileimg="Images/profile.svg" className="d-flex" />
            <CartItem />
        </>
    );
}

export default Cart;
