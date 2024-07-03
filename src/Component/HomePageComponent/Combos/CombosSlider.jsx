import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Combos.css';
import { Image, Modal } from 'react-bootstrap';
import OwlCarousel from 'react-owl-carousel';
import { Icon } from '@iconify/react/dist/iconify.js';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



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
    const [item,setItem] = useState([]);
    const [adon, setAdon] = useState([]);
    const [option, setOption] = useState([]);
    const [activeCategory, setActiveCategory] = useState('V');
    const [isFilled, setIsFilled] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [count, setCount] = useState(1);
    const [adonPrice,setAdonPrice] = useState(0)
    const [optionPrice,setOptionPrice] = useState(0)

    const [allCombos, setAllCombos] = useState([])

    const { table, comboList } = useSelector((state) => state?.table);
    const { menu  } = useSelector((state) => state.food);

    useEffect(() => {
        if(comboList){
            setAllCombos(comboList)
        }
    }, [comboList])


    console.log({ allCombos })

    // useEffect(() => {
    //     const getitemdata = JSON.parse(localStorage.getItem('category'));
    //     setActiveCategory(getitemdata?.diet)
    //   }, [0]);
    const handleQuickbiteClick = (combo) => {
        console.log({ menu, combo })
        // return
        const menuItem = menu.items.find((i) => i.item_id === combo.item_id)
        console.log({ menuItem })

        const optionsGrouped = Object.values(menu.itemOptions
        .filter((option) => option.item_id === combo.item_id)
        .reduce((groups, itemOption) => {
            const groupName = itemOption.option_group_name;
            if (!groups[groupName]) {
            groups[groupName] = { groupName, itemList: [] };
            }
            const optionDetails = menu.options.find(
            (option) => option.option_id === itemOption.option_id
            );
            groups[groupName].itemList.push(optionDetails);
            return groups;
        }, {}));

        // Find related add-ons and group by addon_group_name
        const addOnsGrouped = Object.values(menu.itemAddOns
        .filter((addon) => addon.item_id === combo.item_id)
        .reduce((groups, itemAddon) => {
            const groupName = itemAddon.addon_group_name;
            if (!groups[groupName]) {
            groups[groupName] = { groupName, itemList: [] };
            }
            const addonDetails = menu.addOns.find(
            (addon) => addon.addon_id === itemAddon.addon_id
            );
            groups[groupName].itemList.push(addonDetails);
            return groups;
        }, {}));
        const data = {
            item_id: menuItem.item_id,
            price: menuItem.price,
            item_name: menuItem.item_name,
            addOnsGrouped: addOnsGrouped,
            optionsGrouped: optionsGrouped,
        }
        // setItem(data);
        console.log({ data })
        return data
        // setRelatedOptions(data);
        // setRelatedAddOns(addOns);
    };

    
    const handleClose = () => setShow(false);
    const handleShow = async (item) => {
        setShow(true);
        console.log({ item })
        
        const comboDetails = await item?.items?.map((i) => handleQuickbiteClick(i))
        console.log({ comboDetails })


        setFilteredItem(comboDetails)
    }
    
    const handleClick = () => {
        document.body.classList.add('show'); // Add the 'show' class to the body
    };
  

    // Handler to set the active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    // Event handler to close the modal

   

    // Event handler to toggle the filled state
    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };


    // State to manage selected options
    

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
        if (item) {
            setCount(prevCount => prevCount + 1);
        }
    };

    // Handler to decrease the count
    const handleRemoveClick = () => {
        if (item && count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    // Handler to toggle checkbox selection
    // const handleCheckboxChange = (event) => {
    //     const { id, checked } = event.target;
    //     if (checked) {
    //         setSelectedOptions([...selectedOptions, id]);
    //     } else {
    //         setSelectedOptions(selectedOptions.filter(option => option !== id));
    //     }
    // };

    // Calculate total price
    useEffect(() => {
        // Calculate the total prices of add-ons and options when they change
        const newAdonPrice = adon.reduce((acc, addon) => acc + addon.price, 0);
        const newOptionPrice = option.reduce((acc, opt) => acc + opt.price, 0);
        setAdonPrice(newAdonPrice);
        setOptionPrice(newOptionPrice);
    }, [adon, option]);
    const calculateTotalPrice = () => {
        const basePrice = (filtereItem.total-filtereItem.discount) || 0;
        const totalPrice = (basePrice + adonPrice + optionPrice) * count;
        return totalPrice;
    };
 

    const handleAdonChange = (e, addon) => {
        const isChecked = e.target.checked;
        console.log(isChecked,addon)
        if (isChecked) {
            setAdon([...adon, addon]);
        } else {
            setAdon(adon.filter(ad => ad.addon_id !== addon.addon_id));
        }
        }

        const handleOptionChange = (e, opt) => {
            const isChecked = e.target.checked;
            console.log(isChecked,opt)
            if (isChecked) {
                setOption([...option, opt]);
            } else {
                setOption(option.filter(op => op.option_id !== opt.option_id));
            }
        };

        const handleAddToCart = (itemId) => {
            const selectedItem = {
                item_id: itemId,
                item_name: item.item_name,
                qty: count,
                price: calculateTotalPrice(),
                add_ons: adon.map(addon => ({
                    addon_id: addon.addon_id,
                    price: addon.price,
                })),
                options: option.map(opt => ({
                    option_id: opt.option_id,
                    price: opt.price,
                })),
            };
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItemIndex = cartItems.findIndex(cartItem => cartItem.item_id === selectedItem.item_id);
            if (existingItemIndex >= 0) {
                cartItems[existingItemIndex].qty += selectedItem.qty;
                cartItems[existingItemIndex].price += selectedItem.price;
            } else {
                cartItems.push(selectedItem);
            }
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            setOptionPrice(0);
            setAdonPrice(0);
            setAdon([]);
            setOption([]);
            setCount(1);
            setShow(false);
            toast.success(`Add Item SuccessFully`);
        };
    
console.log({ lpCombos: table?.lpCombos, allCombos, filtereItem })
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
                            <h3>{item?.items.map(i => i.item_name).join(' + ')} Manchurian gravy + Shaahi Wrapes</h3>
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
                        {filtereItem?.map((mainitem,mainindex)=>(
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
                                                                    value={addon}
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
                                    {/* <h3>Select add-on’s</h3> */}
                                </div>
                                <ul className='selectvariantGroup'>
                                    {mainitem && mainitem.optionsGrouped && mainitem.optionsGrouped.length > 0 ? (
                                        mainitem.optionsGrouped.map((group, index) => (
                                            <li key={`addon-option-${index}`}>
                                                <h3>{group.groupName}</h3>
                                                <ul className='selectvariantmain'>
                                                    {group.itemList.map((option, optionIndex) => (
                                                        <li key={`option-${optionIndex}`}>
                                                            <h5>{option.option_name}</h5>
                                                            <label className="custom-checkbox" htmlFor={`selectaddonoptionMeat${optionIndex}`}>
                                                                <span className="checkbox-label">₹{option.price}</span>
                                                                <input
                                                                    type="checkbox"
                                                                    id={`selectaddonoptionMeat${optionIndex}`}
                                                                    value={option}
                                                                    onChange={(e) => handleOptionChange(e, option)}                                                            
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
                                    <span onClick={handleRemoveClick} style={{ cursor: 'pointer' }}>
                                        <Icon icon="ri:subtract-fill" width="24px" height="24px" />
                                    </span>
                                    <h5 style={{ margin: '0 10px' }}>{count}</h5>
                                    <span onClick={handleAddClick} style={{ cursor: 'pointer' }}>
                                        <Icon icon="ic:round-plus" width="24px" height="24px" />
                                    </span>
                                </div>
                                <Link className='btngreen continue' onClick={()=>handleAddToCart(item.item_id)}>
                                    Add Item - ₹{calculateTotalPrice().toFixed(2)}
                                </Link>

                            </div>
                        </div>
                            </Accordion.Body>  
                        </Accordion.Item>
                        )
                        )}
                        </Accordion>
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default CombosSlider;
