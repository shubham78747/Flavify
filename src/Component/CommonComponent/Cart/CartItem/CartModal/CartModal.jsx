import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Modals({ 
    isFilled, 
    item, 
    show, 
    onHide, 
    handleIconClick,
    setCartItems,
 }) {
    const [filtereddata,setFiltereddata] = useState([]);

    const calculateItemPrice = () => {
        const basePrice = filtereddata?.price || 0;
        const totalPrice = basePrice * filtereddata?.qty;
        return totalPrice;
    };

    const handleAddToCart = (itemId) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.item_id === itemId);
        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex] = { ...filtereddata, item_id: itemId };
        } else {
            cartItems.push({ ...filtereddata, item_id: itemId });
        }
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setCartItems(cartItems)
        onHide();
        toast.success(`Item added successfully`);
    };

        const handleAdonChange = (e, addon) => {
            const isChecked = e.target.checked;
            if (isChecked) {
                setFiltereddata((prev) => ({
                    ...prev,
                    add_ons: [...prev.add_ons, {addon_id: addon.addon_id, price:addon.price}]
                }))
                setFiltereddata((prev) => ({
                    ...prev,
                    price: prev.price+addon.price,
                }))
            } else {
                setFiltereddata((prev) => ({
                    ...prev,
                    add_ons: prev.add_ons.filter(ad => ad.addon_id !== addon.addon_id)
                }))
                  setFiltereddata((prev) => ({
                    ...prev,
                    price: prev.price-addon.price,
                }))
                }
            }

        const handleOptionChange = (e, opt) => {
            const isChecked = e.target.checked;
            if (isChecked) {
                setFiltereddata((prev) => ({
                    ...prev,
                    options: [...prev.options, {option_id: opt.option_id, price:opt.price}],
                }))
                setFiltereddata((prev) => ({
                    ...prev,
                    price: prev.price+opt.price,
                }))
            } else {
                setFiltereddata((prev) => ({
                    ...prev,
                    options: prev.options.filter(ad => ad.option_id !== opt.option_id)
                }))
                setFiltereddata((prev) => ({
                    ...prev,
                    price: prev.price-opt.price,
                }))
            }
    };
    const handleAddClick = () => {
        if (item) {
            setFiltereddata((prev) => ({
                ...prev,
                qty: prev.qty + 1
            }))
        }
    };

    const handleRemoveClick = () => {
        if (item && filtereddata?.qty > 1) {
            setFiltereddata((prev) => ({
                ...prev,
                qty: prev.qty - 1
            }))
        }
    };

    useEffect(() => {
        if (item) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const data = Array.isArray(cartItems) ? cartItems.filter(cartItem => cartItem.item_id === item.item_id) : [];
            if (data.length > 0) {
                setFiltereddata(data[0]);
            }
            else {
                setFiltereddata([]);
            }
        }
    }, [item]);
    

    return (
        <>
            <Modal show={show} onHide={onHide} className="singleitem">
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="guestselectmodalmain pt-0">
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
                            <h3>{item.item_name} <span onClick={handleIconClick} style={{ cursor: 'pointer' }}>{isFilled ? (
                                <Icon icon="ph:heart-fill" width="24px" height="24px" style={{ color: 'red' }} />
                            ) : (
                                <Icon icon="ph:heart" width="24px" height="24px" style={{ color: 'black' }} />
                            )}</span></h3>
                            <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a creamy yogurt-tahini sauce. It's topped with pine nuts, fresh herbs like parsley and mint, and often drizzled with olive oil.</p>
                        </div>
                        <div className="select-variant-container">
                            <div className="selectvariant">
                                <div className="selectvarianttitle">
                                </div>
                                <ul className='selectvariantGroup'>
                                    {item && item.addOnsGrouped && item.addOnsGrouped.length > 0 ? (
                                        item.addOnsGrouped.map((group, index) => (
                                            <li key={`addon-group-${index}`}>
                                                <h3>{group.groupName}</h3>
                                                <ul className='selectvariantmain'>
                                                    {group.itemList.map((addon, addonIndex) => (            
                                                        <li key={`addon-${addonIndex}`}>
                                                            <h5>{addon.addon_name}</h5>
                                                            <label className="custom-checkbox" htmlFor={`selectaddonoption${addonIndex}`}>
                                                                <span className="checkbox-label">₹{addon.price}</span>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`selectaddonoption${addonIndex}`}
                                                                    value={addon}
                                                                    onChange={(e) => handleAdonChange(e, addon)}
                                                                    checked={filtereddata?.add_ons?.length ? filtereddata?.add_ons?.some(item => item.addon_id === addon.addon_id) : false}
                                                                />
                                                                <span className="checkbox-indicator"></span>
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No add-on items found.</li>
                                    )}
                                </ul>
                            </div>
                            <div className="selectvariant">
                                <div className="selectvarianttitle">
                                </div>
                                <ul className='selectvariantGroup'>
                                    {item && item.optionsGrouped && item.optionsGrouped.length > 0 ? (
                                        item.optionsGrouped.map((group, index) => (
                                            <li key={`addon-option-${index}`}>                                            
                                                <h3>{group.groupName}</h3>
                                                <ul className='selectvariantmain'>
                                                    {group.itemList.map((opt, optionIndex) => (                                                        
                                                        <li key={`option-${optionIndex}`}>
                                                            <h5>{opt.option_name}</h5>
                                                            <label className="custom-checkbox" htmlFor={`selectaddonoptionMeat${optionIndex}`}>
                                                                <span className="checkbox-label">₹{opt.price}</span>                                                            
                                                                <input
                                                                    type="checkbox"
                                                                    id={`selectaddonoptionMeat${optionIndex}`}
                                                                    value={opt}
                                                                    onChange={(e) => handleOptionChange(e, opt)}
                                                                    checked={filtereddata?.options?.length > 0 && filtereddata?.options?.some(item => item.option_id === opt.option_id)}
                                                                />
                                                                <span className="checkbox-indicator"></span>
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))
                                    ) : (
                                        <li>No options found.</li>
                                    )}
                                </ul>
                            </div>
                            <div className="additem">
                                <div className="addremoveitem" style={{ display: 'flex', alignItems: 'center' }}>
                                    <span
                                        onClick={item ? handleRemoveClick : null}
                                        style={{ cursor: item ? 'pointer' : 'not-allowed', opacity: item ? 1 : 0.5 }}>
                                        <Icon icon="ri:subtract-fill" width="24px" height="24px" />
                                    </span>
                                    <h5 style={{ margin: '0 10px' }}>{filtereddata?.qty}</h5>
                                    <span
                                        onClick={item ? handleAddClick : null}
                                        style={{ cursor: item ? 'pointer' : 'not-allowed', opacity: item ? 1 : 0.5 }}>
                                        <Icon icon="ic:round-plus" width="24px" height="24px" />
                                    </span>
                                </div>
                                <Link className='btngreen continue' onClick={()=>handleAddToCart(item.item_id)}>
                                    Add Item -₹{calculateItemPrice()}
                                </Link>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Modals;
