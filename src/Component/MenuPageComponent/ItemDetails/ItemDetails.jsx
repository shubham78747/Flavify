import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import Title from '../../CommonComponent/Title/Title';
import CombosSlider from '../Combos/CombosSlider';
import './ItemDetails.css';

function ItemDetails() {
    // State to track which slider is active
    const [activeSlider, setActiveSlider] = useState(null);
    const sliderRefs = useRef({}); // Store multiple refs
    const [activeBgGreen, setActiveBgGreen] = useState(null);
    // Function to handle the click and toggle the slider visibility
    const handleViewCombosClick = (sectionId, e) => {
        e.preventDefault();
        setActiveSlider((prevActive) => (prevActive === sectionId ? null : sectionId));

        // Scroll into view if showing CombosSlider

    };

    return (
        <div className="itemdetails mb-5">
            {/* KEBABS Section */}
            <Title title="KEBABS" className="quicktitle mb-3" />
            <div className={`bg-white ${activeBgGreen === 'kebabs' ? 'bg-green' : ''}`}>
                <Row>
                    <Col lg={8}>
                        <div className="itemtitle mb-0">
                            <div className="ratingmain">
                                <ul className='rating'>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                </ul>
                                <p><Image src='/Images/fire.svg' alt="Calories"></Image> 510 kcal</p>
                                <span><Image src='/Images/veg.svg' alt="Veg"></Image></span>
                            </div>
                            <h3>Lebanese Fateh Salad </h3>
                            <h4>₹920 </h4>
                            <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a crea...</p>
                            <Link to="#">Read More</Link>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="itemaddimg">
                            <Image src='/Images/itemimg.png' alt="Item"></Image>
                            <Link to="#"><Icon icon="charm:plus" width="16px" height="16px" /> ADD</Link>
                        </div>
                    </Col>
                </Row>
                <Link
                    to="javascript:void(0)"
                    className='viewcombomain mb-3'
                    onClick={(e) => handleViewCombosClick('kebabs', e)}
                >
                    Combos <Icon icon="iconamoon:arrow-down-2-light" width="16px" height="16px" />
                </Link>
                {activeSlider === 'kebabs' && (
                    <div ref={(el) => (sliderRefs.current['kebabs'] = el)}>
                        <CombosSlider />
                    </div>
                )}
            </div>
            <div className={`bg-white ${activeBgGreen === 'kebabss' ? 'bg-green' : ''}`}>
                <Row>
                    <Col lg={8}>
                        <div className="itemtitle mb-0">
                            <div className="ratingmain">
                                <ul className='rating'>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                </ul>
                                <p><Image src='/Images/fire.svg' alt="Calories"></Image> 510 kcal</p>
                                <span><Image src='/Images/veg.svg' alt="Veg"></Image></span>
                            </div>
                            <h3>Lebanese Fateh Salad </h3>
                            <h4>₹920 </h4>
                            <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a crea...</p>
                            <Link to="#">Read More</Link>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="itemaddimg">
                            <Image src='/Images/itemimg.png' alt="Item"></Image>
                            <Link to="#"><Icon icon="charm:plus" width="16px" height="16px" /> ADD</Link>
                        </div>
                    </Col>
                </Row>
                <Link
                    to="javascript:void(0)"
                    className='viewcombomain mb-3'
                    onClick={(e) => handleViewCombosClick('kebabss', e)}
                >
                    Combos <Icon icon="iconamoon:arrow-down-2-light" width="16px" height="16px" />
                </Link>
                {activeSlider === 'kebabss' && (
                    <div ref={(el) => (sliderRefs.current['kebabss'] = el)}>
                        <CombosSlider />
                    </div>
                )}
            </div>
            {/* SOUPS Section */}
            <Title title="SOUPS" className="quicktitle mb-3" />
            <div className={`bg-white ${activeBgGreen === 'soups' ? 'bg-green' : ''}`}>
                <Row>
                    <Col lg={8}>
                        <div className="itemtitle mb-0">
                            <div className="ratingmain">
                                <ul className='rating'>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                </ul>
                                <p><Image src='/Images/fire.svg' alt="Calories"></Image> 510 kcal</p>
                                <span><Image src='/Images/veg.svg' alt="Veg"></Image></span>
                            </div>
                            <h3>Lebanese Fateh Salad</h3>
                            <h4>₹350 </h4>
                            <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a crea...</p>
                            <Link to="#">Read More</Link>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="itemaddimg">
                            <Image src='/Images/itemimg.png' alt="Item"></Image>
                            <Link to="#"><Icon icon="charm:plus" width="16px" height="16px" /> ADD</Link>
                        </div>
                    </Col>
                </Row>
                <Link
                    to="javascript:void(0)"
                    className='viewcombomain mb-3'
                    onClick={(e) => handleViewCombosClick('soups', e)}
                >
                    Combos <Icon icon="iconamoon:arrow-down-2-light" width="16px" height="16px" />
                </Link>
                {activeSlider === 'soups' && (
                    <div ref={(el) => (sliderRefs.current['soups'] = el)}>
                        <CombosSlider />
                    </div>
                )}
            </div>
            <div className={`bg-white ${activeBgGreen === 'soupss' ? 'bg-green' : ''}`}>
                <Row>
                    <Col lg={8}>
                        <div className="itemtitle mb-0">
                            <div className="ratingmain">
                                <ul className='rating'>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                    <li><Icon icon="twemoji:star" width="16px" height="16px" /></li>
                                </ul>
                                <p><Image src='/Images/fire.svg' alt="Calories"></Image> 510 kcal</p>
                                <span><Image src='/Images/veg.svg' alt="Veg"></Image></span>
                            </div>
                            <h3>Lebanese Fateh Salad</h3>
                            <h4>₹350 </h4>
                            <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a crea...</p>
                            <Link to="#">Read More</Link>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="itemaddimg">
                            <Image src='/Images/itemimg.png' alt="Item"></Image>
                            <Link to="#"><Icon icon="charm:plus" width="16px" height="16px" /> ADD</Link>
                        </div>
                    </Col>
                </Row>
                <Link
                    to="javascript:void(0)"
                    className='viewcombomain mb-3'
                    onClick={(e) => handleViewCombosClick('soupss', e)}
                >
                    Combos <Icon icon="iconamoon:arrow-down-2-light" width="16px" height="16px" />
                </Link>
                {activeSlider === 'soupss' && (
                    <div ref={(el) => (sliderRefs.current['soupss'] = el)}>
                        <CombosSlider />
                    </div>
                )}
            </div>
            {/* Add more sections as needed */}

        </div>
    );
}

export default ItemDetails;
