import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './CartPage.css';
import Cart from '../../Component/CommonComponent/Cart/Cart';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';



function CartPage() {

    // List of dummy people for selection (you can replace this with actual data)

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        <Cart />
                        <MobileBar />
                    </div>
                </div >
            </section>
        </>
    );
}

export default CartPage;
