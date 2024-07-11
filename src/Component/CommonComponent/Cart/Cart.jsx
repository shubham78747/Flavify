import React from 'react';
import './Cart.css';
import TableHeaderTitle from '../../CommonComponent/TableTitle/TableHeaderTitle';
import CartItem from './CartItem/CartItem';



function Cart() {
    return (
        <>
            {/* <TableHeaderTitle profileimg="Images/profile.svg" className="d-flex" /> */}
            <CartItem />
        </>
    );
}

export default Cart;
