import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import PastOrder from './PastOrder';
import { placeorder,Updateplaceorder } from '../action/action';
import { useSelector } from 'react-redux';
import { tables } from '../../../../Pages/HomePage/Tablejson/Tablejson';
import { toast } from 'react-toastify';
import Modals from '../../Modal/Modal';

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

    const updateCartItemsInLocalStorage = (updatedCartItems) => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    };

    const addquantity = (item) => {
        const updatedCartItems = cartItems.map(cartItem => 
            cartItem.item_name === item.item_name ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
        updateCartItemsInLocalStorage(updatedCartItems);
    };

    const removequantity = (item) => {
        const updatedCartItems = cartItems.map(cartItem => 
            cartItem.item_name === item.item_name ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
        ).filter(cartItem => cartItem.qty > 0);
        updateCartItemsInLocalStorage(updatedCartItems);
    };

    const calculateTotalPrice = (items) => {
        const total = items && items?.reduce((acc, item) => acc + (item.price*item.qty), 0);
        setTotalPrice(total);
    };
            const handleCartItem = async() =>{
                if(cartItems && cartItems.length > 0){
                    try {
                        const checkOrder = JSON.parse(localStorage.getItem('custorder'));
                        const header = {
                            table_id: tables[0].table_id,
                            order_id: table?.response?.order_id,
                            items: cartItems,  
                        }
                        if(checkOrder?.order){
                            const response = await Updateplaceorder(header)
                            console.log(response.data)
                            if(response?.data){
                                navigate('/success')
                                setCartItems()
                                setTotalPrice()
                            }
                        }else{
                            const response = await placeorder(header)
                            if(response?.data){
                                navigate('/success')
                                setCartItems()
                                setTotalPrice()
                                localStorage.setItem('custorder',JSON.stringify({order:true}))
                            }
                        }                
                    } catch (error) {
                        console.error('Error sending data:', error);
                    }
                }else{
                    toast("Please add Item")
                }
        }

        const handleplaceorder = async() =>{
            try {
                const header = {
                    table_id: tables[0].table_id,
                    order_id: table?.response?.order_id,
                    items: cartItems,  
                }
                localStorage.setItem('placeorder',JSON.stringify(header))
                setCartItems([])
                localStorage.removeItem('cartItems');
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
                        {cartItems?.length > 0 && cartItems?.map((item,index)=>(
                            <li key={index}>
                                <div className="itemmaindetail">
                                    <span>
                                        <Image src='Images/makhniimg.png'></Image>
                                    </span>
                                    <div className="itemsubdetail">
                                        <Link to=""><Image src='Images/veg.svg'></Image>{item?.item_name}</Link>
                                        <span>₹{item.price}</span>
                                    </div>
                                </div>
                                <div className="itemaddremove">
                                    <div className="addremove">
                                        <Link to="#" onClick={() => removequantity(item)}>-</Link>
                                        <span>{item.qty}</span>
                                        <Link to="#" onClick={() => addquantity(item)}>+</Link>
                                    </div>
                                    <p>₹{item.price * item.qty}</p>
                                    {/* <p>₹{item.price}</p> */}
                                </div>
                            </li>
                        ))}
                           
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <YouMayAlsoLike /> */}
            <PastOrder handleplaceorder={handleplaceorder} />
            <Link className='btn-green placeorder' onClick={handleCartItem}>{!localStorage.getItem('custorder') ? 'Place order' : 'Update Order'} - <span> ₹{totalPrice && totalPrice?.toFixed(2)}</span></Link>
        </>
    );
}

export default CartItem;
