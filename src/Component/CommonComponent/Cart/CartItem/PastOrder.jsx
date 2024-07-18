import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function PastOrder({pastOrdersList}) {
    const [orders, setOrders] = useState([]);
    // const {pastOrdersList} = useSelector(state => state.cart)

    console.log({ pastOrdersList })
    
    useEffect(() => {
        setOrders(pastOrdersList)
      }, [pastOrdersList]);
    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen className='mb-5'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Past Order</Accordion.Header>
                    <Accordion.Body>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            {orders.map((order, index) => (
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Order {order?.sub_order_id}</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                     {order?.items?.map((item,index)=> item.combo === 'None' || item.combo === 'Checkout' ? (
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
                                        ) : (
                                            <li className='comboBox' >
                                                <ul>
                                                    {item.items.map((i, ix) => (
                                                        <li key={ix}>                                  
                                                            <div className="itemmaindetail">
                                                                <span>
                                                                    <Image src='Images/makhniimg.png'></Image>
                                                                </span>
                                                                <div className="itemsubdetail">
                                                                    <Link to=""><Image src='Images/veg.svg'></Image>{i?.item_name}</Link>
                                                                    <span>₹{i.price}</span>
                                                                </div>
                                                            </div>
                                                        </li>   
                                                    ))}
                                                </ul>
                                                {/* <div className="itemaddremove">
                                                    <div className="addremove">
                                                        <Link to="#" onClick={() => removequantity(index)}>-</Link>
                                                        <span>{item.qty}</span>
                                                        <Link to="#" onClick={() => addquantity(index)}>+</Link>
                                                    </div>
                                                    <p>₹{item.price * item.qty}</p>
                                                    <p>{calculateItemPrice(item, 'combo')}</p>
                                                    <p>₹{item.price}</p>
                                                </div> */}
                                            </li>
                                        ))}
                                       
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
                            ))}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
        </Accordion>
            {/* <Link className='btn-green order' onClick={handleplaceorder}>order</Link> */}
        </>
    );
}

export default PastOrder;
