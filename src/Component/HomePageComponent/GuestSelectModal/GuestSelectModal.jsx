import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './GuestSelectModal.css';
import { Image } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';



function GuestSelectModal() {
    const handleCloseClick = () => {
        document.body.classList.remove('show'); // Remove the 'show' class from the body
    };
    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Event handler to show the modal
    const handleContinueClick = () => {
        setIsModalVisible(true);
        document.body.classList.add('show'); // Optionally add a class to body when modal is shown
    };

    return (
        <></>
        // <div className="guestselectmodalmain">
        //     <Link className='closebtn' onClick={handleCloseClick}><Icon icon="carbon:close-filled" width="36px" height="36px" /></Link>
        //     <h3>Number of guests for dining?</h3>
        //     <span className='selectedguest'>1</span>
        //     <ul className='selectcategories'>
        //         <li className={activeCategory === 'veg' ? 'active' : ''}>
        //             <Link to="#" onClick={() => handleCategoryClick('veg')}>
        //                 <span><Image src='Images/veg.svg' alt="Veg" /></span>
        //                 Veg
        //             </Link>
        //         </li>
        //         <li className={activeCategory === 'nonveg' ? 'active' : ''}>
        //             <Link to="#" onClick={() => handleCategoryClick('nonveg')}>
        //                 <span><Image src='Images/nonveg.svg' alt="Non-Veg" /></span>
        //                 Non-Veg
        //             </Link>
        //         </li>
        //         <li className={activeCategory === 'egg' ? 'active' : ''}>
        //             <Link to="#" onClick={() => handleCategoryClick('egg')}>
        //                 <span><Image src='Images/egg.svg' alt="Egg" /></span>
        //                 Egg
        //             </Link>
        //         </li>
        //     </ul>
        //     <Link className='btngreen continue' onClick={handleContinueClick}>
        //         Continue <Icon icon="formkit:right" width="16px" height="16px" />
        //     </Link>
        //     {isModalVisible && <ItemSelectModal onClose={() => setIsModalVisible(false)} />}
        // </div>
    );
}

export default GuestSelectModal;

function ItemSelectModal({ onClose }) {
    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    // Event handler to close the modal
    const handleCloseClick = () => {
        onClose(); // Close the modal by setting the visibility to false
        document.body.classList.remove('show'); // Remove the 'show' class from the body
    };
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
        document.body.classList.add('show'); // Optional: Add class to body to handle overflow
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.classList.remove('show'); // Remove class from body
    };
    return (
        <div className="guestselectmodalmain pt-0">
            <Link className='closebtn' onClick={handleCloseClick}>
                <Icon icon="carbon:close-filled" width="36px" height="36px" />
            </Link>
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
                                // defaultChecked // Set default checked for the first option (if needed)
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
                    <Link className='btngreen continue' onClick={handleOpenModal}>
                        Add Item - ₹{calculateTotalPrice().toFixed(2)}
                    </Link>
                    {isModalOpen && <ItemSelectMoreVarientModal onClose={handleCloseModal} />}
                </div>
            </div>
        </div>
    );
}


function ItemSelectMoreVarientModal({ onClose }) {
    const [activeCategory, setActiveCategory] = useState('veg');

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    // Event handler to close the modal
    const handleCloseClick = () => {
        onClose(); // Close the modal by setting the visibility to false
        document.body.classList.remove('show'); // Remove the 'show' class from the body
    };
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
        <div className="guestselectmodalmain pt-0">
            <Link className='closebtn' onClick={handleCloseClick}>
                <Icon icon="carbon:close-filled" width="36px" height="36px" />
            </Link>
            <ul className='saladimgs'>
                <li className='w-100'><Image src='Images/selectedvarient.png'></Image></li>

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
                <h3>Lebanese Fateh Salad <span onClick={handleIconClick} style={{ cursor: 'pointer' }}>{isFilled ? (
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
    );
}