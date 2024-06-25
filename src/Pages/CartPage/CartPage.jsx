import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './CartPage.css';
import Cart from '../../Component/CommonComponent/Cart/Cart';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeItemFromCart } from '../../Pages/CartPage/Cartslice/Cartslice';



function CartPage() {

    // const cartItems = useSelector((state) => state.cart.items);
    // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    // const totalPrice = useSelector((state) => state.cart.totalPrice);
    // const dispatch = useDispatch();

    // const handleRemoveFromCart = (id) => {
    //     dispatch(removeItemFromCart(id));
    // };

    // List of dummy people for selection (you can replace this with actual data)

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail p-0">
                        <Cart />
                        <MobileBar />
                    </div>
                </div>
            </section>
        </>
    );
}

export default CartPage;
