import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import YouMayAlsoLike from './YouMayAlsoLike';
import PastOrder from './PastOrder';
import { compose } from '@reduxjs/toolkit';
import { placeorder } from '../action/action';
import { useSelector } from 'react-redux';
import { tables } from '../../../../Pages/HomePage/Tablejson/Tablejson';

function CartItem() {
    const navigate = useNavigate();
    const { table } = useSelector((state) => state?.table);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
            calculateTotalPrice(storedCartItems);
        }
    }, []);

    useEffect(() => {
        calculateTotalPrice(cartItems);
    }, [cartItems]);

    // const updateCartItemsInLocalStorage = (updatedCartItems) => {
    //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    //     setCartItems(updatedCartItems);
    // };

    // const addquantity = (item) => {
    //     const updatedCartItems = cartItems.map(cartItem => 
    //         cartItem.item_name === item.item_name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    //     );
    //     updateCartItemsInLocalStorage(updatedCartItems);
    // };

    // const removequantity = (item) => {
    //     const updatedCartItems = cartItems.map(cartItem => 
    //         cartItem.item_name === item.item_name ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    //     ).filter(cartItem => cartItem.quantity > 0);
    //     updateCartItemsInLocalStorage(updatedCartItems);
    // };

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price), 0);
        setTotalPrice(total);
    };

        const handleCartItem = async() =>{
            try {
                const header = {
                    table_id: tables[0].table_id,
                    order_id: table?.response?.order_id,
                    items: cartItems,  
                }
                const response = await placeorder(header)
                console.log('Response from server:', response.data);
                if(response.data){
                    navigate('/success')
                    setCartItems()
                    setTotalPrice()
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        }

    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Order summary</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                        {cartItems.map((item,index)=>(
                            <li key={index}>
                                <div className="itemmaindetail">
                                    <span>
                                        <Image src='Images/makhniimg.png'></Image>
                                    </span>
                                    <div className="itemsubdetail">
                                    {/* <Image src={item.diet === 'N' ? '/Images/nonveg.svg' : item.diet === 'V' ?  '/Images/veg.svg' : '/Images/egg.svg'} alt="Veg"></Image> */}
                                        <Link to=""><Image src='Images/veg.svg'></Image>{item.item_name}</Link>
                                        <span>₹{item.price}</span>
                                    </div>
                                </div>
                                <div className="itemaddremove">
                                    <div className="addremove">
                                        {/* <Link to="#" onClick={() => removequantity(item)}>-</Link> */}
                                        <span>{item.qty}</span>
                                        {/* <Link to="#" onClick={() => addquantity(item)}>+</Link> */}
                                    </div>
                                    {/* <p>₹{item.price * item.quantity}</p> */}
                                    <p>₹{item.price}</p>
                                </div>
                            </li>
                        ))}
                           
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
            {/* <YouMayAlsoLike /> */}
            <PastOrder />
            <Link className='btn-green placeorder' onClick={handleCartItem}>Place order - <span> ₹{totalPrice.toFixed(2)}</span></Link>
        </>
    );
}

export default CartItem;
