import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './QuickBites.css';
import { Image } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Icon } from '@iconify/react/dist/iconify.js';


function QuickBitesSlider() {
    const options = {
        margin: 0,
        responsiveClass: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 3.5,

    };
    const options2 = {

        margin: 0,
        responsiveClass: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 3.5,


    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        <>
            <div className="">
                <p className='titletext'><Icon icon="mdi:clock-outline" width="16px" height="16px" /> Food items ready in 10min. Quick, Fast, Fresh</p>
                <OwlCarousel className="owl-theme mb-3" {...options}>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/healthy.png'></Image></span>
                            <h4>Healthy</h4>
                        </div>

                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/chienese.png'></Image></span>
                            <h4>Chinese</h4>
                        </div>

                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/bhaji.png'></Image></span>
                            <h4>Bhaji’s</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/north.png'></Image></span>
                            <h4>North Indian</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/bhaji.png'></Image></span>
                            <h4>Bhaji’s</h4>
                        </div>
                    </div>

                </OwlCarousel>
                <OwlCarousel className="owl-theme" {...options2}>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/salad.png'></Image></span>
                            <h4>Salads</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/kabab.png'></Image></span>
                            <h4>Kebab’s</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/drinks.png'></Image></span>
                            <h4>Drinks</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/tandoor.png'></Image></span>
                            <h4>Tandoori</h4>
                        </div>
                    </div>
                    <div className="item">
                        <div className="dishname">
                            <span onClick={handleShow}> <Image src='Images/drinks.png'></Image></span>
                            <h4>Drinks</h4>
                        </div>
                    </div>

                </OwlCarousel>
            </div>
            <Modal show={show} onHide={handleClose} className="singleitem">
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className="guestselectmodalmain pt-0">
                        {/* <Link className='closebtn' >
                            <Icon icon="carbon:close-filled" width="36px" height="36px" />
                        </Link> */}
                        <ul className='saladimgs'>
                            <li className='w-100'><Image src='Images/selectedvarient.png'></Image></li>

                        </ul>

                        <div className="itemtitle">
                            <h3>Lebanese Fateh Salad <span onClick={handleIconClick} style={{ cursor: 'pointer' }}>{isFilled ? (
                                <Icon icon="ph:heart-fill" width="24px" height="24px" style={{ color: 'red' }} />
                            ) : (
                                <Icon icon="ph:heart" width="24px" height="24px" style={{ color: 'black' }} />
                            )}</span></h3>
                            <div className="ratingmain">
                                <span><Image src='Images/veg.svg'></Image></span>
                                <ul className='rating'>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                </ul>
                                <p><Image src='Images/fire.svg'></Image> 510 kcal</p>
                            </div>
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
                                        <label className="custom-radio" htmlFor='varient1'>
                                            <span className="radio-label">₹{basePrice}</span>
                                            <input
                                                type="radio"
                                                name="variant"
                                                defaultChecked // Set default checked for the first option (if needed)
                                                id='varient1'
                                            />
                                            <span className="radio-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Variant 1</h5>
                                        <label className="custom-radio" htmlFor='varient2'>
                                            <span className="radio-label">₹{basePrice}</span>
                                            <input
                                                type="radio"
                                                name="variant"
                                                defaultChecked // Set default checked for the first option (if needed)
                                                id='varient2'
                                            />
                                            <span className="radio-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Variant 1</h5>
                                        <label className="custom-radio" htmlFor='varient3'>
                                            <span className="radio-label">₹{basePrice}</span>
                                            <input
                                                type="radio"
                                                name="variant"
                                                defaultChecked // Set default checked for the first option (if needed)
                                                id='varient3'
                                            />
                                            <span className="radio-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Variant 1</h5>
                                        <label className="custom-radio" htmlFor='varient4'>
                                            <span className="radio-label">₹{basePrice}</span>
                                            <input
                                                type="radio"
                                                name="variant"
                                                defaultChecked // Set default checked for the first option (if needed)
                                                id='varient4'
                                            />
                                            <span className="radio-indicator"></span>
                                        </label>
                                    </li>
                                </ul>
                            </div>

                            <div className="selectvariant">
                                <div className="selectvarianttitle">
                                    <h3>Select add-on’s</h3>
                                    <p>Chose as many as you like</p>
                                </div>
                                <ul className='selectvariantmain'>
                                    <li>
                                        <h5>Option 1</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption4'>
                                            <span className="checkbox-label">₹{optionPrices.selectoption}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption4'
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkbox-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Option 2</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption5'>
                                            <span className="checkbox-label">₹{optionPrices.selectoption1}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption5'
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkbox-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Option 3</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption6'>
                                            <span className="checkbox-label">₹{optionPrices.selectoption2}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption6'
                                                onChange={handleCheckboxChange}
                                            />
                                            <span className="checkbox-indicator"></span>
                                        </label>
                                    </li>
                                    <li>
                                        <h5>Option 4</h5>
                                        <label className="custom-checkbox" htmlFor='selectoption7'>
                                            <span className="checkbox-label7">₹{optionPrices.selectoption3}</span>
                                            <input
                                                type="checkbox"
                                                id='selectoption7'
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
                                <Link className='btngreen continue'>
                                    Add Item - ₹{calculateTotalPrice().toFixed(2)}
                                </Link>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}

export default QuickBitesSlider;

