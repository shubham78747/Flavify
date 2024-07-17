import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Combos.css';
import { Image, Modal } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { Icon } from '@iconify/react/dist/iconify.js';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {addComboItemToCart, addItemToCart} from '../../../Pages/CartPage/Cartslice/Cartslice'
import { addOnsGroupeds, getGroupedOptionsAndAddOns, optionsGroupeds } from '../../../Helper/Coman';
import {isEmpty} from "lodash"

function CombosSlider() {
    const options = {
        margin: 24,
        responsiveClass: true,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoplay: true,
        loop: true,
        items: 1.5,

    };
    const [show, setShow] = useState(false);
    const [filtereItem,setFilteredItem] = useState([])
    const [adon, setAdon] = useState([]);
    const [option, setOption] = useState({});
    const [isFilled, setIsFilled] = useState(false);
    const [allCombos, setAllCombos] = useState([])
    const [adonPrice,setAdonPrice] = useState(0)
    const [optionPrice,setOptionPrice] = useState(0)
    const { comboList } = useSelector((state) => state?.table);
    const { menu  } = useSelector((state) => state.food);
    const dispatch = useDispatch()

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

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
        if (comboList) {
            setAllCombos(comboList);
        }
    }, [comboList]);

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

    
    const handleClose = () => setShow(false);
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
  

    // Event handler to toggle the filled state
    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };

    
    // Handler to increase the count
    const handleAddClick = (item) => {
        setFilteredItem({...filtereItem, qty: filtereItem.qty + 1})
    };

    // Handler to decrease the count
    const handleRemoveClick = (item) => {
        if (filtereItem.qty > 1){
            setFilteredItem({...filtereItem, qty: filtereItem.qty - 1})
        }
    };

    const calculateTotalPrice = () => {
        const totalPrice = filtereItem.total - filtereItem.discount;
        const totalPriceWithqty = (totalPrice + adonPrice + optionPrice) * filtereItem.qty;
        return totalPriceWithqty;
    };
 
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
          console.log({filtereItem})
        const handleAddToCart = () => {
            const cartItemsAdd = filtereItem.items.map((item) => ({
                item_id: item.item_id,
                item_name:item.item_name,
                price: item.price,
                add_ons: adon[item?.item_id] ? [...adon[item?.item_id]] : [],
                options: option[item?.item_id] ? option[item?.item_id] : {}
            }));
              const cartData = {
                combo: "LandingPage",
                qty: 1,
                price: filtereItem.total,
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
            {allCombos?.length > 0 && <OwlCarousel className="owl-theme mb-3" {...options}>
            {comboList?.map((item, index) => (
                <div className="item" key={index}>
                    <div className="combodetail">
                        <ul className='saladimgs gap-1 mb-0'>
                            <li><Image src='Images/combo1.png'></Image></li>
                            <li><Image src='Images/combo2.png'></Image></li>
                            <Link className='plusicon'><Image src='Images/plus.png'></Image></Link>
                        </ul>
                        <div className="combosubdetail">
                            <div className="offertab">
                                <span className='bluetag'><Icon icon="carbon:close-outline" width="16px" height="16px" /> 30% OFF</span>
                                <i><Image src={item.diet === 'N' ? '/Images/nonveg.svg' : item.diet === 'V' ?  '/Images/veg.svg' : '/Images/egg.svg'} alt="Veg"></Image></i>
                            </div>
                            <h3>{item?.items.map(i => i.item_name).join(' + ')}</h3>
                            <div className="comboprice d-flex">
                                <p>₹{item?.total-item?.discount} <del>₹{item?.discount} </del></p>
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
                                                    {group.itemList.map((opt, optionIndex) => (
                                                        <li key={`option-${opt.option_id}`}>                                                       
                                                            <h5>{opt.option_name}</h5>
                                                            {/* {console.log({ check: option[mainitem.item_id] ? option[mainitem.item_id][group.groupName]?.option_id === opt.option_id : false, mainitem: mainitem.item_id, groupName: group.groupName, option, optId: opt.option_id })} */}
                                                            <label className="custom" htmlFor={`selectaddonoptionMeat${opt.option_id}`}>
                                                                <span className="checkbox-label">₹{opt.price}</span>
                                                                {/* {console.log({ checkkk: !isEmpty(option) && option[mainitem.item_id] ? option[mainitem.item_id][group.groupName]?.option_id === opt.option_id : false, mainitem: mainitem.item_id, groupName: group.groupName})} */}
                                                                <input
                                                                    type="radio"
                                                                    id={`selectaddonoptionMeat${opt.option_id}`}
                                                                    // value={opt}
                                                                    name={`option-${mainitem.item_id}-${group.groupName}`}
                                                                    onChange={(e) => handleOptionChange(e, mainitem.item_id, opt.option_id, opt.price, group.groupName)}                                                            
                                                                    checked={!isEmpty(option) && option[mainitem.item_id] ? option[mainitem.item_id][group.groupName]?.option_id === opt.option_id : false}
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
        </div>
    );
}

export default CombosSlider;
