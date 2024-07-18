import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Modal } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { Icon } from '@iconify/react/dist/iconify.js';
import GuestSelectModal from '../GuestSelectModal/GuestSelectModal';
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from 'lodash'
import { getGroupedOptionsAndAddOns } from '../../../Helper/Coman';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from 'react-toastify';

import './Combos.css';
import { addItemToCart } from '../../../Pages/CartPage/Cartslice/Cartslice';

function CombosSlider({comboList}) {
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const [activeCategory, setActiveCategory] = useState('V');
    const {menu} = useSelector((state)=>state?.food);
    const { customerPref } = useSelector((state) => state?.table);
    const [allCombos, setAllCombos] = useState([])
    const [adonPrice,setAdonPrice] = useState(0)
    const [optionPrice,setOptionPrice] = useState(0)
    const [filtereItem,setFilteredItem] = useState([])
    const [adon, setAdon] = useState([]);
    const [option, setOption] = useState({});
    const dispatch = useDispatch()
    const options = {
        margin: 10,
        responsiveClass: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 1.6,

    };

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (!isEmpty(customerPref)) {
          setActiveCategory(customerPref?.diet)
        }
      }, [customerPref]);
    const handleClick = () => {
        document.body.classList.add('show'); // Add the 'show' class to the body
    };

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
    useEffect(() => {
        const newAdonPrice = Object.values(adon).reduce((acc, addOns) => {
          const totalAddOnPrice = addOns.reduce((sum, addOn) => sum + addOn.price, 0);
          return acc + totalAddOnPrice;
        }, 0);
        const newOptionPrice = Object.values(option).reduce((acc, options) => {
          const totalOptionPrice = Object.values(options).reduce((sum, option) => sum + option.price, 0);
          return acc + totalOptionPrice;
        }, 0);
        setAdonPrice(newAdonPrice);
        setOptionPrice(newOptionPrice);
      }, [adon, option]);

    // Calculate total price
    const calculateTotalPrice = () => {
        console.log({ filtereItem })
        const totalPrice = filtereItem.price - filtereItem.discount;
        const totalPriceWithqty = (totalPrice + adonPrice + optionPrice) * filtereItem.qty;
        return totalPriceWithqty;
    };

    const createCombos = (combos, diet) => {
        let comboslist = [];
        for (const combo of combos) {
          let comboItems = [];
          combo.items.map((item) => {
            const i = menu.items.find((i) => i.item_id === item);
            comboItems.push(i);
          });
          const data = {
            ...combo,
            diet: diet,
            items: comboItems,
          };
          comboslist.push(data);
        }
        setAllCombos(comboslist)
        // dispatch(setComboList(comboslist));
      };

    useEffect(() => {
        if(!isEmpty(comboList)) {
            createCombos(comboList, activeCategory);
        }
    }, [comboList])

    const handleQuickbiteClick = (combo) => {
        const menuItem = menu.items.find((i) => i.item_id === combo.item_id)
        const { groupedOptions, groupedAddOns } = getGroupedOptionsAndAddOns(menu, combo.item_id);
        const data = {
            item_id: menuItem.item_id,
            price: menuItem.price,
            item_name: menuItem.item_name,
            addOnsGrouped: groupedAddOns,
            optionsGrouped:  groupedOptions,
        }
        return data
      
    };

    const handleShow = async (item) => {
        setShow(true);
        const comboDetails = await item?.items?.map((i) => handleQuickbiteClick(i))
        const data = {
            ...item,
            qty:1,
            items: comboDetails
        }
        setFilteredItem(data)
        setOptionPrice(0)
        setAdonPrice(0)
    }
    const handleAdonChange = (e, itemId, addOnId, price) => {
        const isChecked = e.target.checked;
        setAdon((prev) => {
          const itemAddOns = prev[itemId] || [];
          if (isChecked) {
            return {
              ...prev,
              [itemId]: [...itemAddOns, { addon_id: addOnId, price }]
            };
          } else {
            return {
              ...prev,
              [itemId]: itemAddOns.filter(addOn => addOn.addon_id !== addOnId)
            };
          }
        });
      };

      const handleOptionChange = (e, itemId, optionId, price, groupName) => {
        setOption((prev) => {
                return {
                    ...prev,
                    [itemId]: {
                        ...prev[itemId],
                        [groupName]: {option_id: optionId, price: price}
                    }
                  };
        });
      };
    const handleAddToCart = () => {
        const cartItemsAdd = filtereItem.items.map((item) => ({
            item_id: item.item_id,
            item_name:item.item_name,
            price: item.price,
            add_ons: adon[item?.item_id] ? [...adon[item?.item_id]] : [],
            options: option[item?.item_id] ? option[item?.item_id] : {}
        }));
          const cartData = {
            combo: "Menu",
            qty: 1,
            price: calculateTotalPrice(),
            discount: filtereItem.discount,
            items: cartItemsAdd
          };
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          cartItems.push(cartData);
          dispatch(addItemToCart(cartItems))
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          toast.success(`Add Item SuccessFully`);

        setAdon({});
        setOption({});
        setOptionPrice(0);
        setAdonPrice(0);
        setShow(false);
    };
    return (
        <div className="Combomain">
            {allCombos.length > 0 && <OwlCarousel className="owl-theme mb-3" {...options}>
                {allCombos?.map((item, index) => (
                    <div className="item" key={index}>
                        <div className="combodetail">
                            <ul className='saladimgs gap-1 mb-0'>
                            {item?.items?.map((i, ind) => (
                                <li key={ind} className={i?.url}><Image src={i?.url ? i?.url : 'Images/combo1.png'}></Image></li>
                            ))}
                                {/* <li><Image src='Images/combo1.png'></Image></li>
                                <li><Image src='Images/combo2.png'></Image></li> */}
                                <Link className='plusicon'><Image src='Images/plus.png'></Image></Link>
                                <Link className='vegicon'><Image src='Images/veg.svg'></Image></Link>
                                <Link className='nonvegicon'><Image src='Images/nonveg.svg'></Image></Link>

                            </ul>
                            <div className="combosubdetail">
                                <div className="offertab">
                                    <span className='bluetag'><Icon icon="carbon:close-outline" width="16px" height="16px" /> 30% OFF</span>
                                    <i><Image src={item.diet === 'N' ? '/Images/nonveg.svg' : item.diet === 'V' ?  '/Images/veg.svg' : '/Images/egg.svg'} alt="Veg"></Image></i>
                                </div>
                                <h3>{item?.items.map(i => i.item_name).join(' + ')}</h3>
                                <div className="comboprice d-flex">
                                <p>₹{item?.price-item?.discount} <del>₹{item?.discount} </del></p>
                                <Link onClick={()=>handleShow(item)}>View Combo <Icon icon="teenyicons:right-small-outline" width="16px" height="16px" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>}
            <Modal show={show} onHide={handleClose} className="singleitem combomodal">
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
                    </div>
                    <Accordion defaultActiveKey="0">
                        {filtereItem?.items?.map((mainitem,mainindex)=>(
                            <Accordion.Item eventKey={mainindex} key={mainindex}>
                            <Accordion.Header>{mainitem?.item_name}</Accordion.Header>
                            <Accordion.Body>
                            <div className="select-variant-container">
                                <div className="selectvariant">
                                <div className="selectvarianttitle">
                                    {/* <h3>Select variants</h3>
                                    <p>Any one option</p> */}
                                </div>
                                <ul className='selectvariantGroup'>
                                    {mainitem && mainitem.addOnsGrouped && mainitem.addOnsGrouped.length > 0 ? (
                                        mainitem.addOnsGrouped.map((group, index) => (
                                            <li key={`addon-group-${index}`}>
                                                <h3>{group.groupName}</h3>
                                                <ul className='selectvariantmain '>
                                                    {group.itemList.map((addon, addonIndex) => (
                                                        <li key={`addon-${addonIndex}`}>                                                        
                                                            <h5>{addon.addon_name}</h5>
                                                            <label className="custom-checkbox" htmlFor={`selectaddonoption${addonIndex}`}>
                                                                <span className="checkbox-label">₹{addon.price}</span>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`selectaddonoption${addonIndex}`}
                                                                    // name={`addon-${index}`}
                                                                    value={addon}
                                                                    onChange={(e) => handleAdonChange(e, mainitem.item_id, addon.addon_id, addon.price, index)}
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
                                    {/* <h3>Select add-on’s</h3> */}
                                </div>
                                <ul className='selectvariantGroup'>
                                    {mainitem && mainitem.optionsGrouped && mainitem.optionsGrouped.length > 0 ? (
                                        mainitem.optionsGrouped.map((group, index) => (
                                            <li key={`option-group-${index}`} className='combo-option-list'>
                                                <h3>{group.groupName}</h3>
                                                <ul className='selectvariantmain'>
                                                    {group.itemList.map((option, optionIndex) => (
                                                        <li key={`option-${option.option_id}`}>                                                       
                                                            <h5>{option.option_name}</h5>
                                                            <label className="custom" htmlFor={`selectaddonoptionMeat${optionIndex}`}>
                                                                <span className="checkbox-label">₹{option.price}</span>
                                                                <input
                                                                    type="radio"
                                                                    id={`selectaddonoptionMeat${option.option_id}`}
                                                                    value={option}
                                                                    name={`option-${mainitem.item_name}-${group.groupName}`}
                                                                    onChange={(e) => handleOptionChange(e, mainitem.item_id, option.option_id, option.price, group.groupName)}                                                            
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
                        </div>
                            </Accordion.Body>  
                        </Accordion.Item>
                        )
                        )}
                        </Accordion>

                        <div className="additem">
                                <div className="addremoveitem" style={{ display: 'flex', alignItems: 'center' }}>
                                    <span onClick={()=>handleRemoveClick(filtereItem)} style={{ cursor: 'pointer' }}>
                                        <Icon icon="ri:subtract-fill" width="24px" height="24px" />
                                    </span>
                                    <h5 style={{ margin: '0 10px' }}>{filtereItem?.qty}</h5>
                                    <span onClick={()=>handleAddClick(filtereItem)} style={{ cursor: 'pointer' }}>
                                        <Icon icon="ic:round-plus" width="24px" height="24px" />
                                    </span>
                                </div>
                                <Link className='btngreen continue' to="#" onClick={handleAddToCart}>
                                    Add Item - ₹{calculateTotalPrice().toFixed(2)}
                                </Link>

                            </div>
                </Modal.Body>

            </Modal>
            {/* <Modal show={show} onHide={handleClose} className="singleitem combomodal">
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className="guestselectmodalmain pt-0">

                        <ul className='saladimgs'>
                            <li><Image src='Images/saladimg1.png'></Image></li>
                            <li><Image src='Images/saladimg2.png'></Image></li>
                        </ul>

                        <div className="itemtitle">
                            <h3>Lebanese Fateh Salad + Pesto pasta <span onClick={handleIconClick} style={{ cursor: 'pointer' }}>{isFilled ? (
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
                            <div className="combodis">
                                <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a creamy yogurt-tahini sauce. It's topped with pine nuts, fresh herbs like parsley and mint, and often drizzled with olive oil.</p>
                                <p>Lebanese Fateh Salad is a traditional Middle Eastern dish made with layers of toasted pita bread, chickpeas, and a creamy yogurt-tahini sauce. It's topped with pine nuts, fresh herbs like parsley and mint, and often drizzled with olive oil.</p>
                            </div>
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
                                    <p>Chose as many as you like</p>
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

export default CombosSlider;
