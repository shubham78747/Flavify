import React, { useEffect } from 'react';
import { ChannelProvider } from 'ably/react';
import { Link, useNavigate } from 'react-router-dom';

import './Cart.css';
import TableHeaderTitle from './CartHeader/CartHeader';
import CartItem from './CartItem/CartItem';
import { useSelector } from 'react-redux';



function Cart() {
    const navigate = useNavigate();
    const { table } = useSelector((state) => state?.table);
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
            <ChannelProvider channelName='punched_sub_order'>
                <CartItem />
            </ChannelProvider>
        </>
    );
}

export default Cart;
