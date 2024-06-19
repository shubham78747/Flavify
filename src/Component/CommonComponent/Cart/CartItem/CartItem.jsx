import React from 'react';
import { Link } from 'react-router-dom';

import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import YouMayAlsoLike from './YouMayAlsoLike';



function CartItem() {
    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Order summary</Accordion.Header>
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
            <YouMayAlsoLike />

            <Link className='btn-green placeorder'>Place order - <span>₹920 .00</span></Link>
        </>
    );
}

export default CartItem;
