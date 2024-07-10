import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.css';
import TableHeaderTitle from '../../Component/CommonComponent/TableTitle/TableHeaderTitle';
import { Image } from 'react-bootstrap';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';
import Search from '../../Component/CommonComponent/Search/Search';
import { useChannel } from 'ably/react';
import { addItemToCart, setAllPastOrders } from '../CartPage/Cartslice/Cartslice';
import { useDispatch, useSelector } from 'react-redux';



function SuccessPage() {
    const [show, setShow] = useState(false);
    const { cartItemsList, pastOrdersList  } = useSelector((state) => state.cart);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();
    
    // const { channel } = useChannel('punched_sub_order', (message) => {
    //     const response = JSON.parse(message.data)
    //     let pastOrders = []
        
    //     const data = {
    //         is_punched: true,
    //         items: cartItemsList,
    //         sub_order_id: response.sub_order_id
    //     }
    //     pastOrders = [...pastOrdersList, data]
    //     dispatch(setAllPastOrders(pastOrders))
    //     dispatch(addItemToCart([]))
    //     localStorage.setItem('cartItems', JSON.stringify([]))
    // });

    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            handleShow();
        }, 5000); // 5 seconds

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, []);
    const [currentStep, setCurrentStep] = useState(1);

    // List of dummy people for selection (you can replace this with actual data)

    return (
        <>
            <section>
                <div className="container">
                    <div className="tabledetail">
                        {/* <TableHeaderTitle titleicon="/Images/table.svg" title="Table Number : 5" className="d-flex" profileimg="/Images/profile.svg" link="#"></TableHeaderTitle> */}
                        <Search />
                        <MobileBar />
                        <div className="successimg">
                            <ul className='patern'>
                                <li><i></i></li>
                                <li><i></i></li>
                                <li><i></i></li>
                                <li><i></i></li>
                                <li><i></i></li>
                                <li><i></i></li>
                            </ul>
                            <span>
                                <Image src='Images/tick.svg'></Image>
                            </span>
                            <h4>Your order has been placed successfully</h4>
                            <Link to={'/menu'} className='bg-white'>Order more items</Link>
                            <div className="successlinks">
                                <Link to="">View top deals</Link>
                                <Link to="">Check out best sellers</Link>
                                <Link to="">Call the waiter</Link>
                                <Link to={'/cart'}>Order Edit</Link>
                            </div>
                        </div>
                        {/* <div className="cartitem">
                            <Link className='cart'>
                                <Image src='Images/cart.svg'></Image>
                            </Link>
                        </div> */}

                    </div>
                </div>
            </section>


        </>
    );
}

export default SuccessPage;
