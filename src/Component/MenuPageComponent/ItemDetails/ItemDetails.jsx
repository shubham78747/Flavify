import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import Title from '../../CommonComponent/Title/Title';
import CombosSlider from '../Combos/CombosSlider';
import './ItemDetails.css';
import Loader from '../../CommonComponent/Loader/Loader';

function ItemDetails({items,selectedCategory,}) {
    const [activeSlider, setActiveSlider] = useState(null);
    const [loading, setLoading] = useState(true);
    const sliderRefs = useRef({}); // Store multiple refs
    const [activeBgGreen, setActiveBgGreen] = useState(null);
    // Function to handle the click and toggle the slider visibility
    const handleViewCombosClick = (sectionId, e) => {
        e.preventDefault();
        setActiveSlider((prevActive) => (prevActive === sectionId ? null : sectionId));
    };
    useEffect(()=>{
        if(items){
            setLoading(false)
        }
    },[items])

    return (
        <div className="itemdetails mb-5">
            <Title title={selectedCategory} className="quicktitle mb-3" />
            {loading ? (
                <div>{<Loader/>}</div>
            ) : (
            items && items.map((item,index)=>(
            <div className={`bg-white ${activeBgGreen === 'kebabs' ? 'bg-green' : ''}`} key={index}>
                <Row>
                <Col lg={8} >              
                        <div className="itemtitle mb-0" >
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
                            <h3>{item.item_name}</h3>
                            <h4>₹{item.price} </h4>
                            <h4>{item.item_category} </h4>
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
                    to=""
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
        ))
    )}
        </div>
    );
}

export default ItemDetails;
