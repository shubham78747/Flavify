import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './CartItem.css';
import { Button, Image, Modal } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { Icon } from '@iconify/react/dist/iconify.js';




function CartItemSlider() {

    const options = {
        margin: 14,
        responsiveClass: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 1.5,

    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClick = () => {
        document.body.classList.add('show'); // Add the 'show' class to the body
    };
    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    // Event handler to close the modal

    const [isFilled, setIsFilled] = useState(false);

    // Event handler to toggle the filled state
    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };


    // State to manage selected options
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Base price for the variant (this could be dynamic based on actual data)
    const basePrice = 450;

    // Option prices (you could use different prices for different options)
    const optionPrices = {
        selectoption: 450,
        selectoption1: 450,
        selectoption2: 450,
        selectoption3: 450,
    };

    // Handler to increase the count
    const handleAddClick = () => {
        setCount(count + 1);
    };

    // Handler to decrease the count
    const handleRemoveClick = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    // Handler to toggle checkbox selection
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setSelectedOptions([...selectedOptions, id]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== id));
        }
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        const selectedOptionPrices = selectedOptions.reduce((total, option) => total + optionPrices[option], 0);
        return (basePrice + selectedOptionPrices) * count;
    };
    const [count, setCount] = useState(1);
    return (
        <div className="Combomain">
            <OwlCarousel className="owl-theme mb-3" {...options}>
                <div className="item">
                    <div className="combodetail">
                        <ul className='saladimgs gap-1 mb-0'>
                            <li><Image src='Images/manchurianimg.png'></Image></li>

                        </ul>
                        <div className="combosubdetail">

                            <h3>Manchurian gravy</h3>
                            <div className="comboprice d-flex">
                                <p>₹920 </p>
                                <Link onClick={handleShow}>+ Add</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="combodetail">
                        <ul className='saladimgs gap-1 mb-0'>
                            <li><Image src='Images/manchurianimg.png'></Image></li>
                        </ul>
                        <div className="combosubdetail">

                            <h3>Manchurian gravy</h3>
                            <div className="comboprice d-flex">
                                <p>₹920 </p>
                                <Link onClick={handleShow}>+ Add</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </OwlCarousel>
            <OwlCarousel className="owl-theme mb-3" {...options}>
                <div className="item">
                    <div className="combodetail">
                        <ul className='saladimgs gap-1 mb-0'>
                            <li><Image src='Images/manchurianimg.png'></Image></li>

                        </ul>
                        <div className="combosubdetail">

                            <h3>Manchurian gravy</h3>
                            <div className="comboprice d-flex">
                                <p>₹920 </p>
                                <Link onClick={handleShow}>+ Add</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="combodetail">
                        <ul className='saladimgs gap-1 mb-0'>
                            <li><Image src='Images/manchurianimg.png'></Image></li>
                        </ul>
                        <div className="combosubdetail">

                            <h3>Manchurian gravy</h3>
                            <div className="comboprice d-flex">
                                <p>₹920 </p>
                                <Link onClick={handleShow}>+ Add</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </OwlCarousel>

            {/* <Modal show={show} onHide={handleClose} className="singleitem combomodal">
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className="guestselectmodalmain pt-0">

                        <ul className='saladimgs'>
                            <li><Image src='Images/saladimg1.png'></Image></li>
                            <li><Image src='Images/saladimg2.png'></Image></li>
                        </ul>
                        <div className="ratingmain">
                            <ul className='rating'>
                                <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                            </ul>
                            <span><Image src='Images/veg.svg'></Image></span>
                        </div>
                        <div className="itemtitle">
                            <h3>Lebanese Fateh Salad + Pesto pasta <span onClick={handleIconClick} style={{ cursor: 'pointer' }}>{isFilled ? (
                                <Icon icon="ph:heart-fill" width="24px" height="24px" style={{ color: 'red' }} />
                            ) : (
                                <Icon icon="ph:heart" width="24px" height="24px" style={{ color: 'black' }} />
                            )}</span></h3>
                            <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a creamy yogurt-tahini sauce. It's topped with pine nuts, fresh herbs like parsley and mint, and often drizzled with olive oil.</p>

                        </div>
                        <div className="select-variant-container">
                            <div className="selectvariant">
                                <div className="selectvarianttitle">
                                    <h3>Select variants</h3>
                                    <p>Any one option</p>
                                </div>
                                <ul className='selectvariantmain'>
                                    <li>
                                        <h5>Variant 1</h5>
                                        <label className="custom-radio">
                                            <span className="radio-label">₹{basePrice}</span>
                                            <input
                                                type="radio"
                                                name="variant"
                                                defaultChecked // Set default checked for the first option (if needed)
                                            />
                                            <span className="radio-indicator"></span>
                                        </label>
                                    </li>

                                </ul>
                            </div>

                            <div className="selectvariant">
                                <div className="selectvarianttitle">
                                    <h3>Select add-on’s</h3>
                                </div>
                                <ul className='selectvariantmain'>
                                    <li>
                                        <h5>Option 1</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption'>
                                            <span className="checkbox-label">₹{optionPrices.selectoption}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption'
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkbox-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Option 2</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption1'>
                                            <span className="checkbox-label">₹{optionPrices.selectoption1}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption1'
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkbox-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Option 3</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption2'>
                                            <span className="checkbox-label">₹{optionPrices.selectoption2}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption2'
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkbox-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Option 4</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption3'>
                                            <span className="checkbox-label">₹{optionPrices.selectoption3}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption3'
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkbox-indicator"></span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className="additem">
                                <div className="addremoveitem" style={{ display: 'flex', alignItems: 'center' }}>
                                    <span onClick={handleRemoveClick} style={{ cursor: 'pointer' }}>
                                        <Icon icon="ri:subtract-fill" width="24px" height="24px" />
                                    </span>
                                    <h5 style={{ margin: '0 10px' }}>{count}</h5>
                                    <span onClick={handleAddClick} style={{ cursor: 'pointer' }}>
                                        <Icon icon="ic:round-plus" width="24px" height="24px" />
                                    </span>
                                </div>
                                <Link className='btngreen continue' >
                                    Add Item - ₹{calculateTotalPrice().toFixed(2)}
                                </Link>

                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal> */}

        </div>
    );
}

export default CartItemSlider;
