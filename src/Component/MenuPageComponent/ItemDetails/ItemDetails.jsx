import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
import Title from '../../CommonComponent/Title/Title';
import CombosSlider from '../Combos/CombosSlider';
import './ItemDetails.css';
import Loader from '../../CommonComponent/Loader/Loader';
import { useSelector } from 'react-redux';
import Modals from '../../CommonComponent/Modal/Modal';
import { addOnsGroupeds, getGroupedOptionsAndAddOns, optionsGroupeds } from '../../../Helper/Coman';
import confetti from "https://esm.run/canvas-confetti@1";
function ItemDetails({ items, selectedCategory }) {
    const { menu } = useSelector((state) => state.food);
    const [activeSlider, setActiveSlider] = useState({});
    const [loading, setLoading] = useState(true);
    const sliderRefs = useRef({});
    const [activeBgGreen, setActiveBgGreen] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [item, setItem] = useState([]);
    const [isFilled, setIsFilled] = useState(false);
    const [flag, setFlag] = useState(null);
    // Function to handle the click and toggle the slider visibility
    const handleViewCombosClick = (itemKey, e) => {
        e.preventDefault();
        setActiveSlider(prevState => ({
            ...prevState,
            [itemKey]: !prevState[itemKey]
        }));
        setActiveBgGreen(prevState => (prevState === itemKey ? null : itemKey));
        confetti({
            particleCount: 150,
            spread: 60
        });
    };
    
    useEffect(() => {
        if (items) {
            setLoading(false);
        }
    }, [items]);

    const handleQuickbiteClick = (quickbite) => {
        setFlag('Qickbitepage');
        const { groupedOptions, groupedAddOns } = getGroupedOptionsAndAddOns(menu, quickbite.item_id);
        // const optionsGrouped = Object.values(menu.itemOptions
        //     .filter((option) => option.item_id === quickbite.item_id)
        //     .reduce((groups, itemOption) => {
        //         const groupName = itemOption.option_group_name;
        //         if (!groups[groupName]) {
        //             groups[groupName] = { groupName, itemList: [] };
        //         }
        //         const optionDetails = menu.options.find(
        //             (option) => option.option_id === itemOption.option_id
        //         );
        //         groups[groupName].itemList.push(optionDetails);
        //         return groups;
        //     }, {}));
            
        //     // Find related add-ons and group by addon_group_name
        // const addOnsGrouped = Object.values(menu.itemAddOns
        //     .filter((addon) => addon.item_id === quickbite.item_id)
        //     .reduce((groups, itemAddon) => {
        //         const groupName = itemAddon.addon_group_name;
        //         if (!groups[groupName]) {
        //             groups[groupName] = { groupName, itemList: [] };
        //         }
        //         const addonDetails = menu.addOns.find(
        //             (addon) => addon.addon_id === itemAddon.addon_id
        //         );
        //         groups[groupName].itemList.push(addonDetails);
        //         return groups;
        //     }, {}));

            const data = {
                item_id: quickbite.item_id,
                price: quickbite.price,
                item_name: quickbite.item_name,
                addOnsGrouped: groupedAddOns,
                optionsGrouped:  groupedOptions,
            }
            setItem(data);
            setShow(true);
    };
    

    return (
        <>
            <div className="itemdetails mb-5">
                {/* KEBABS Section */}
                <Title title={selectedCategory?.item_name ? selectedCategory?.item_name : selectedCategory} className="quicktitle mb-3" />
                {loading ? (
                    <div><Loader /></div>
                ) : (
                    items?.length > 0 && items.map((item, index) => (
                        <div key={index} className={`bg-white ${activeBgGreen === index ? 'bg-green' : 'bg-white'}`}>
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
                                            <span><Image src={item.diet === 'N' ? '/Images/nonveg.svg' : item.diet === 'V' ?  '/Images/veg.svg' : '/Images/egg.svg'} alt="Veg"></Image></span>
                                        </div>
                                        <h3>{item.item_name}</h3>
                                        <h4>₹{item.price}</h4>
                                        <h4>{item.item_category}</h4>
                                        <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a crea...</p>
                                        <Link to="#">Read More</Link>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="itemaddimg">
                                        <Image src='/Images/itemimg.png' alt="Item"></Image>
                                        <Link to="#" onClick={() => handleQuickbiteClick(item)}><Icon icon="charm:plus" width="16px" height="16px" /> ADD</Link>
                                    </div>
                                </Col>
                            </Row>
                            <Link
                                to="#"
                                className='viewcombomain mb-3'
                                onClick={(e) => handleViewCombosClick(index, e)}
                            >
                                Combos <Icon icon="iconamoon:arrow-down-2-light" width="16px" height="16px" />
                            </Link>
                            {activeSlider[index] && (
                                <div ref={(el) => (sliderRefs.current[index] = el)}>
                                    <CombosSlider />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            <Modals
                item={item}
                show={show}
                onHide={handleClose}
                handleIconClick={() => setIsFilled(!isFilled)}
                isFilled={isFilled}
                flag={flag}
            />
        </>
    );
}

export default ItemDetails;
