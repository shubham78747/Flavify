import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './SignUp.css';
import TableHeaderTitle from '../../Component/HomePageComponent/TableTitle/TableHeaderTitle';
import QuickBites from '../../Component/HomePageComponent/QuickBites/QuickBites';
import OfferBanner from '../../Component/HomePageComponent/OfferBanner/OfferBanner';
import Combos from '../../Component/HomePageComponent/Combos/Combos';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import MobileBar from '../../Component/CommonComponent/MobileBar/MobileBar';



function SignUp() {

    return (
        <>
            <section className='signupmain'>
                <div className="container">
                    <div className="tabledetail p-0">
                        <div className="bggreen">
                            <i><Image src='Images/foodimg.png'></Image></i>
                            <span><Image src='Images/signupicon.svg'></Image></span>
                            <h3>Where Turkish <br /> Delights Meet <br /> Mediterranean Nights</h3>
                        </div>
                        <div className="signupform">
                            <h4>Sign up</h4>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Whatsapp Number</Form.Label>
                                    <div className="mobile">
                                        <span>+91</span>
                                        <Form.Control type="text" placeholder="(000) 000-0000" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>DOB</Form.Label>
                                    <Form.Control type="date" />

                                </Form.Group>
                                <Button variant="primary" type="submit" className='btn-green'>
                                    Finish your order
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}

export default SignUp;
