import React from 'react';
import { Link } from 'react-router-dom';

import './CartItem.css';
import { Accordion, Image } from 'react-bootstrap';
import CartItemSlider from './CartItemSlider';



function YouMayAlsoLike() {
    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>You may also like</Accordion.Header>
                    <Accordion.Body>
                        <CartItemSlider />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </>
    );
}

export default YouMayAlsoLike;
