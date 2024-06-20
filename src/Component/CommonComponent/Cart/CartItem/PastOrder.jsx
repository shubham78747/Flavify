import React from 'react';
import { Link } from 'react-router-dom';

import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import CartItemSlider from './CartItemSlider';



function PastOrder() {
    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen className='mb-5'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Past Order</Accordion.Header>
                    <Accordion.Body>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Order 1</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        <li>
                                            <div className="itemmaindetail">
                                                <span>
                                                    <Image src='Images/makhniimg.png'></Image>
                                                </span>
                                                <div className="itemsubdetail">
                                                    <Link to=""><Image src='Images/veg.svg'></Image>Dal Makhni</Link>
                                                    <span>₹920</span>
                                                </div>
                                            </div>
                                            <div className="itemaddremove">
                                                <div className="addremove">
                                                    <Link to="#">-</Link>
                                                    <span>1</span>
                                                    <Link to="#">+</Link>
                                                </div>
                                                <p>₹920</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="itemmaindetail">
                                                <span>
                                                    <Image src='Images/makhniimg.png'></Image>
                                                </span>
                                                <div className="itemsubdetail">
                                                    <Link to=""><Image src='Images/veg.svg'></Image>Dal Makhni</Link>
                                                    <span>₹920</span>
                                                </div>
                                            </div>
                                            <div className="itemaddremove">
                                                <div className="addremove">
                                                    <Link to="#">-</Link>
                                                    <span>1</span>
                                                    <Link to="#">+</Link>
                                                </div>
                                                <p>₹920</p>
                                            </div>
                                        </li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Order 1</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        <li>
                                            <div className="itemmaindetail">
                                                <span>
                                                    <Image src='Images/makhniimg.png'></Image>
                                                </span>
                                                <div className="itemsubdetail">
                                                    <Link to=""><Image src='Images/veg.svg'></Image>Dal Makhni</Link>
                                                    <span>₹920</span>
                                                </div>
                                            </div>
                                            <div className="itemaddremove">
                                                <div className="addremove">
                                                    <Link to="#">-</Link>
                                                    <span>1</span>
                                                    <Link to="#">+</Link>
                                                </div>
                                                <p>₹920</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="itemmaindetail">
                                                <span>
                                                    <Image src='Images/makhniimg.png'></Image>
                                                </span>
                                                <div className="itemsubdetail">
                                                    <Link to=""><Image src='Images/veg.svg'></Image>Dal Makhni</Link>
                                                    <span>₹920</span>
                                                </div>
                                            </div>
                                            <div className="itemaddremove">
                                                <div className="addremove">
                                                    <Link to="#">-</Link>
                                                    <span>1</span>
                                                    <Link to="#">+</Link>
                                                </div>
                                                <p>₹920</p>
                                            </div>
                                        </li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </>
    );
}

export default PastOrder;
