import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItemToCart } from '../../../Pages/CartPage/Cartslice/Cartslice';
import { useDispatch } from 'react-redux';

function Modals({ 
    isFilled, 
    item, 
    show, 
    onHide, 
    handleIconClick,
    flag
 }) {
    const [adon, setAdon] = useState([]);
    const [option, setOption] = useState({});
    const [count, setCount] = useState(1);
    const [adonPrice,setAdonPrice] = useState(0)
    const [optionPrice,setOptionPrice] = useState(0)
    // const [totalAllItemPrice,setTotalAllItemPrice] = useState(0)
    const dispatch = useDispatch();
    // Calculate total price of selected items
    useEffect(() => {
        const newAdonPrice = adon.reduce((acc, addon) => acc + addon.price, 0);
        const newOptionPrice = Object.values(option).reduce((acc, opt) => acc + opt.price, 0);
        setAdonPrice(newAdonPrice);
        setOptionPrice(newOptionPrice);
    }, [adon, option]);
    

    const calculateItemPrice = () => {
        const basePrice = item.price || 0;
        const totalPrice = (basePrice + adonPrice + optionPrice) * count;
        return totalPrice;
    };

    useEffect(() => {
        if (!show) {
            setCount(1);
        }
    }, [show]);
    const handleAddToCart = (item) => {
        const selectedItem = {
            item_id: item.item_id,
            combo: flag === 'Likespage'? 'Checkout' : "None",
            item_name: item.item_name,
            discount:0,
            price: item.price,
            qty: count,
            items: [{
                item_id: item.item_id,
                price: item.price,
                add_ons: adon.map(addon => ({
                    addon_id: addon.addon_id,
                    price: addon.price,
                })),
                options: option,
            }],
        };
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.item_id === selectedItem.item_id);
        if (existingItemIndex >= 0) {
            cartItems[existingItemIndex].qty += selectedItem.qty;
            // cartItems[existingItemIndex].price += selectedItem.price;
        } else {
            cartItems.push(selectedItem);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        dispatch(addItemToCart(cartItems))
        setOptionPrice(0)
        setAdonPrice(0)
        calculateItemPrice(0)
        setAdon([])
        setOption({})
        toast.success(`Add Item SuccessFully`);
        onHide();
        setCount(1)
    };
    const handleAdonChange = (e, addon) => {
        const isChecked = e.target.checked;
        if (isChecked) {
                setAdon([...adon, addon]);
        } else {
            setAdon(adon.filter(ad => ad.addon_id !== addon.addon_id));
        }
        }
    const handleOptionChange = (e,groupName,opt) => {
        setOption({
            ...option,
            [groupName]: opt
        })
        // const isChecked = e.target.checked;
        // if (isChecked) {
        //         setOption([...option, opt]);
        // } else {
        //     setOption(option.filter(op => op.option_id !== opt.option_id));
        // }
    };

    const handleAddClick = () => {
        if (item) {
            setCount(prevCount => prevCount + 1);
        }
    };

    const handleRemoveClick = () => {
        if (item && count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };
    useEffect(() => {
        if (!show) {
            setCount(1);
            setAdon([]);
            setOption({});
            setAdonPrice(0);
            setOptionPrice(0);
            // setTotalAllItemPrice(0)
        }
    }, [show]);

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
                                    {/* <h3>Select add-on’s</h3> */}
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
                                                                    // name={`addon-${index}`}
                                                                    onChange={(e) => handleAdonChange(e, addon)}
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
                                    {/* <h3>Select options</h3> */}
                                </div>
                                <ul className='selectvariantGroup'>
                                    {item && item.optionsGrouped && item.optionsGrouped.length > 0 ? (
                                        item.optionsGrouped.map((group, index) => (
                                            <li key={`option-${index}`} className='home-list'>
                                                <h3>{group.groupName}</h3>
                                                <ul className='selectvariantmain'>
                                                    {group.itemList.map((option, optionIndex) => (
                                                        <li key={`option-${optionIndex}`}>                                                          
                                                            <h5>{option.option_name}</h5>
                                                            <label className="custom" htmlFor={`selectaddonoptionMeat${optionIndex}`}>
                                                                <span className="checkbox-label">₹{option.price}</span>
                                                                <input
                                                                    type="radio"
                                                                    id={`selectaddonoptionMeat${option.option_id}`}
                                                                    // value={option}
                                                                    name={`option-${index}`} 
                                                                    onChange={(e) => handleOptionChange(e,group.groupName, option)}
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
                                    <h5 style={{ margin: '0 10px' }}>{count}</h5>
                                    <span
                                        onClick={item ? handleAddClick : null}
                                        style={{ cursor: item ? 'pointer' : 'not-allowed', opacity: item ? 1 : 0.5 }}>
                                        <Icon icon="ic:round-plus" width="24px" height="24px" />
                                    </span>
                                </div>
                                <Link className='btngreen continue' onClick={()=>handleAddToCart(item)}>
                                    Add Item - ₹{calculateItemPrice()}
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
