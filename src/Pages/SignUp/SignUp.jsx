import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import { Button, Form, Image } from 'react-bootstrap';
import { userInfo } from './action/action';
import { useSelector } from 'react-redux';

function SignUp() {
    const { table } = useSelector((state) => state?.table);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDOB] = useState('');

    console.log('pavan', table);

    const formatDate = (date) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const [year, month, day] = date.split("-");
        return `${day}-${months[parseInt(month, 10) - 1]}-${year}`;
    };

    const handleregisterform = async (e) => {
        e.preventDefault();
        const formattedDOB = formatDate(dob);
        const header = {
            name: name,
            phone: phone,
            dob: formattedDOB,
            order_id: table?.response?.order_id,
        };
        console.log('Header:', header); 
        try {
            const res = await userInfo(header);
            if (res.data) {
                localStorage.setItem('isRegistered', 'true');
                navigate('/cart');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

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
                            <Form onSubmit={handleregisterform}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Whatsapp Number</Form.Label>
                                    <div className="mobile">
                                        <span>+91</span>
                                        <Form.Control type="text" placeholder="(000) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>DOB</Form.Label>
                                    <Form.Control type="date" value={dob} onChange={(e) => setDOB(e.target.value)} required />
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
