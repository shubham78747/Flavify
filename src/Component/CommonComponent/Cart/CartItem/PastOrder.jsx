import React from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';

function PastOrder({handleplaceorder}) {
    const item = JSON.parse(localStorage.getItem('placeorder'));
    console.log({ item })
    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen className='mb-5'>
        {item.map((order, index) => (
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Past Order</Accordion.Header>
                    <Accordion.Body>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Order {order?.sub_order_id}</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                     {order?.items?.map((item,index)=>{
                                        return(
                                            <li key={index}>
                                            <div className="itemmaindetail">
                                                <span>
                                                    <Image src='Images/makhniimg.png'></Image>
                                                </span>
                                                <div className="itemsubdetail">
                                                    <Link to=""><Image src='Images/veg.svg'></Image>{item.item_name}</Link>
                                                    {/* <span>₹920</span> */}
                                                </div>
                                            </div>
                                            <div className="itemaddremove">
                                                <div className="addremove">
                                                    {/* <Link to="#">-</Link> */}
                                                    <span>1</span>
                                                    {/* <Link to="#">+</Link> */}
                                                </div>
                                                <p>₹{item.price}</p>
                                            </div>
                                        </li>
                                        )})}
                                       
                                        {/* <li>
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
                                        </li> */}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* <Accordion.Item eventKey="1">
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
                            </Accordion.Item> */}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
        ))}
        </Accordion>
            {/* <Link className='btn-green order' onClick={handleplaceorder}>order</Link> */}
        </>
    );
}

export default PastOrder;
