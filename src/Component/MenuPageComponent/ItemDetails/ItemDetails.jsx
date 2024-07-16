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
import predictMenu  from '../../../Helper/menuCombo';
// import { predictMenu } from '../../../Helper/menuCombo';

function ItemDetails({ items, selectedCategory }) {
    const { menu } = useSelector((state) => state.food);
    const { cartItemsList } = useSelector((state) => state.cart);
    const { table, customerPref } = useSelector((state) => state?.table);
    const [activeSlider, setActiveSlider] = useState({});
    const [loading, setLoading] = useState(true);
    const sliderRefs = useRef({});
    const [activeBgGreen, setActiveBgGreen] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [item, setItem] = useState([]);
    const [isFilled, setIsFilled] = useState(false);
    const [flag, setFlag] = useState(null);
    const [menuComboList, setMenuComboList] = useState([])
    // Function to handle the click and toggle the slider visibility
    const handleViewCombosClick = async (itemKey, e, item) => {
        e.preventDefault();
        
        let cartForCombo = [];
        cartItemsList.map(j => {
            j.items.map(i => {
                const menuItem = menu.items.find((k) => k.item_id === i.item_id);
                const data = {
                    item_id: menuItem.item_id,
                    item_name: menuItem.item_name,
                    item_category: menuItem?.item_category,
                    item_subcategory: menuItem?.item_subcategory,
                    qty: j.qty,
                    price: j.price,
                    diet: menuItem?.diet,
                    is_available: menuItem?.is_available,
                    is_quickbite: menuItem?.is_quickbite,
                    flavify_category: menuItem?.flavify_category,
                  }
                  cartForCombo.push(data)
            })
        });

        const data = await predictMenu(menu, cartForCombo, customerPref?.diet, item)
        setMenuComboList(data)

        setActiveSlider(prevState => ({
            // ...prevState,
            [itemKey]: !prevState[itemKey]
        }));
        setActiveBgGreen(prevState => (prevState === itemKey ? null : itemKey));
        if(!([itemKey] in activeSlider)) {
            confetti({
                particleCount: 150,
                spread: 60
            });
        } else {
            setMenuComboList(data)
        }
    };
    
    useEffect(() => {
        if (items) {
            setLoading(false);
        }
    }, [items]);

    const handleQuickbiteClick = (quickbite) => {
        setFlag('Qickbitepage');
        const { groupedOptions, groupedAddOns } = getGroupedOptionsAndAddOns(menu, quickbite.item_id);

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
                            {["Soups & Salads", "Starters", "Main Course", "Desserts", "Beverages"].includes(item?.item_category) && ["Stars", "Puzzles"].includes(item?.flavify_category) && <Link
                                to="#"
                                className='viewcombomain mb-3'
                                onClick={(e) => handleViewCombosClick(index, e, item)}
                            >
                                Combos <Icon icon="iconamoon:arrow-down-2-light" width="16px" height="16px" />
                            </Link>}
                            {activeSlider[index] && (
                                <div ref={(el) => (sliderRefs.current[index] = el)}>
                                    <CombosSlider comboList={menuComboList}/>
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
